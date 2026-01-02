// Centralized projects data
const projectsData = [
    {
        title: "🏦 Banking Management System",
        description: "A modular TCP-based client–server banking system implemented in C on Linux, offering secure account management, transaction handling, and structured socket communication. Built with file-based storage and robust system-level practices.",
        image: "assets/images/project.png",
        icon: "assets/images/linux.jpeg", // For timeline view
        year: "2025",
        tags: ["C", "Client–Server", "Linux"],
        github: "https://github.com/JILSPATEL/banking-management-system"
    },
    {
        title: "💼 Restaurant Billing System",
        description: "A comprehensive billing management system built with Python that streamlines restaurant operations, handles order processing, and generates detailed invoices efficiently.",
        image: "assets/images/project.png",
        icon: "assets/images/python.jpeg", // For timeline view
        year: "2024",
        tags: ["Python", "Tkinter", "MySQL"],
        github: "https://github.com/JILSPATEL/restaurant-billing-system"
    },
    {
        title: "🛒 Ecommerce Solution",
        description: "A full-stack ecommerce web application featuring user authentication, product management, cart functionality, and secure order processing. Built with React for a responsive frontend, Node.js for backend APIs, and MySQL for reliable data storage.",
        image: "assets/images/project.png",
        icon: "assets/images/react.png", // For timeline view
        year: "2024",
        tags: ["React", "Node.js", "MySQL", "REST API"],
        github: "https://github.com/JILSPATEL/ecommerce_solution-react"

    },
    {
        title: "🌱 Smart Farming Crop Predictor",
        description: "A machine-learning based crop recommendation tool that predicts the best crop using soil nutrients (N, P, K), pH, and seasonal conditions. Helps farmers make data-driven decisions with ~96% accuracy, built using pandas, numpy, and scikit-learn.",
        image: "assets/images/project.png",
        icon: "assets/images/python.jpeg",
        year: "2023",
        tags: ["Python", "Machine Learning", "Flask"],
        github: "https://github.com/JILSPATEL/smart-farming"
    },
    {
        title: "💬 Chatting Application",
        description: "A real-time chatting application developed using Java Swing with socket programming, featuring a clean interface and secure messaging capabilities.",
        image: "assets/images/project.png",
        icon: "assets/images/java.png", // For timeline view
        year: "2022",
        tags: ["Java", "Swing", "Sockets"],
        github: "https://github.com/JILSPATEL/chating-application"
    }
];

// Function to render projects in grid format (for projects.html)
function renderProjectsGrid() {
    const gridContainer = document.querySelector('.projects-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = projectsData.map(project => `
        <div class="project-card">
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="tech-tags">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" class="project-link">
                    View on GitHub <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

// Function to render projects in timeline format (for index.html)
function renderProjectsTimeline() {
    const timelineContainer = document.querySelector('#projects .timeline');
    if (!timelineContainer) return;

    // Show all projects on homepage
    const homeProjects = projectsData;

    timelineContainer.innerHTML = homeProjects.map((project, index) => {
        // Alternate left and right positioning
        const alignment = index % 2 === 0 ? 'margin-right: auto;' : 'margin-left: auto;';

        return `
            <div class="timeline-item">
                <div class="timeline-content" style="${alignment}">
                    <img class="timeline-icon" src="${project.icon}" alt="${project.title}">
                    <h3 class="timeline-title">${project.title} (${project.year})</h3>
                    <p class="timeline-desc">${project.description}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Check which page we're on and render accordingly
    if (document.querySelector('.projects-grid')) {
        renderProjectsGrid();
    }
    if (document.querySelector('#projects .timeline')) {
        renderProjectsTimeline();
    }
});
