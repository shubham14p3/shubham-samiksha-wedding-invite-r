import StarOrnament from './StarOrnament';
import { safeArray } from '../utils/safeArray';

export default function Venue({ data }) {
    const venue = data?.venue || {};

    // Fallback Google Maps URL in case directionsUrl is missing
    const venueDirectionsUrl =
        venue.directionsUrl ||
        'https://www.google.com/maps/dir/?api=1&destination=Son%20Mandap%2C%20Sidhgora%2C%20Jamshedpur%2C%20Jharkhand';

    return (
        <section id="venue-section">
            <div className="text-center reveal">
                <span className="section-label">
                    {venue.label || 'Wedding Venue'}
                </span>

                <h2 className="section-heading text-terra">
                    {venue.headingLine1 || 'Join Us At'}
                    <br />
                    {venue.headingLine2 || venue.name}
                </h2>

                <StarOrnament className="mt-4 mb-8" />
            </div>

            <div className="venue-card reveal reveal-delay-2">
                {venue.video ? (
                    <video
                        className="venue-video"
                        src={venue.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${venue.name || 'Wedding venue'} video`}
                    />
                ) : (
                    <img
                        className="venue-img"
                        src={data?.assets?.venueImage}
                        alt={venue.name || 'Wedding venue'}
                        loading="lazy"
                    />
                )}

                <div className="venue-info text-center">
                    <h3 className="venue-name">
                        {venue.name || 'Son Mandap'}
                    </h3>

                    <p className="venue-address">
                        {safeArray(venue.addressLines).map((line) => (
                            <span key={line}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>

                    {venue.mapEmbedUrl && (
                        <iframe
                            className="venue-map"
                            title={`${venue.name || 'Wedding venue'} map`}
                            src={venue.mapEmbedUrl}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    )}

                    <a
                        className="directions-btn"
                        href={venueDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open directions to ${venue.name || 'Son Mandap'
                            } in Google Maps`}
                    >
                        <span aria-hidden="true">📍</span>
                        Open in Google Maps
                    </a>
                </div>
            </div>
        </section>
    );
}