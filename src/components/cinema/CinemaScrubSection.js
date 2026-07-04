import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useScroll, useMotionValueEvent} from 'framer-motion';
import {useCinema} from './CinemaProvider';
import {useFrameStore, posterUrl} from './hooks/useFrameStore';
import './CinemaScrubSection.scss';

/**
 * A pinned, scroll-scrubbed video section: the outer section provides scroll
 * runway (heightVh), the inner sticky viewport holds a full-bleed canvas that
 * shows frame f(scrollProgress). `children` is a render prop receiving the
 * scroll progress MotionValue for overlay choreography. In 'static' mode
 * (mobile / reduced motion) it renders the poster and `staticContent` instead —
 * no frame downloads at all.
 */
const CinemaScrubSection = ({
    clip,
    heightVh = 300,
    eager = false,
    className = '',
    children,
    staticContent = null,
}) => {
    const {manifest, mode} = useCinema();
    const meta = manifest?.clips?.[clip];

    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const canvasRef = useRef(null);
    const targetIndex = useRef(0);
    const lastDrawnIndex = useRef(-1);
    const rafPending = useRef(false);

    const [enabled, setEnabled] = useState(eager);
    const isScrub = mode === 'scrub';

    const {scrollYProgress} = useScroll({target: sectionRef, offset: ['start start', 'end end']});

    // Start loading this clip's frames ~1.5 viewports before it arrives.
    useEffect(() => {
        if (eager || !isScrub || !sectionRef.current) return undefined;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setEnabled(true);
                    io.disconnect();
                }
            },
            {rootMargin: '150% 0px'}
        );
        io.observe(sectionRef.current);
        return () => io.disconnect();
    }, [eager, isScrub]);

    const store = useFrameStore(clip, isScrub ? meta : null, enabled && isScrub);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !store) return;
        const index = targetIndex.current;

        // Nearest loaded frame at/below the target, else the nearest above.
        let i = index;
        while (i >= 0 && !store.loaded[i]) i -= 1;
        if (i < 0) {
            i = index;
            while (i < store.total && !store.loaded[i]) i += 1;
            if (i >= store.total) return;
        }
        const img = store.images[i];
        if (!img || !img.naturalWidth) return;

        const ctx = canvas.getContext('2d');
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        lastDrawnIndex.current = i;
    }, [store]);

    const scheduleDraw = useCallback(() => {
        if (rafPending.current) return;
        rafPending.current = true;
        requestAnimationFrame(() => {
            rafPending.current = false;
            draw();
        });
    }, [draw]);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (!meta || !isScrub) return;
        const index = Math.max(0, Math.min(meta.frames - 1, Math.round(v * (meta.frames - 1))));
        if (index !== targetIndex.current || lastDrawnIndex.current !== index) {
            targetIndex.current = index;
            scheduleDraw();
        }
    });

    // Upgrade the displayed frame as better ones finish loading.
    useEffect(() => {
        if (!store || !isScrub) return undefined;
        const listener = () => {
            if (lastDrawnIndex.current !== targetIndex.current) scheduleDraw();
        };
        store.listeners.add(listener);
        return () => store.listeners.delete(listener);
    }, [store, isScrub, scheduleDraw]);

    // Size the canvas backing store to the sticky viewport (DPR-clamped).
    useEffect(() => {
        if (!isScrub || !stickyRef.current || !canvasRef.current) return undefined;
        const sticky = stickyRef.current;
        const canvas = canvasRef.current;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = sticky.getBoundingClientRect();
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            lastDrawnIndex.current = -1;
            scheduleDraw();
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(sticky);
        return () => observer.disconnect();
    }, [isScrub, scheduleDraw]);

    if (!isScrub) {
        return (
            <section className={`cinema-scrub cinema-scrub--static ${className}`}>
                <img className="cinema-scrub__poster" src={posterUrl(clip)} alt="" aria-hidden="true"/>
                <div className="cinema-scrub__static-overlay">{staticContent}</div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className={`cinema-scrub ${className}`}
            style={{height: `${heightVh}vh`}}
        >
            <div ref={stickyRef} className="cinema-scrub__sticky">
                <canvas ref={canvasRef} className="cinema-scrub__canvas" aria-hidden="true"/>
                <div className="cinema-scrub__overlay">
                    {typeof children === 'function' ? children(scrollYProgress) : children}
                </div>
            </div>
        </section>
    );
};

export default CinemaScrubSection;
