import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { weddingData } from './weddingData';

import AudioButton from './components/AudioButton';
import Countdown from './components/Countdown';
import EntryGate from './components/EntryGate';
import Events from './components/Events';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Memories from './components/Memories';
import Venue from './components/Venue';

import { useEventAutoExpand } from './hooks/useEventAutoExpand';
import { usePetals } from './hooks/usePetals';
import { useReveal } from './hooks/useReveal';

export default function App() {
    const [revealed, setRevealed] = useState(false);
    const [entryClosed, setEntryClosed] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const bgAudioRef = useRef(null);
    const petals = usePetals(revealed);

    useReveal(revealed);
    useEventAutoExpand(revealed);

    // Lock the invitation behind the entry screen until it is opened.
    useEffect(() => {
        const rootElement = document.documentElement;
        const bodyElement = document.body;

        rootElement.classList.toggle('scroll-locked', !revealed);
        bodyElement.classList.toggle('scroll-locked', !revealed);

        return () => {
            rootElement.classList.remove('scroll-locked');
            bodyElement.classList.remove('scroll-locked');
        };
    }, [revealed]);

    // Reset both possible scroll containers before the opened invitation paints.
    // Mobile scrolls <main>; desktop scrolls the browser window.
    useLayoutEffect(() => {
        if (!revealed) return undefined;

        let firstFrameId;
        let secondFrameId;

        const resetToFirstHero = () => {
            const mainContent = document.getElementById('main-content');

            if (mainContent) {
                const previousScrollBehavior = mainContent.style.scrollBehavior;

                mainContent.style.scrollBehavior = 'auto';
                mainContent.scrollTop = 0;
                mainContent.scrollLeft = 0;
                mainContent.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto',
                });

                mainContent.style.scrollBehavior = previousScrollBehavior;
            }

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto',
            });

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        // Run immediately and again after layout/snap positions are calculated.
        resetToFirstHero();

        firstFrameId = window.requestAnimationFrame(() => {
            resetToFirstHero();

            secondFrameId = window.requestAnimationFrame(() => {
                resetToFirstHero();
            });
        });

        return () => {
            window.cancelAnimationFrame(firstFrameId);
            window.cancelAnimationFrame(secondFrameId);
        };
    }, [revealed]);

    useEffect(() => {
        if (weddingData.seo?.title) {
            document.title = weddingData.seo.title;
        }
    }, []);

    const revealMain = () => {
        if (revealed) return;

        setEntryClosed(true);
        setRevealed(true);
    };

    const mainClass = `main-content ${revealed ? 'visible fade-in' : ''}`;

    return (
        <>
            <canvas
                id="petals-canvas"
                ref={petals.canvasRef}
                className={petals.className}
            />

            <audio
                ref={bgAudioRef}
                id="bg-audio"
                loop
                preload="metadata"
            >
                <source
                    src={weddingData.assets.bgMusic}
                    type="audio/mpeg"
                />
            </audio>

            <AudioButton
                bgAudioRef={bgAudioRef}
                audioPlaying={audioPlaying}
                setAudioPlaying={setAudioPlaying}
            />

            {!entryClosed && (
                <EntryGate
                    data={weddingData}
                    onReveal={revealMain}
                    bgAudioRef={bgAudioRef}
                    setAudioPlaying={setAudioPlaying}
                />
            )}

            <main
                id="main-content"
                className={mainClass}
            >
                <Hero data={weddingData} />

                <Countdown
                    enabled={revealed}
                    data={weddingData}
                />

                <Events data={weddingData} />
                <Memories data={weddingData} />
                <Venue data={weddingData} />
                {/* <RSVP data={weddingData} /> */}
                <Footer data={weddingData} />
            </main>
        </>
    );
}
