export default function ScrollCue({ label = 'Scroll' }) {
    return (
        <div className="hero-scroll-cue" aria-hidden="true">
            <span>{label}</span>

            <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
            </svg>
        </div>
    );
}
