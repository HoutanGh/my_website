import { quote } from "../data/quotes";

function Quote() {
  return (
    <section className="quote-section" aria-label="Quotation">
      <div className="quote-inner">
        <p className="quote-text">“{quote.text}”</p>
        <span className="quote-author">— {quote.author}</span>
      </div>
    </section>
  );
}

export default Quote;
