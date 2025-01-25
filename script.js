const quotes = [
    "The Gods are an amalgamation of the emotions of the human race over time. Or the emotions of a single person over their life.",
    "The fact that there are rules in chess means that you can play and enjoy chess. The fact that there are rules for life (it is finite) means that you can enjoy life, that's why the gods were jealous of the mortals.",
    "The eternal damnation of committing sucide is to make sure you always die for others and never for yourself. Giving up and ending your life is to turn your back on God which means your greater purpose.",
    "You got given a lottery ticket to experience life, make sure it's well spent."
]

const quoteElement = document.getElementById("quote");

let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

quoteElement.textContent = quotes[currentQuoteIndex];
quoteElement.style.opacity = 1;

function updateQuote() {
    quoteElement.style.opacity = 0;

    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.style.opacity = 1;

        
    }, 1000); // Matches the CSS transition duration
}



setInterval(updateQuote, 60000);