import { useEffect, useRef, useState } from "react";
import InfoBar from "../components/InfoBar";
import { quotes } from "../data/quotes";

const QUOTE_FADE_MS = 1000;
const QUOTE_CYCLE_MS = 30000;

function formatAuthor(fullName) {
  const parts = fullName.split(" ").filter(Boolean);
  if (parts.length <= 1) {
    return fullName;
  }

  const firstName = parts.shift();
  const lastName = parts.pop();
  const middleInitials = parts.map((name) => `${name[0]}.`).join(" ");

  return middleInitials
    ? `${firstName} ${middleInitials} ${lastName}`
    : `${firstName} ${lastName}`;
}

function HomePage() {
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * quotes.length),
  );
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsVisible(false);

      timeoutRef.current = window.setTimeout(() => {
        setQuoteIndex((current) => (current + 1) % quotes.length);
        setIsVisible(true);
      }, QUOTE_FADE_MS);
    }, QUOTE_CYCLE_MS);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const currentQuote = quotes[quoteIndex];

  return (
    <div className="home-content">
      <section className="quote-container">
        <p id="quote" className={isVisible ? "visible" : ""}>
          &ldquo;{currentQuote.text}&rdquo;{" "}
          <span className="quote-author">- {formatAuthor(currentQuote.author)}</span>
        </p>
      </section>
      <InfoBar />
    </div>
  );
}

export default HomePage;
