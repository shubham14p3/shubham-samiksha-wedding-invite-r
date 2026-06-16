import HeroIntroSection from './hero/HeroIntroSection';
import CoupleHeroSection from './hero/CoupleHeroSection';
import './Hero.css';

export default function Hero({ data }) {
    const backgroundVideo = data.assets.backgroundVideo;

    return (
        <>
            <HeroIntroSection
                data={data}
                backgroundVideo={backgroundVideo}
            />

            <CoupleHeroSection
                id="hero-groom"
                sectionNumber="02"
                label="The Groom"
                person={data.hero.groom}
                backgroundVideo={backgroundVideo}
                nextLabel="Meet the Bride"
                variant="groom"
            />

            <CoupleHeroSection
                id="hero-bride"
                sectionNumber="03"
                label="The Bride"
                person={data.hero.bride}
                backgroundVideo={backgroundVideo}
                nextLabel="Wedding Details"
                variant="bride"
            />
        </>
    );
}
