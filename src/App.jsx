import { useEffect, useMemo, useRef, useState } from 'react';

import { weddingData } from './weddingData';

import AudioButton from './components/AudioButton';
import Countdown from './components/Countdown';
import EntryGate from './components/EntryGate';
import Events from './components/Events';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Memories from './components/Memories';
import RSVP from './components/RSVP';
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

        // Lock both scrolling elements while the entry video is visible.
        // Mobile browsers do not always use <body> as the scroll container.
        rootElement.classList.toggle('scroll-locked', !revealed);
        bodyElement.classList.toggle('scroll-locked', !revealed);

        if (revealed) {
            // Always begin the invitation from the first section.
            window.requestAnimationFrame(() => {
                document.getElementById('main-content')?.scrollTo({
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

        // Remove the fixed entry layer immediately so it cannot capture
        // touch/wheel events after the invitation becomes visible.
        setEntryClosed(true);
        setRevealed(true);
    };

    const mainClass = useMemo(
        () => `main-content ${revealed ? 'visible fade-in' : ''}`,
        [revealed]
    );

    return (
        <>
            <canvas
                id="petals-canvas"
                ref={petals.canvasRef}
                className={petals.className}
            />

            <audio ref={bgAudioRef} id="bg-audio" loop preload="metadata">
                <source src={weddingData.assets.bgMusic} type="audio/mpeg" />
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

            <main id="main-content" className={mainClass}>
                <Hero data={weddingData} />
                <Countdown enabled={revealed} data={weddingData} />
                <Memories data={weddingData} />
                <Venue data={weddingData} />
                <Events data={weddingData} />
                {/* <RSVP data={weddingData} /> */}
                <Footer data={weddingData} />
            </main>
        </>
    );
}