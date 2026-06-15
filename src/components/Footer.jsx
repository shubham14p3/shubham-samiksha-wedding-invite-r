import { safeArray } from '../utils/safeArray';

export default function Footer({ data }) {
    const footer = data.footer || {};

    const primaryTitle =
        footer.complimentsTitle || footer.hostsTitle || 'With Compliments From';

    const primaryList =
        safeArray(footer.compliments).length > 0
            ? footer.compliments
            : safeArray(footer.hosts);

    // Contact and venue details
    const contactNumber = '919835552756';
    const displayContactNumber = '+91 98355 52756';
    const venueMapUrl = 'https://share.google/7ifPm4YBdeUlz6UmD';

    const whatsappMessage = encodeURIComponent(
        'Hello, I need some information regarding the wedding venue at Sone Mandap.'
    );

    const whatsappUrl = `https://wa.me/${contactNumber}?text=${whatsappMessage}`;

    return (
        <section id="footer-section">
            <div className="footer-top reveal">
                <span className="footer-couple">{footer.coupleName}</span>

                <div className="footer-divider">
                    <div />
                    <span>♥</span>
                    <div />
                </div>
            </div>

            <div className="footer-grid">
                {safeArray(primaryList).length > 0 && (
                    <div className="footer-card reveal">
                        <span className="footer-heading">{primaryTitle}</span>

                        <ul className="footer-list">
                            {safeArray(primaryList).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {safeArray(footer.blessingsFrom).length > 0 && (
                    <div className="footer-card reveal reveal-delay-2">
                        <span className="footer-heading">Blessings From</span>

                        <ul className="footer-list">
                            {safeArray(footer.blessingsFrom).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {safeArray(footer.invitedBy).length > 0 && (
                    <div className="footer-card reveal reveal-delay-2">
                        <span className="footer-heading">Invited By</span>

                        <ul className="footer-list">
                            {safeArray(footer.invitedBy).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {safeArray(footer.rsvpNames).length > 0 && (
                    <div className="footer-card reveal reveal-delay-2">
                        <span className="footer-heading">
                            {footer.rsvpTitle || 'RSVP'}
                        </span>

                        <div className="footer-rsvp-names">
                            {safeArray(footer.rsvpNames).map((name) => (
                                <p key={name}>{name}</p>
                            ))}
                        </div>
                    </div>
                )}

                {safeArray(footer.loveFrom).length > 0 && (
                    <div className="footer-card footer-love-card reveal">
                        <span className="footer-heading">With Love From</span>

                        <div className="footer-family-grid">
                            {safeArray(footer.loveFrom).map((name) => (
                                <span key={name}>{name}</span>
                            ))}
                        </div>
                    </div>
                )}

                {footer.specialThanks && (
                    <div className="footer-endnote reveal">
                        <div className="footer-mini-line" />
                        <p>{footer.specialThanks}</p>
                    </div>
                )}

                {footer.endNote && (
                    <div className="footer-endnote reveal">
                        <div className="footer-mini-line" />
                        <p>{footer.endNote}</p>
                    </div>
                )}
            </div>

            {/* Venue and contact section */}
            <div className="footer-connect reveal">
                <div className="footer-connect-heading">
                    <span className="footer-heading">Venue & Contact</span>

                    <p>
                        Need directions or assistance? Reach us using the options
                        below.
                    </p>
                </div>

                <div className="footer-action-grid">
                    <a
                        href={venueMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="footer-action-button map-action"
                        aria-label="Open Sone Mandap location in Google Maps"
                    >
                        <span className="footer-action-icon" aria-hidden="true">
                            📍
                        </span>

                        <span className="footer-action-content">
                            <strong>Venue Location</strong>
                            <small>Open Sone Mandap Map</small>
                        </span>

                        <span
                            className="footer-action-arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </a>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="footer-action-button whatsapp-action"
                        aria-label={`Contact ${displayContactNumber} on WhatsApp`}
                    >
                        <span className="footer-action-icon" aria-hidden="true">
                            💬
                        </span>

                        <span className="footer-action-content">
                            <strong>WhatsApp Us</strong>
                            <small>{displayContactNumber}</small>
                        </span>

                        <span
                            className="footer-action-arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </a>

                    <a
                        href={`tel:+${contactNumber}`}
                        className="footer-action-button call-action"
                        aria-label={`Call ${displayContactNumber}`}
                    >
                        <span className="footer-action-icon" aria-hidden="true">
                            ☎
                        </span>

                        <span className="footer-action-content">
                            <strong>Call Us</strong>
                            <small>{displayContactNumber}</small>
                        </span>

                        <span
                            className="footer-action-arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </a>
                </div>
            </div>

            {footer.instagramUrl && footer.instagramHandle && (
                <a
                    href={footer.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="insta-handle"
                >
                    {footer.instagramHandle}
                </a>
            )}
        </section>
    );
}