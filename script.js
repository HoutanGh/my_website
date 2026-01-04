const quotes = [
    // { text: "The Gods are an amalgamation of the emotions of the human race over time. Or the emotions of a single person over their life.", author: "Unknown" },
    // { text: "The fact that there are rules in chess means that you can play and enjoy chess. The fact that there are rules for life (it is finite) means that you can enjoy life, that's why the gods were jealous of the mortals.", author: "Unknown" },
    // { text: "The eternal damnation of committing sucide is to make sure you always die for others and never for yourself. Giving up and ending your life is to turn your back on God which means your greater purpose.", author: "Unknown" },
    // { text: "You got given a lottery ticket. At the end, make sure it was spent well.", author: "Unknown" },
    { text: "But how could you live and have no story to tell?", author: "Fyodor Mikhailovich Dostoevsky" },
    { text: "At 50, everyone has the face he deserves.", author: "George Orwell" },
    { text: "No tree can grow to Heaven unless its roots reach down to Hell.", author: "Carl Gustav Jung" },
    { text: "It is not the result but the spirit!", author: "Aleksandr Isayevich Solzhenitsyn" }
];

const quoteElement = document.getElementById("quote");

if (quoteElement) {

    let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

    const formatAuthor = (fullName) => {
        const parts = fullName.split(" ").filter(Boolean);
        if (parts.length === 1) return parts[0];

        const firstName = parts.shift();
        const lastName = parts.pop();
        const middleInitials = parts.map((name) => `${name[0]}.`).join(" ");

        return middleInitials ? `${firstName} ${middleInitials} ${lastName}` : `${firstName} ${lastName}`;
    };

    const buildQuoteMarkup = (quote) =>
        `&ldquo;${quote.text}&rdquo; <span class="quote-author">- ${formatAuthor(quote.author)}</span>`;

    quoteElement.innerHTML = buildQuoteMarkup(quotes[currentQuoteIndex]); // Add quotation marks
    quoteElement.style.opacity = 1;
    quoteElement.style.fontStyle = "italic";

    function updateQuote() {
        quoteElement.style.opacity = 0;

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

            quoteElement.innerHTML = buildQuoteMarkup(quotes[currentQuoteIndex]);
            quoteElement.style.opacity = 1;


        }, 1000); // Matches the CSS transition duration
    }
    setInterval(updateQuote, 30000);
}

document.addEventListener("DOMContentLoaded", () => {
    // List of activities
    const activities = [
        // { title: "Quant Scanner Project", startDate: "01/06/2025", endDate: null },
        { title: "Reading Don Quixote by Cervantes", startDate: "10/05/2025", endDate: null },
        { title: "Reading Notes from the Underground by Dostoevsky", startDate: "21/12/2025", endDate: null },
        { title: "my-trading-platform Project", startDate: "01/12/2025", endDate: null },
        {title: "Mount Pleasant Park FC Committee member", startDate: "01/01/2025", endDate: null},   
        {title: "MMA", startDate: "17/12/2025", endDate: null},
        {title: "Badminton", startDate: ""}     
        // { title: "MIT Quantum Field Theory Lectures", startDate: "01/05/2025", endDate: null },
        // { title: "MIT Financial Mathematics Lectures", startDate: "01/05/2025", endDate: null },
        { title: "Technical Business Analyst at VMO2", startDate: "27/01/2025", endDate: null },
        // { title: "Quantum Information and Computation Lecture Notes by Richard Jozsa", startDate: "05/01/2025", endDate: null },
        { title: "Technical Business Analysis Training", startDate: "17/12/2024", endDate: "24/01/2025" },
        { title: "Reading Gulag Archipelago by Aleksandr Solzhenitsyn", startDate: "20/11/2024", endDate: "27/06/2025"}
    ];

    // Get the activities list element
    const activitiesList = document.getElementById("activities-list");

    function renderActivities() {
        if (!activitiesList) {
            console.error("Element with ID 'activities-list' not found.");
            return;
        }

        activitiesList.innerHTML = ""; // Clear previous list

        // Sort: ongoing first, then completed
        const sortedActivities = [...activities].sort((a, b) => {
            if (a.endDate === null && b.endDate !== null) return -1;
            if (a.endDate !== null && b.endDate === null) return 1;
            return 0;
        });

        sortedActivities.forEach((activity) => {
            const li = document.createElement("li");
            li.textContent = `${activity.title} (${activity.startDate}${activity.endDate ? ` -  ${activity.endDate}` : " - Present"})`;

            if (activity.endDate) {
                li.classList.add("completed");
            }

            activitiesList.appendChild(li);
        });
    }

    // Render activities on page load
    renderActivities();
});
