import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import './InvitationCarousel.css';

const assetBasePath = `${import.meta.env.BASE_URL}assets/`;

// Card will auto-change every 6 seconds.
const AUTO_SLIDE_DELAY = 6000;

const invitationCards = [
    {
        src: `${assetBasePath}invite-1.jpg`,
        alt: 'Wedding invitation card page 1',
    },
    {
        src: `${assetBasePath}invite-2.jpg`,
        alt: 'Wedding invitation card page 2',
    },
    {
        src: `${assetBasePath}invite-3.jpg`,
        alt: 'Wedding invitation card page 3',
    },
    {
        src: `${assetBasePath}invite-4.jpg`,
        alt: 'Wedding invitation card page 4',
    },
];

export default function InvitationCarousel({ enabled = true }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);

    const sectionRef = useRef(null);
    const touchStartX = useRef(null);
    const autoSlideTimerRef = useRef(null);

    const lastIndex = invitationCards.length - 1;

    const clearAutoSlideTimer = useCallback(() => {
        if (autoSlideTimerRef.current) {
            window.clearInterval(autoSlideTimerRef.current);
            autoSlideTimerRef.current = null;
        }
    }, []);

    const showNextCard = useCallback(() => {
        setActiveIndex((currentIndex) =>
            currentIndex === lastIndex ? 0 : currentIndex + 1
        );
    }, [lastIndex]);

    const showPreviousCard = useCallback(() => {
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? lastIndex : currentIndex - 1
        );
    }, [lastIndex]);

    const showSelectedCard = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const startAutoSlide = useCallback(() => {
        clearAutoSlideTimer();

        // Start autoplay only when invite is opened and carousel is visible.
        if (!enabled || !isCarouselVisible) return;

        autoSlideTimerRef.current = window.setInterval(() => {
            showNextCard();
        }, AUTO_SLIDE_DELAY);
    }, [
        clearAutoSlideTimer,
        enabled,
        isCarouselVisible,
        showNextCard,
    ]);

    const handleManualInteraction = useCallback(
        (action) => {
            action();

            // After manual next/previous/swipe/dot click,
            // restart the timer so it waits full 6 seconds again.
            startAutoSlide();
        },
        [startAutoSlide]
    );

    useEffect(() => {
        if (!enabled) {
            setIsCarouselVisible(false);
            clearAutoSlideTimer();
            return undefined;
        }

        const sectionElement = sectionRef.current;
        if (!sectionElement) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsCarouselVisible(entry.isIntersecting);
            },
            {
                threshold: 0.35,
            }
        );

        observer.observe(sectionElement);

        return () => {
            observer.disconnect();
        };
    }, [enabled, clearAutoSlideTimer]);

    useEffect(() => {
        startAutoSlide();

        return () => {
            clearAutoSlideTimer();
        };
    }, [startAutoSlide, clearAutoSlideTimer]);

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;

        const touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchStartX.current - touchEndX;

        // Small threshold prevents accidental slide change while vertical scrolling.
        if (Math.abs(swipeDistance) > 45) {
            if (swipeDistance > 0) {
                handleManualInteraction(showNextCard);
            } else {
                handleManualInteraction(showPreviousCard);
            }
        }

        touchStartX.current = null;
    };

    return (
        <section
            id="invitation-card-section"
            ref={sectionRef}
            aria-labelledby="invitation-card-heading"
        >
            <div className="invite-carousel-shell reveal">
                <span className="section-label">Original Invitation Card</span>

                <h2
                    id="invitation-card-heading"
                    className="section-heading text-terra"
                >
                    Read Our
                    <br />
                    Wedding Card
                </h2>

                <p className="invite-carousel-subtitle">
                    Swipe or use the buttons to view each page clearly.
                </p>

                <div
                    className="invite-carousel-frame"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="invite-carousel-track"
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                    >
                        {invitationCards.map((card, index) => (
                            <div
                                className="invite-carousel-slide"
                                key={card.src}
                            >
                                <img
                                    src={card.src}
                                    alt={card.alt}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    draggable="false"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="invite-carousel-controls"
                    aria-label="Invitation card controls"
                >
                    <button
                        type="button"
                        className="invite-carousel-btn"
                        onClick={() =>
                            handleManualInteraction(showPreviousCard)
                        }
                        aria-label="Show previous invitation card"
                    >
                        Earlier
                    </button>

                    <span
                        className="invite-carousel-counter"
                        aria-live="polite"
                    >
                        {activeIndex + 1} / {invitationCards.length}
                    </span>

                    <button
                        type="button"
                        className="invite-carousel-btn"
                        onClick={() =>
                            handleManualInteraction(showNextCard)
                        }
                        aria-label="Show next invitation card"
                    >
                        Next
                    </button>
                </div>

                <div
                    className="invite-carousel-dots"
                    aria-label="Select invitation card page"
                >
                    {invitationCards.map((card, index) => (
                        <button
                            type="button"
                            key={card.src}
                            className={
                                index === activeIndex
                                    ? 'invite-carousel-dot active'
                                    : 'invite-carousel-dot'
                            }
                            onClick={() =>
                                handleManualInteraction(() =>
                                    showSelectedCard(index)
                                )
                            }
                            aria-label={`Show invitation card page ${index + 1}`}
                            aria-current={
                                index === activeIndex ? 'true' : undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}