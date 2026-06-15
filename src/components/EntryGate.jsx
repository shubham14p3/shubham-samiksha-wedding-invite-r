import { useEffect, useRef, useState } from 'react';

export default function EntryGate({
    data,
    onReveal,
    bgAudioRef,
    setAudioPlaying,
}) {
    const [playing, setPlaying] = useState(false);

    const videoRef = useRef(null);
    const timerRef = useRef(null);
    const startedRef = useRef(false);

    const openInvite = () => {
        // Clear the 10-second fallback timer.
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Stop the entry video before opening the invitation.
        if (videoRef.current) {
            videoRef.current.pause();
        }

        onReveal();
    };

    const startInvite = async () => {
        // Prevent multiple taps from restarting the video.
        if (startedRef.current) return;

        startedRef.current = true;
        setPlaying(true);

        const video = videoRef.current;

        if (!video) {
            openInvite();
            return;
        }

        try {
            video.muted = true;
            video.playsInline = true;
            video.currentTime = 0;

            await video.play();

            // Open automatically after 10 seconds as a fallback.
            timerRef.current = window.setTimeout(() => {
                openInvite();
            }, 10000);

            // Start the background wedding music.
            try {
                if (bgAudioRef.current) {
                    await bgAudioRef.current.play();
                    setAudioPlaying(true);
                }
            } catch (audioError) {
                console.warn('Background audio was blocked:', audioError);
                setAudioPlaying(false);
            }
        } catch (videoError) {
            console.warn('Entry video could not play:', videoError);
            openInvite();
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            videoRef.current?.pause();
        };
    }, []);

    return (
        <div
            id="entry-gate"
            className={playing ? 'video-playing' : ''}
            onClick={startInvite}
            role="button"
            tabIndex={0}
            aria-label="Open wedding invitation"
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    startInvite();
                }
            }}
        >
            <video
                ref={videoRef}
                id="entry-video"
                playsInline
                preload="auto"
                muted
                onEnded={openInvite}
                onError={openInvite}
            >
                <source
                    src={data.assets.entryVideo}
                    type="video/mp4"
                />
            </video>

            {!playing && (
                <button
                    type="button"
                    className="tap-hint"
                    onClick={(event) => {
                        event.stopPropagation();
                        startInvite();
                    }}
                >
                    Tap to Begin
                </button>
            )}

            {playing && (
                <button
                    type="button"
                    className="enter-invite-btn"
                    onClick={(event) => {
                        event.stopPropagation();
                        openInvite();
                    }}
                >
                    Enter Invite
                </button>
            )}
        </div>
    );
}