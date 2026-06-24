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
import InvitationCarousel from './components/InvitationCarousel';

import { useEventAutoExpand } from './hooks/useEventAutoExpand';
import { usePetals } from './hooks/usePetals';
import { useReveal } from './hooks/useReveal';

const ENTRY_GATE_MIN_DURATION = 10000; // 10 seconds for EntryGate
const AUTO_SECTION_DELAY = 6000; // 6 seconds for main sections
const MANUAL_PAUSE_DELAY = 9000;

export default function App() {
    const [revealed, setRevealed] = useState(false);
    const [entryClosed, setEntryClosed] = useState(false);
    const [entryRevealStarted, setEntryRevealStarted] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const bgAudioRef = useRef(null);
    const entryRevealTimerRef = useRef(null);

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

    // Cleanup EntryGate timer if component unmounts.
    useEffect(() => {
        return () => {
            window.clearTimeout(entryRevealTimerRef.current);
        };
    }, []);

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

    // Auto transition between main invitation sections.
    // This starts ONLY after revealed becomes true.
    // Since revealed becomes true after EntryGate 10 sec delay,
    // main sections will transition every 6 sec only after EntryGate is completed.
    useEffect(() => {
        if (!revealed) return undefined;

        const mainContent = document.getElementById('main-content');
        if (!mainContent) return undefined;

        let autoSectionTimerId = null;
        let manualPauseTimerId = null;
        let autoScrollUnlockTimerId = null;

        const autoScrollState = {
            isAutoScrolling: false,
        };

        const getScrollContainer = () => {
            const mainCanScroll =
                mainContent.scrollHeight > mainContent.clientHeight + 5;

            return mainCanScroll ? mainContent : window;
        };

        const getCurrentScrollTop = () => {
            const scrollContainer = getScrollContainer();

            return scrollContainer === window
                ? window.scrollY
                : mainContent.scrollTop;
        };

        const getSectionTop = (section) => {
            const scrollContainer = getScrollContainer();

            if (scrollContainer === window) {
                return section.getBoundingClientRect().top + window.scrollY;
            }

            return (
                section.getBoundingClientRect().top -
                mainContent.getBoundingClientRect().top +
                mainContent.scrollTop
            );
        };

        const getInvitationSections = () => {
            return Array.from(mainContent.children).filter(
                (child) => child.tagName.toLowerCase() === 'section'
            );
        };

        const getCurrentSectionIndex = (sections) => {
            const currentScrollTop = getCurrentScrollTop();

            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            sections.forEach((section, index) => {
                const sectionTop = getSectionTop(section);
                const distance = Math.abs(sectionTop - currentScrollTop);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        };

        const scrollToSection = (section) => {
            const scrollContainer = getScrollContainer();
            const sectionTop = getSectionTop(section);

            autoScrollState.isAutoScrolling = true;

            if (scrollContainer === window) {
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth',
                });
            } else {
                mainContent.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth',
                });
            }

            window.clearTimeout(autoScrollUnlockTimerId);

            autoScrollUnlockTimerId = window.setTimeout(() => {
                autoScrollState.isAutoScrolling = false;
            }, 1000);
        };

        const moveToNextSection = () => {
            const sections = getInvitationSections();

            if (sections.length <= 1) return;

            const currentSectionIndex = getCurrentSectionIndex(sections);

            const nextSectionIndex =
                currentSectionIndex === sections.length - 1
                    ? 0
                    : currentSectionIndex + 1;

            scrollToSection(sections[nextSectionIndex]);
        };

        const startAutoSectionTransition = () => {
            window.clearInterval(autoSectionTimerId);

            autoSectionTimerId = window.setInterval(() => {
                moveToNextSection();
            }, AUTO_SECTION_DELAY);
        };

        const pauseAutoTransitionForManualInteraction = () => {
            // Ignore scroll/touch events caused by our own auto-scroll.
            if (autoScrollState.isAutoScrolling) return;

            window.clearInterval(autoSectionTimerId);
            window.clearTimeout(manualPauseTimerId);

            // After manual interaction, wait 9 seconds, then continue again.
            manualPauseTimerId = window.setTimeout(() => {
                startAutoSectionTransition();
            }, MANUAL_PAUSE_DELAY);
        };

        // Start 6-second auto transition only after main invite opens.
        startAutoSectionTransition();

        const manualEvents = [
            'wheel',
            'touchstart',
            'keydown',
            'pointerdown',
        ];

        manualEvents.forEach((eventName) => {
            window.addEventListener(
                eventName,
                pauseAutoTransitionForManualInteraction,
                { passive: true }
            );
        });

        return () => {
            window.clearInterval(autoSectionTimerId);
            window.clearTimeout(manualPauseTimerId);
            window.clearTimeout(autoScrollUnlockTimerId);

            manualEvents.forEach((eventName) => {
                window.removeEventListener(
                    eventName,
                    pauseAutoTransitionForManualInteraction
                );
            });
        };
    }, [revealed]);

    useEffect(() => {
        if (weddingData.seo?.title) {
            document.title = weddingData.seo.title;
        }
    }, []);

    const revealMain = () => {
        // Prevent multiple taps/clicks from starting multiple timers.
        if (revealed || entryRevealStarted) return;

        setEntryRevealStarted(true);

        // EntryGate stays visible for minimum 10 seconds after Tap to Begin.
        entryRevealTimerRef.current = window.setTimeout(() => {
            setEntryClosed(true);
            setRevealed(true);
        }, ENTRY_GATE_MIN_DURATION);
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
                <InvitationCarousel enabled={revealed} />
                {/* <RSVP data={weddingData} /> */}
                <Footer data={weddingData} />
            </main>
        </>
    );
}