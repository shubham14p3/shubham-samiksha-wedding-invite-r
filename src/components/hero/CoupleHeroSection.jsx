import CardCorners from './CardCorners';
import HeroBackdrop from './HeroBackdrop';
import ScrollCue from './ScrollCue';

const splitFamilyLine = (text) => {
    if (!text || !text.includes('&')) {
        return text ? [text] : [];
    }

    const cleanText = text.trim();
    const hasOpeningBracket = cleanText.startsWith('(');
    const hasClosingBracket = cleanText.endsWith(')');

    const textWithoutBrackets = cleanText
        .replace(/^\(/, '')
        .replace(/\)$/, '');

    const [firstPerson, secondPerson] = textWithoutBrackets
        .split('&')
        .map((item) => item.trim());

    return [
        hasOpeningBracket ? `(${firstPerson}` : firstPerson,
        '&',
        hasClosingBracket ? `${secondPerson})` : secondPerson,
    ];
};

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

    const parentLines = splitFamilyLine(person.parents);
    const grandParentLines = splitFamilyLine(person.grandparents);

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
                        {parentLines.length > 0 && (
                            <p className="hero-family-primary hero-family-line-group">
                                {parentLines.map((line, index) => (
                                    <span
                                        key={`${line}-${index}`}
                                        className={
                                            line === '&'
                                                ? 'hero-family-ampersand'
                                                : ''
                                        }
                                    >
                                        {line}
                                    </span>
                                ))}
                            </p>
                        )}

                        {grandParentLines.length > 0 && (
                            <p className="hero-family-secondary hero-family-line-group">
                                {grandParentLines.map((line, index) => (
                                    <span
                                        key={`${line}-${index}`}
                                        className={
                                            line === '&'
                                                ? 'hero-family-ampersand'
                                                : ''
                                        }
                                    >
                                        {line}
                                    </span>
                                ))}
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