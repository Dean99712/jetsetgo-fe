import React from 'react';
import CinemaScrubSection from '../CinemaScrubSection';
import Beat from '../Beat';

const BEATS = [
    {range: [0.04, 0.36], title: 'Settle in.', copy: 'A cabin composed like a quiet hotel suite — soft light, real materials, room to think.'},
    {range: [0.4, 0.68], title: 'Seats that become beds.', copy: 'Lie-flat on every long haul we sell, turned down while you dine.'},
    {range: [0.72, 0.98], title: 'Dining at altitude, done properly.', copy: 'Seasonal menus, poured wine, no trays in sight.'},
];

const CabinScrub = () => (
    <CinemaScrubSection
        clip="cabin"
        heightVh={280}
        className="cabin-scrub"
        staticContent={
            <div className="cinema-beat cinema-beat--flow">
                <span className="cinema-eyebrow">The cabin</span>
                {BEATS.map((beat) => (
                    <div key={beat.title} className="cinema-feature">
                        <h3 className="cinema-h3">{beat.title}</h3>
                        <p className="cinema-sub">{beat.copy}</p>
                    </div>
                ))}
            </div>
        }
    >
        {(progress) => (
            <>
                <Beat progress={progress} range={[0, 1]} pinStart pinEnd className="cinema-beat--eyebrow-only">
                    <span className="cinema-eyebrow">The cabin</span>
                </Beat>
                {BEATS.map((beat) => (
                    <Beat key={beat.title} progress={progress} range={beat.range}>
                        <h3 className="cinema-h3">{beat.title}</h3>
                        <p className="cinema-sub">{beat.copy}</p>
                    </Beat>
                ))}
            </>
        )}
    </CinemaScrubSection>
);

export default CabinScrub;
