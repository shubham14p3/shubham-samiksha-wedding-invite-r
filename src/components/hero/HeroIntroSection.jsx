import { safeArray } from '../../utils/safeArray';
import CardCorners from './CardCorners';
import HeroBackdrop from './HeroBackdrop';
import ScrollCue from './ScrollCue';

export default function HeroIntroSection({ data, backgroundVideo }) {
    const hero = data.hero || {};

    return (
        <section
            id="hero-intro"
            className="hero-section hero-intro-section"
            aria-label="Wedding invitation introduction"
        >
            <HeroBackdrop videoSrc={backgroundVideo} />

            <div className="hero-section-content">
                <article className="hero-card hero-intro-card">
                    <CardCorners />

                    <span className="hero-section-number">01</span>

                    <img
                        className="hero-ganesh-icon"
                        src={data.assets.ganeshImage}
                        alt="Shri Ganesh"
                    />

                    {safeArray(hero.mantra).length > 0 && (
                        <p className="hero-mantra">
                            {safeArray(hero.mantra).map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                        </p>
                    )}

                    <div className="hero-gold-divider" aria-hidden="true">
                        <span />
                        <i>✦</i>
                        <span />
                    </div>

                    <div className="hero-intro-copy">
                        {hero.welcomeLine && (
                            <p className="hero-welcome-line">
                                {hero.welcomeLine}
                            </p>
                        )}

                        {hero.specialNote && (
                            <p className="hero-special-note">
                                {hero.specialNote}
                            </p>
                        )}

                        {hero.blessing && (
                            <p className="hero-blessing">
                                {hero.blessing}
                            </p>
                        )}
                    </div>
                </article>
            </div>

            <ScrollCue label="Meet the Groom" />
        </section>
    );
}
