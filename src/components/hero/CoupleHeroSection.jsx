import CardCorners from './CardCorners';
import HeroBackdrop from './HeroBackdrop';
import ScrollCue from './ScrollCue';

export default function CoupleHeroSection({
    id,
    sectionNumber,
    label,
    person,
    backgroundVideo,
    nextLabel,
    variant,
}) {
    if (!person) return null;

    return (
        <section
            id={id}
            className={`hero-section hero-person-section hero-${variant}-section`}
            aria-label={`${label}: ${person.name || ''}`}
        >
            <HeroBackdrop videoSrc={backgroundVideo} />

            <div className="hero-section-content">
                <article className="hero-card hero-person-card">
                    <CardCorners />

                    <span className="hero-section-number">
                        {sectionNumber}
                    </span>

                    <p className="hero-person-label">{label}</p>

                    <h1 className="hero-person-name shimmer-gold">
                        {person.name}
                    </h1>

                    <div className="hero-name-ornament" aria-hidden="true">
                        <span />
                        <i>&</i>
                        <span />
                    </div>

                    <div className="hero-family-details">
                        {person.parents && (
                            <p className="hero-family-primary">
                                {person.parents}
                            </p>
                        )}

                        {person.grandparents && (
                            <p className="hero-family-secondary">
                                {person.grandparents}
                            </p>
                        )}

                        {person.residence && (
                            <p className="hero-family-residence">
                                {person.residence}
                            </p>
                        )}
                    </div>
                </article>
            </div>

            <ScrollCue label={nextLabel} />
        </section>
    );
}
