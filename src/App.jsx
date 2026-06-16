import { useEffect, useMemo, useRef, useState } from 'react';

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

    useEffect(() => {
        const rootElement = document.documentElement;
        const bodyElement = document.body;

        // Prevent page scrolling while the entry video is visible.
        rootElement.classList.toggle('scroll-locked', !revealed);
        bodyElement.classList.toggle('scroll-locked', !revealed);

        if (revealed) {
            window.requestAnimationFrame(() => {
                // Mobile uses main-content as the scroll container.
                document.getElementById('main-content')?.scrollTo({
                    top: 0,
                    behavior: 'auto',
                });

                // Desktop uses the browser window.
                window.scrollTo({
                    top: 0,
                    behavior: 'auto',
                });
            });
        }

        return () => {
            rootElement.classList.remove('scroll-locked');
            bodyElement.classList.remove('scroll-locked');
        };
    }, [revealed]);

    useEffect(() => {
        if (weddingData.seo?.title) {
            document.title = weddingData.seo.title;
        }
    }, []);

    const revealMain = () => {
        if (revealed) return;

        // Completely remove the entry video layer.
        setEntryClosed(true);
        setRevealed(true);
    };

    const mainClass = useMemo(() => {
        return `main-content ${revealed ? 'visible fade-in' : ''}`;
    }, [revealed]);

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