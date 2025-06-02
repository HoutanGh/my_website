const quotes = [
    // "The Gods are an amalgamation of the emotions of the human race over time. Or the emotions of a single person over their life.",
    // "The fact that there are rules in chess means that you can play and enjoy chess. The fact that there are rules for life (it is finite) means that you can enjoy life, that's why the gods were jealous of the mortals.",
    // "The eternal damnation of committing sucide is to make sure you always die for others and never for yourself. Giving up and ending your life is to turn your back on God which means your greater purpose.",
    // "You got given a lottery ticket. At the end, make sure it was spent well.",
    "But how could you live and have no story to tell? -  Dostoevsky",
    "At 50, everyone has the face he deserves. - Orwell",
    "No tree can grow to Heaven unless its roots reach down to Hell. - Jung",
    "It is not the result but the spirit! - Solzhenitsyn"
]

const quoteElement = document.getElementById("quote");

if (quoteElement) {

    let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

    quoteElement.innerHTML = `&ldquo;${quotes[currentQuoteIndex]}&rdquo;`; // Add quotation marks
    quoteElement.style.opacity = 1;
    quoteElement.style.fontStyle = "italic";

    function updateQuote() {
        quoteElement.style.opacity = 0;

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

            quoteElement.innerHTML = `&ldquo;${quotes[currentQuoteIndex]}&rdquo;`;
            quoteElement.style.opacity = 1;

            
        }, 1000); // Matches the CSS transition duration
    }
    setInterval(updateQuote, 30000);
}

document.addEventListener("DOMContentLoaded", () => {
    // List of activities
    const activities = [
        { title: "Day Trading Projects", startDate: "2025-06-01", endDate: null },
        { title: "Reading Don Quixote by Cervantes", startDate: "2025-05-10", endDate: null },
        { title: "MIT Quantum Field Theory Lectures", startDate: "2025-05-01", endDate: null },
        { title: "Technical Consultant at VM02", startDate: "2025-01-27", endDate: null },
        { title: "Quantum Information and Computation Lecture Notes by Richard Jozsa", startDate: "2025-01-05", endDate: null },
        { title: "Technical Business Analysis Training", startDate: "2024-12-17", endDate: "2025-01-24" },
        { title: "Reading Gulag Archipelago by Aleksandr Solzhenitsyn", startDate: "2024-11-20", endDate: null }
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
            li.textContent = `${activity.title} (${activity.startDate}${activity.endDate ? ` -  Ended: ${activity.endDate}` : " - Present"})`;

            if (activity.endDate) {
                li.classList.add("completed");
            }

            activitiesList.appendChild(li);
        });
    }

    // Render activities on page load
    renderActivities();
});