// Centralized Projects Data with Rich Metadata & Modern Categories
const projectsData = [
    {
        id: "columnar-db",
        title: "Columnar Database Engine",
        shortDesc: "Custom column-oriented relational database engine built from scratch in pure Java with SQL parser & bitmap indexing.",
        description: "A custom column-oriented relational database engine built from scratch in pure Java. Features an AST-based SQL parser, dictionary encoding, fixed-width record layouts for O(1) random access, and low-cardinality bitmap indexing using Java BitSet to significantly accelerate filtered-scan queries.",
        image: "assets/images/projects/columnar-db.svg",
        icon: "assets/images/java.png",
        year: "2026",
        category: "systems",
        categoryLabel: "Systems & DB",
        featured: true,
        stats: "O(1) Record Access • 8.4x Scan Speedup",
        tags: ["Java", "Query Processing", "Bitmap Indexing", "Database Architecture", "AST Parser"],
        github: "https://github.com/JILSPATEL/Column-Store-Data-Storage-System.git"
    },
    {
        id: "microservices-devsecops",
        title: "Microservices Platform with DevSecOps",
        shortDesc: "Cloud-native e-commerce architecture across 6 microservices with Kubernetes, HPA, Prometheus & automated security gates.",
        description: "A resilient cloud-native system architected into 6 containerized microservices. Orchestrated on Kubernetes with Horizontal Pod Autoscaling (HPA) and Prometheus/Grafana monitoring, deployed via automated Jenkins/Ansible CI/CD pipelines, and hardened with Trivy vulnerability scanning, Syft SBOM generation, and Cosign cryptographic signatures.",
        image: "assets/images/projects/microservices-devsecops.svg",
        icon: "assets/images/devops.jpg",
        year: "2026",
        category: "devops",
        categoryLabel: "Cloud & DevSecOps",
        featured: true,
        stats: "6 Microservices • 0 Critical CVEs • Autoscaled",
        tags: ["Kubernetes", "Docker", "DevSecOps", "Jenkins", "Ansible", "Prometheus", "Trivy"],
        github: "https://github.com/JILSPATEL/spe-project.git"
    },
    {
        id: "banking-system",
        title: "Banking Management System",
        shortDesc: "Modular TCP-based client-server banking architecture written in C for Linux with thread-safe socket streaming.",
        description: "A high-performance modular client-server banking system implemented in C on Linux. Offers secure multi-client account management, atomic transaction handling, and structured socket communication using low-level POSIX socket APIs and file-locking primitives to eliminate race conditions.",
        image: "assets/images/projects/banking-system.svg",
        icon: "assets/images/linux.jpeg",
        year: "2025",
        category: "systems",
        categoryLabel: "Systems Programming",
        featured: true,
        stats: "POSIX Sockets • Multi-Client • Zero Deadlocks",
        tags: ["C Systems", "POSIX Sockets", "Linux Kernel", "Concurrency", "Client-Server"],
        github: "https://github.com/JILSPATEL/banking-management-system"
    },
    {
        id: "restaurant-billing",
        title: "Restaurant Billing & POS System",
        shortDesc: "Comprehensive desktop billing solution in Python & Tkinter backed by MySQL relational storage and instant invoicing.",
        description: "A comprehensive point-of-sale management system built with Python that streamlines restaurant order flows, handles menu cataloging, computes multi-tier taxes, and generates printable formatted invoices backed by a relational MySQL database schema.",
        image: "assets/images/projects/restaurant-billing.svg",
        icon: "assets/images/python.jpeg",
        year: "2024",
        category: "software",
        categoryLabel: "Application Dev",
        featured: false,
        stats: "100% Offline Capable • MySQL Ledger",
        tags: ["Python", "Tkinter GUI", "MySQL", "Database Normalization"],
        github: "https://github.com/JILSPATEL/restaurant-billing-system"
    },
    {
        id: "smart-farming",
        title: "Smart Farming Crop Predictor",
        shortDesc: "Machine learning crop recommendation engine achieving ~96% accuracy using soil N-P-K, pH & seasonal parameters.",
        description: "A data-driven agricultural intelligence model that recommends optimal crop types based on soil nutrient profiles (Nitrogen, Phosphorus, Potassium), pH balance, humidity, and rainfall. Achieved ~96% validation accuracy using ensemble decision trees with an interactive Flask interface.",
        image: "assets/images/projects/smart-farming.svg",
        icon: "assets/images/python.jpeg",
        year: "2023",
        category: "ai-ml",
        categoryLabel: "AI & Machine Learning",
        featured: true,
        stats: "~96.2% Accuracy • <15ms Inference",
        tags: ["Python", "Scikit-Learn", "Machine Learning", "Flask", "Data Science"],
        github: "https://github.com/JILSPATEL/smart-farming"
    }
];

// Render full projects grid (for projects.html) with category filtering and search
function renderProjectsGrid(selectedCategory = 'all', searchTerm = '') {
    const gridContainer = document.querySelector('.projects-grid');
    if (!gridContainer) return;

    const term = searchTerm.trim().toLowerCase();
    const filtered = projectsData.filter(project => {
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        const matchesSearch = !term || 
            project.title.toLowerCase().includes(term) ||
            project.description.toLowerCase().includes(term) ||
            project.tags.some(tag => tag.toLowerCase().includes(term));
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        gridContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No projects found</h3>
                <p>Try searching for a different keyword or resetting the category filter.</p>
                <button class="btn btn-secondary" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }

    gridContainer.innerHTML = filtered.map(project => `
        <article class="project-card glow-card" data-category="${project.category}">
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                <div class="project-badge-pill">
                    <span class="project-year">${project.year}</span>
                    <span class="project-cat-badge">${project.categoryLabel}</span>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header-row">
                    <h3 class="project-title">${project.title}</h3>
                </div>
                <p class="project-description">${project.description}</p>
                
                ${project.stats ? `
                    <div class="project-stat-pill">
                        <i class="fas fa-chart-line"></i> ${project.stats}
                    </div>
                ` : ''}

                <div class="tech-tags">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                
                <div class="project-card-footer">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <span>Source Code</span>
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}

// Function to render projects in modern card / timeline format on index.html
function renderHomeProjects() {
    const timelineContainer = document.querySelector('#projects .timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = projectsData.map((project, index) => {
        const isEven = index % 2 === 0;
        const alignClass = isEven ? 'timeline-left' : 'timeline-right';

        return `
            <div class="timeline-item ${alignClass} fade-in">
                <div class="timeline-dot">
                    <span class="timeline-dot-inner"></span>
                </div>
                <div class="timeline-content glass-panel">
                    <div class="timeline-top">
                        <div class="timeline-icon-wrap">
                            <img class="timeline-icon" src="${project.icon}" alt="${project.title}">
                        </div>
                        <div class="timeline-heading-meta">
                            <span class="timeline-badge">${project.year}</span>
                            <span class="timeline-category">${project.categoryLabel}</span>
                        </div>
                    </div>
                    <h3 class="timeline-title">${project.title}</h3>
                    <p class="timeline-desc">${project.description}</p>
                    
                    ${project.stats ? `
                        <div class="timeline-stat-tag">
                            <i class="fas fa-bolt"></i> ${project.stats}
                        </div>
                    ` : ''}

                    <div class="timeline-tags">
                        ${project.tags.slice(0, 4).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="timeline-actions">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="timeline-link">
                            <span>View Architecture & Code</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Global filter reset helper
function resetFilters() {
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) searchInput.value = '';
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
    renderProjectsGrid('all', '');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.projects-grid')) {
        renderProjectsGrid();

        // Bind filter pills if present
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('projectSearch');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-filter') || 'all';
                const term = searchInput ? searchInput.value : '';
                renderProjectsGrid(category, term);
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const activeBtn = document.querySelector('.filter-btn.active');
                const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
                renderProjectsGrid(category, this.value);
            });
        }
    }

    if (document.querySelector('#projects .timeline')) {
        renderHomeProjects();
    }
});
