import React from 'react';
import CinemaScrubSection from '../CinemaScrubSection';
import Beat from '../Beat';

const DESTINATIONS = [
    {range: [0.04, 0.36], name: 'Santorini', coords: '36.39°N · 25.46°E'},
    {range: [0.4, 0.68], name: 'Kyoto', coords: '35.01°N · 135.77°E'},
    {range: [0.72, 0.98], name: 'Amalfi', coords: '40.63°N · 14.60°E'},
];

const DestinationsScrub = () => (
    <CinemaScrubSection
        clip="destinations"
        heightVh={280}
        className="destinations-scrub"
        staticContent={
            <div className="cinema-beat cinema-beat--flow">
                <span className="cinema-eyebrow">Destinations</span>
                {DESTINATIONS.map((destination) => (
                    <div key={destination.name} className="cinema-feature">
                        <h3 className="cinema-destination">{destination.name}</h3>
                        <p className="cinema-coords">{destination.coords}</p>
                    </div>
                ))}
            </div>
        }
    >
        {(progress) => (
            <>
                <Beat progress={progress} range={[0, 1]} pinStart pinEnd className="cinema-beat--eyebrow-only">
                    <span className="cinema-eyebrow">Destinations</span>
                </Beat>
                {DESTINATIONS.map((destination) => (
                    <Beat
                        key={destination.name}
                        progress={progress}
                        range={destination.range}
                        className="cinema-beat--center"
                    >
                        <h3 className="cinema-destination">{destination.name}</h3>
                        <p className="cinema-coords">{destination.coords}</p>
                    </Beat>
                ))}
            </>
        )}
    </CinemaScrubSection>
);

export default DestinationsScrub;
