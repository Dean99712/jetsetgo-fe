import {useEffect, useState} from 'react';

/**
 * Module-level frame stores, keyed by clip name. Loading starts once per clip
 * regardless of how many components mount (StrictMode-safe) and survives
 * remounts. Frames are plain HTMLImageElements — the browser owns the decode
 * cache, so ~300 frames cost network + JPEG bytes, not decoded-bitmap memory.
 */
const stores = new Map();

const frameUrl = (clip, index) =>
    `${process.env.PUBLIC_URL}/cinema/${clip}/frame_${String(index + 1).padStart(4, '0')}.jpg`;

export const posterUrl = (clip) => `${process.env.PUBLIC_URL}/cinema/${clip}/poster.jpg`;

const getStore = (clip, total) => {
    let store = stores.get(clip);
    if (!store) {
        store = {
            clip,
            total,
            images: new Array(total).fill(null),
            loaded: new Array(total).fill(false),
            loadedCount: 0,
            listeners: new Set(),
            started: false,
        };
        stores.set(clip, store);
    }
    return store;
};

const startLoading = (store) => {
    if (store.started) return;
    store.started = true;

    // Coarse pass first (every 8th frame) so scrubbing works early, then fill.
    const order = [];
    for (let i = 0; i < store.total; i += 8) order.push(i);
    for (let i = 0; i < store.total; i++) {
        if (i % 8 !== 0) order.push(i);
    }

    let cursor = 0;
    const CONCURRENCY = 6;
    const next = () => {
        if (cursor >= order.length) return;
        const index = order[cursor++];
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => {
            store.loaded[index] = true; // marked on error too, so the queue never stalls
            store.loadedCount += 1;
            store.listeners.forEach((listener) => listener(store));
            next();
        };
        img.src = frameUrl(store.clip, index);
        store.images[index] = img;
    };
    for (let k = 0; k < CONCURRENCY; k++) next();
};

/**
 * Returns the (stable) frame store for a clip, kicking off loading when
 * `enabled` first becomes true. Does NOT re-render on every loaded frame —
 * subscribe via store.listeners or use useFrameProgress for that.
 */
export const useFrameStore = (clip, meta, enabled) => {
    // getStore is idempotent, so deriving in render is StrictMode-safe; the
    // store must be an effect dependency because meta (the manifest entry)
    // usually arrives after the first render while `enabled` is already true.
    const store = meta ? getStore(clip, meta.frames) : null;
    useEffect(() => {
        if (enabled && store) startLoading(store);
    }, [enabled, store]);
    return store;
};

/** Re-renders with {loadedCount, total, ready} as a clip loads (for progress UI). */
export const useFrameProgress = (clip, meta, enabled) => {
    const store = useFrameStore(clip, meta, enabled);
    const [progress, setProgress] = useState(() => ({
        loadedCount: store ? store.loadedCount : 0,
        total: store ? store.total : 1,
    }));

    useEffect(() => {
        if (!store) return undefined;
        const listener = () => setProgress({loadedCount: store.loadedCount, total: store.total});
        store.listeners.add(listener);
        listener();
        return () => store.listeners.delete(listener);
    }, [store]);

    return {
        ...progress,
        ready: progress.loadedCount >= Math.min(progress.total, Math.ceil(progress.total / 8) + 1),
    };
};
