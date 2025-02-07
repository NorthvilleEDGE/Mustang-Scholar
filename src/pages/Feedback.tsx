import '../styles/Feedback.css';

function Feedback() {
  return (
    <div className="feedback-container">
      <button
        className="bug-button"
        onClick={() => window.location.href='https://forms.gle/JAuciEq2tEs33Tp28'}
      >
        Report a Bug
      </button>
      <div className="iframe-container">
        <iframe
          src="https://forms.gle/xhzUb9XNV7F1ExT48"
          title="Feedback Form"
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
      
    </div>
  );
}

export default Feedback;