export default function HeroBackdrop({ videoSrc }) {
    return (
        <>
            <video
                className="hero-section-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div className="hero-section-overlay" aria-hidden="true" />

            <div className="hero-section-frame" aria-hidden="true">
                <span />
            </div>
        </>
    );
}
