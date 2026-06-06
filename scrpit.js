// Premium Book Database
const BOOK_DATABASE = [
    {
        id: "1",
        title: "The Alchemist's Odyssey",
        author: "Aurelius Vance",
        price: "$450",
        tag: "Limited Edition",
        category: "limited",
        excerpt: "An exquisite leather-bound collection detailing the forgotten philosophy of early modern natural science.",
        description: "The Alchemist's Odyssey is an archival masterpiece. Each copy is hand-sewn and bound in full-grain calfskin leather, hand-dyed in deep forest green. The cover features an elaborate gold foil design inspired by 17th-century astronomical charts, pressed with a manual hot stamping press. Each book contains an individual handwritten number and is signed by both the author and the master binder. Accompanied by a certificate of authenticity.",
        image: "assets/book_1.png",
        binding: "Full-Grain Calfskin Leather, Hand-Dyed",
        printRun: "Strictly limited to 50 numbered copies",
        paper: "120gsm Italian Archival Cotton Paper",
        releaseDate: "Available Now"
    },
    {
        id: "2",
        title: "Empire of Velvet & Gold",
        author: "Isabella De Medici",
        price: "$680",
        tag: "Rare Archive",
        category: "limited",
        excerpt: "A profound history of Florentine renaissance art, bound in dark velvet with solid brass ornamentations.",
        description: "Empire of Velvet & Gold brings the renaissance back to life. Bound in a rich, dark velvet cover, this volume features hand-cast brass corner protectors and a functioning decorative heavy gold brass clasp. The pages are gilded on all three edges in 24k gold leaf. It is printed using high-contrast black ink and metallic gold accents throughout the interior typography, creating an unparalleled tactile reading experience.",
        image: "assets/book_2.png",
        binding: "Plush Silk-Velvet with Hand-Cast Solid Brass Trim",
        printRun: "Limited to 25 copies globally",
        paper: "140gsm Acid-free Japanese Mulberry Paper",
        releaseDate: "Available Now"
    },
    {
        id: "3",
        title: "Sovereigns of the Cosmos",
        author: "Dr. Kaelen Vance",
        price: "$320",
        tag: "Pre-Release",
        category: "pre-release",
        excerpt: "A luxury hardcover explore of astronomical physics and abstract geometry, featuring gold leaf patterns.",
        description: "Sovereigns of the Cosmos explores deep space and cosmology through an artistic lens. The modern luxury cover is finished in a premium matte navy-black cloth with minimalist geometric lines pressed in bright gold leaf. It includes twenty-four full-color plates printed on high-gloss heavy cardstock. Securing a pre-release copy grants access to a private virtual launch event hosted by Dr. Kaelen Vance.",
        image: "assets/book_3.png",
        binding: "Matte Silk-Cloth over Board with Fine Foil Stamp",
        printRun: "Pre-release limit: 100 registered copies",
        paper: "135gsm Matte Premium Art Paper",
        releaseDate: "Releasing July 15, 2026"
    }
];

// Helper: Format WhatsApp Link
function getWhatsAppLink(message) {
    const defaultNumber = "15559876543"; // Placeholder luxury concierge number
    return `https://wa.me/${defaultNumber}?text=${encodeURIComponent(message)}`;
}

// Initialize Page Features
document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Sticky Header Transparency Control
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.background = "rgba(6, 8, 6, 0.95)";
        } else {
            header.style.padding = "0";
            header.style.background = "rgba(10, 12, 10, 0.8)";
        }
    });

    // 3. Dynamic Page Handler: Home Page
    if (document.getElementById("home-featured-grid")) {
        renderFeaturedBooks();
    }

    // 4. Dynamic Page Handler: Shop Page
    if (document.getElementById("shop-books-grid")) {
        renderShopBooks();
        setupShopFilters();
    }

    // 5. Dynamic Page Handler: Book Detail Page
    if (document.getElementById("book-detail-container")) {
        renderBookDetails();
    }

    // 6. Membership Application Form
    const membershipForm = document.getElementById("membership-apply-form");
    if (membershipForm) {
        setupMembershipForm(membershipForm);
    }
});

// Render Books on Home Page (Featured)
function renderFeaturedBooks() {
    const grid = document.getElementById("home-featured-grid");
    grid.innerHTML = "";

    // Show all 3 books as featured
    BOOK_DATABASE.forEach((book, index) => {
        const card = createBookCard(book, index);
        grid.appendChild(card);
    });
}

// Render Books on Shop Page
function renderShopBooks(filter = "all") {
    const grid = document.getElementById("shop-books-grid");
    grid.innerHTML = "";

    const filtered = filter === "all"
        ? BOOK_DATABASE
        : BOOK_DATABASE.filter(b => b.category === filter);

    filtered.forEach((book, index) => {
        const card = createBookCard(book, index);
        grid.appendChild(card);
    });
}

// Setup Shop Page Filters
function setupShopFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            buttons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const filterValue = e.target.getAttribute("data-filter");
            renderShopBooks(filterValue);
        });
    });
}

// Create Card HTML DOM Element
function createBookCard(book, index) {
    const div = document.createElement("div");
    div.className = "book-card reveal";
    // Slight delay styling for stagger effect
    div.style.transitionDelay = `${index * 150}ms`;

    div.innerHTML = `
        <div class="book-card-img-wrapper">
            <span class="book-tag">${book.tag}</span>
            <img src="${book.image}" alt="${book.title}" loading="lazy">
        </div>
        <div class="book-card-content">
            <span class="book-meta">By ${book.author}</span>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-excerpt">${book.excerpt}</p>
            <div class="book-footer">
                <span class="book-price">${book.price}</span>
                <a href="book-detail.html?id=${book.id}" class="btn-text">
                    View Details
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    `;

    // Manually trigger intersection observer for dynamically generated elements
    setTimeout(() => {
        div.classList.add("active");
    }, 100);

    return div;
}

// Render Book Detail Page dynamically from URL param
function renderBookDetails() {
    const container = document.getElementById("book-detail-container");
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id") || "1"; // Fallback to book 1

    const book = BOOK_DATABASE.find(b => b.id === bookId);
    if (!book) {
        container.innerHTML = `<div class="reveal" style="text-align:center; padding: 100px 0;"><h2 style="font-size:32px; margin-bottom:20px;">Masterpiece Not Found</h2><a href="shop.html" class="btn btn-primary">Return to Collection</a></div>`;
        return;
    }

    // Dynamic document title update
    document.title = `${book.title} — Booky`;

    const detailHTML = `
        <div class="detail-gallery reveal">
            <div class="detail-img-container">
                <img src="${book.image}" alt="${book.title}">
            </div>
        </div>
        <div class="detail-info reveal" style="transition-delay: 200ms;">
            <span class="detail-tag">${book.tag}</span>
            <h1 class="detail-title">${book.title}</h1>
            <div class="detail-author">By <span class="serif-italic">${book.author}</span></div>
            <div class="detail-price">${book.price}</div>
            <p class="detail-desc">${book.description}</p>
            
            <div class="detail-specs">
                <h3 class="detail-specs-title">Architectural Specifications</h3>
                <div class="spec-row">
                    <span class="spec-label">Binding</span>
                    <span class="spec-value">${book.binding}</span>
                </div>
                <div class="spec-row">
                    <span class="spec-label">Print Run</span>
                    <span class="spec-value">${book.printRun}</span>
                </div>
                <div class="spec-row">
                    <span class="spec-label">Paper Mill</span>
                    <span class="spec-value">${book.paper}</span>
                </div>
                <div class="spec-row">
                    <span class="spec-label">Availability</span>
                    <span class="spec-value">${book.releaseDate}</span>
                </div>
            </div>
            
            <div class="detail-actions">
                <a href="${getWhatsAppLink(`Hello Booky Concierge, I would like to inquire about reserving a copy of "${book.title}" (ID: ${book.id}). Please let me know the secure steps to complete this transaction.`)}" target="_blank" class="btn btn-primary" style="display:flex; align-items:center; gap:10px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.233-1.371a9.994 9.994 0 0 0 4.779 1.205h.005c5.505 0 9.99-4.478 9.99-9.985C22.007 6.478 17.518 2 12.012 2zm6.069 14.141c-.252.712-1.462 1.307-2.014 1.388-.5.074-1.15.107-1.83-.115-2.72-.887-4.479-3.66-4.614-3.844-.136-.184-1.102-1.469-1.102-2.805 0-1.337.697-1.996.944-2.261.248-.266.541-.332.721-.332.18 0 .36.002.518.01.162.007.382-.062.597.456.225.54.765 1.868.832 2.003.067.136.112.294.022.474-.09.18-.135.293-.27.451-.135.158-.283.352-.405.473-.135.135-.276.282-.12.551.157.269.7 1.147 1.498 1.859.932.833 1.72 1.09 1.963 1.21.243.12.387.102.53-.062.145-.164.613-.715.776-.957.163-.243.326-.203.551-.12.225.082 1.428.674 1.675.798.248.124.41.186.472.293.062.107.062.618-.19 1.33z"/>
                    </svg>
                    Order via Concierge
                </a>
                <a href="shop.html" class="btn btn-secondary">Explore More</a>
            </div>
        </div>
    `;

    container.innerHTML = detailHTML;
}

// Setup Membership Form Success Handler
function setupMembershipForm(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Grab values
        const name = document.getElementById("client-name").value;
        const email = document.getElementById("client-email").value;
        const interest = document.getElementById("client-interest").value;
        const note = document.getElementById("client-note").value;

        // Custom Modal Overlay
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.innerHTML = `
            <div class="modal-box">
                <div class="modal-icon">✓</div>
                <h3 class="modal-title">Application Lodged</h3>
                <p class="modal-text">Thank you, Mr./Ms. ${name}. Your request for access to the Booky elite catalog has been securely dispatched. Our concierge team will review your application and respond within 24 hours.</p>
                <button class="btn btn-primary modal-close-btn" style="width: 100%;">Return to Booky</button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Trigger animation
        setTimeout(() => {
            overlay.classList.add("active");
        }, 10);

        // Bind close event
        overlay.querySelector(".modal-close-btn").addEventListener("click", () => {
            overlay.classList.remove("active");
            setTimeout(() => {
                overlay.remove();
                form.reset();
                window.location.href = "index.html"; // Send them back to home
            }, 500);
        });
    });
}

// Global WhatsApp Handler for Hero / Contact sections
window.contactConcierge = function (reason = "General Inquiry") {
    const text = `Hello Booky Concierge, I am interested in your bespoke collection and premium membership services. Purpose of contact: ${reason}. Please advise on the current acquisition listings.`;
    window.open(getWhatsAppLink(text), "_blank");
};
