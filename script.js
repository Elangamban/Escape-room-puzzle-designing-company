const dropdownTriggers = document.querySelectorAll(".nav-item > a");
const dropdownMenus = document.querySelectorAll(".dropdown");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const searchTargets = [
    { label: "Home", url: "index.html", selector: ".index-hero", keywords: ["home", "index", "main"] },
    { label: "Demo 1", url: "demo1.html", selector: ".hero", keywords: ["demo 1", "demo1", "hospital", "detective", "puzzles"] },
    { label: "Demo 2", url: "demo2.html", selector: ".hero-dark", keywords: ["demo 2", "demo2", "dark room", "challenge"] },
    { label: "About Us", url: "about.html", selector: ".about-hero", keywords: ["about", "about us", "mission", "team"] },
    { label: "Login", url: "login.html", selector: ".login-page", keywords: ["login", "sign in", "member access"] },
    { label: "Game Features", url: "demo1.html", selector: ".demo-features", keywords: ["features", "timer", "hidden clues", "clues"] },
    { label: "Rooms", url: "demo1.html", selector: ".rooms", keywords: ["rooms", "prison", "haunted", "detective room"] }
    ,{ label: "Room 3", url: "room 3.html", selector: ".room-hero.lab", keywords: ["room 3", "secret lab", "lab", "science puzzles"] }
];

function setActiveMenu() {
    const pageMenuMap = {
        "index.html": "demos",
        "demo1.html": "demos",
        "demo2.html": "demos",
        "about.html": "about",
        "faq.html": "about",
        "pricing.html": "about",
        "our story.html": "about",
        "testimonials.html": "about",
        "contact us.html": "contact",
        "rooms.html": "rooms",
        "room 1.html": "rooms",
        "room 2.html": "rooms",
        "room 3.html": "rooms",
        "news.html": "news"
    };

    const activeMenu = pageMenuMap[currentPage];
    if (!activeMenu) {
        return;
    }

    document.querySelectorAll(".nav [data-menu]").forEach((link) => {
        link.classList.toggle("active", link.dataset.menu === activeMenu);
    });
}

function closeAllDropdowns(exceptMenu = null) {
    dropdownMenus.forEach((menu) => {
        if (menu !== exceptMenu) {
            menu.style.display = "none";
        }
    });
}

dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
        const dropdown = trigger.nextElementSibling;
        const href = trigger.getAttribute("href");
        const isHashLink = href && href.startsWith("#");

        if (dropdown && dropdown.classList.contains("dropdown")) {
            e.preventDefault();
            const shouldOpen = dropdown.style.display !== "block";
            closeAllDropdowns(shouldOpen ? dropdown : null);
            dropdown.style.display = shouldOpen ? "block" : "none";
            return;
        }

        if (isHashLink) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

document.querySelectorAll(".dropdown a").forEach((link) => {
    link.addEventListener("click", () => {
        closeAllDropdowns();
    });
});

document.querySelectorAll(".nav > a").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            closeAllDropdowns();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
        closeAllDropdowns();
    }
});

setActiveMenu();

function openLogin() {
    window.location.href = "login.html";
}

function ensureBookingModal() {
    const existingModal = document.querySelector(".booking-overlay");
    if (existingModal) {
        return existingModal;
    }

    const overlay = document.createElement("div");
    overlay.className = "booking-overlay";
    overlay.innerHTML = `
        <div class="booking-modal" role="dialog" aria-modal="true" aria-label="Book escape room">
            <div class="booking-modal-top">
                <div>
                    <p class="booking-modal-kicker">Reserve Your Slot</p>
                    <h3 class="booking-modal-title">Book This Room</h3>
                </div>
                <button type="button" class="booking-close" aria-label="Close booking">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
            <form class="booking-form">
                <div class="booking-field">
                    <label for="bookingRoom">Room</label>
                    <input id="bookingRoom" name="room" type="text" readonly>
                </div>
                <div class="booking-field">
                    <label for="bookingName">Your Name</label>
                    <input id="bookingName" name="name" type="text" placeholder="Enter your name" required>
                </div>
                <div class="booking-grid">
                    <div class="booking-field">
                        <label for="bookingDate">Date</label>
                        <input id="bookingDate" name="date" type="date" required>
                    </div>
                    <div class="booking-field">
                        <label for="bookingTeam">Team Size</label>
                        <select id="bookingTeam" name="team" required>
                            <option value="">Select</option>
                            <option>2 Players</option>
                            <option>3 Players</option>
                            <option>4 Players</option>
                            <option>5 Players</option>
                            <option>6 Players</option>
                        </select>
                    </div>
                </div>
                <button class="btn booking-confirm" type="submit">Confirm Booking</button>
                <p class="booking-status">Choose your date and team size to reserve this room.</p>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
}

function closeBookingModal() {
    const overlay = document.querySelector(".booking-overlay");
    if (overlay) {
        overlay.classList.remove("open");
    }
}

function openBookingModal(roomName = "MystIQ Room") {
    const overlay = ensureBookingModal();
    const roomInput = overlay.querySelector("#bookingRoom");
    const nameInput = overlay.querySelector("#bookingName");
    const dateInput = overlay.querySelector("#bookingDate");
    const status = overlay.querySelector(".booking-status");
    const title = overlay.querySelector(".booking-modal-title");

    roomInput.value = roomName;
    title.textContent = `Book ${roomName}`;
    status.textContent = "Choose your date and team size to reserve this room.";
    nameInput.value = "";
    dateInput.value = "";
    overlay.querySelector("#bookingTeam").value = "";
    overlay.classList.add("open");

    setTimeout(() => nameInput.focus(), 0);
}

function setupBookingModal() {
    const overlay = ensureBookingModal();
    const form = overlay.querySelector(".booking-form");
    const closeButton = overlay.querySelector(".booking-close");
    const status = overlay.querySelector(".booking-status");

    closeButton.addEventListener("click", closeBookingModal);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeBookingModal();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const room = formData.get("room");
        const name = formData.get("name");
        const date = formData.get("date");
        const team = formData.get("team");

        status.textContent = `${name}, your ${room} booking for ${date} with ${team} is confirmed.`;
        form.reset();

        setTimeout(() => {
            closeBookingModal();
        }, 1800);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeBookingModal();
        }
    });
}

function ensureSearchOverlay() {
    const existingOverlay = document.querySelector(".search-overlay");
    if (existingOverlay) {
        return existingOverlay;
    }

    const overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.innerHTML = `
        <div class="search-panel" role="dialog" aria-modal="true" aria-label="Site search">
            <div class="search-panel-top">
                <h3>Search MystIQ</h3>
                <button type="button" class="search-close" aria-label="Close search">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
            <form class="search-form">
                <input class="search-input" type="search" placeholder="Search pages, rooms, clues..." autocomplete="off">
                <button class="btn search-submit" type="submit">Search</button>
            </form>
            <div class="search-hints">
                <button type="button" class="search-chip">About Us</button>
                <button type="button" class="search-chip">Demo 1</button>
                <button type="button" class="search-chip">Game Features</button>
                <button type="button" class="search-chip">Login</button>
            </div>
            <p class="search-status">Try keywords like "about", "demo 1", "features", or "login".</p>
        </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
}

function closeSearchOverlay() {
    const overlay = document.querySelector(".search-overlay");
    if (overlay) {
        overlay.classList.remove("open");
    }
}

function openSearchOverlay(prefill = "") {
    const overlay = ensureSearchOverlay();
    const input = overlay.querySelector(".search-input");
    const status = overlay.querySelector(".search-status");

    overlay.classList.add("open");
    input.value = prefill;
    status.textContent = 'Try keywords like "about", "demo 1", "features", or "login".';
    setTimeout(() => input.focus(), 0);
}

function normalizeValue(value) {
    return value.trim().toLowerCase();
}

function findSearchTarget(query) {
    const normalizedQuery = normalizeValue(query);
    if (!normalizedQuery) {
        return null;
    }

    return searchTargets.find((target) => {
        const normalizedLabel = normalizeValue(target.label);
        const matchesLabel = normalizedLabel.includes(normalizedQuery) || normalizedQuery.includes(normalizedLabel);
        const matchesKeyword = target.keywords.some((keyword) => {
            const normalizedKeyword = normalizeValue(keyword);
            return normalizedKeyword.includes(normalizedQuery) || normalizedQuery.includes(normalizedKeyword);
        });
        return matchesLabel || matchesKeyword;
    });
}

function goToSearchTarget(target) {
    if (!target) {
        return false;
    }

    if (currentPage === target.url) {
        const targetElement = document.querySelector(target.selector);
        if (targetElement) {
            closeSearchOverlay();
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            return true;
        }
    }

    window.location.href = target.url;
    return true;
}

function setupSearch() {
    const searchButtons = document.querySelectorAll(".search");
    if (!searchButtons.length) {
        return;
    }

    const overlay = ensureSearchOverlay();
    const form = overlay.querySelector(".search-form");
    const input = overlay.querySelector(".search-input");
    const closeButton = overlay.querySelector(".search-close");
    const status = overlay.querySelector(".search-status");

    searchButtons.forEach((button) => {
        button.addEventListener("click", () => openSearchOverlay());
    });

    closeButton.addEventListener("click", closeSearchOverlay);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeSearchOverlay();
        }
    });

    overlay.querySelectorAll(".search-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            const query = chip.textContent || "";
            input.value = query;
            const target = findSearchTarget(query);

            if (!goToSearchTarget(target)) {
                status.textContent = "No matching page found for that quick search.";
            }
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = input.value;
        const target = findSearchTarget(query);

        if (goToSearchTarget(target)) {
            return;
        }

        status.textContent = `No result found for "${query}". Try "about", "demo 1", or "login".`;
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearchOverlay();
        }
    });
}

/* =============================================
   DARK MODE TOGGLE
   ============================================= */
function updateDarkBtn() {
    const btn = document.getElementById('darkModeToggle');
    if (!btn) return;
    const isLight = document.body.classList.contains('light-mode');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('mystiq-theme', isLight ? 'light' : 'dark');
    updateDarkBtn();
}

function initDarkMode() {
    if (localStorage.getItem('mystiq-theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    updateDarkBtn();
}

/* =============================================
   LTR / RTL DIRECTION TOGGLE
   ============================================= */
function updateDirBtn() {
    const btn = document.getElementById('dirToggle');
    if (!btn) return;
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const label = btn.querySelector('.dir-label');
    if (label) {
        label.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
    }
    btn.title = currentDir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left';
}

function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('mystiq-dir', newDir);
    updateDirBtn();
}

function initDirection() {
    const savedDir = localStorage.getItem('mystiq-dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateDirBtn();
}

/* =============================================
   INJECT TOGGLE BUTTONS INTO ALL PAGES
   ============================================= */
function injectToggles() {
    const darkBtn = document.createElement('button');
    darkBtn.className = 'icon-btn';
    darkBtn.id = 'darkModeToggle';
    darkBtn.setAttribute('aria-label', 'Toggle dark/light mode');
    darkBtn.addEventListener('click', toggleDarkMode);

    const dirBtn = document.createElement('button');
    dirBtn.className = 'icon-btn dir-toggle';
    dirBtn.id = 'dirToggle';
    dirBtn.setAttribute('aria-label', 'Toggle text direction');
    dirBtn.innerHTML = '<span class="dir-label">RTL</span>';
    dirBtn.addEventListener('click', toggleDirection);

    const rightSection = document.querySelector('.right-section');
    if (rightSection) {
        const loginBtn = rightSection.querySelector('.login-btn');
        if (loginBtn) {
            rightSection.insertBefore(dirBtn, loginBtn);
            rightSection.insertBefore(darkBtn, dirBtn);
        } else {
            rightSection.appendChild(darkBtn);
            rightSection.appendChild(dirBtn);
        }
    } else {
        /* Pages without a header (e.g. login.html) — floating widget */
        const wrapper = document.createElement('div');
        wrapper.className = 'toggle-float';
        wrapper.appendChild(darkBtn);
        wrapper.appendChild(dirBtn);
        document.body.appendChild(wrapper);
    }

    /* Sync button states after injection */
    updateDarkBtn();
    updateDirBtn();
}

/* Apply preferences immediately to avoid flash, then inject buttons */
initDarkMode();
initDirection();
injectToggles();

setupSearch();
setupBookingModal();

function setupContactForm() {
    const form = document.querySelector(".contact-message-form");
    if (!form) {
        return;
    }

    const status = document.querySelector(".contact-form-status");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = (formData.get("name") || "").toString().trim() || "Your team";
        const room = (formData.get("room") || "").toString().trim();

        if (status) {
            status.textContent = room
                ? `${name}, your message about ${room} has been sent. Our team will contact you soon.`
                : `${name}, your message has been sent. Our team will contact you soon.`;
        }

        form.reset();
    });
}

setupContactForm();

function enhanceFooter() {
    document.querySelectorAll(".footer-left").forEach((footerBlock) => {
        if (footerBlock.querySelector(".footer-copy")) {
            return;
        }

        const socialLinks = footerBlock.querySelector(".social-links");
        if (!socialLinks) {
            return;
        }

        const copy = document.createElement("p");
        copy.className = "footer-copy";
        copy.textContent = "Story-driven escape rooms built for teamwork, pressure, and unforgettable reveals.";
        footerBlock.insertBefore(copy, socialLinks);
    });
}

enhanceFooter();

function enhanceFooterColumns() {
    document.querySelectorAll(".footer-column").forEach((column) => {
        if (column.querySelector(".footer-note")) {
            return;
        }

        const heading = column.querySelector("h3");
        const list = column.querySelector("ul");
        if (!heading || !list) {
            return;
        }

        const label = heading.textContent.trim().toLowerCase();
        const note = document.createElement("p");
        note.className = "footer-note";

        if (label.includes("demos")) {
            note.textContent = "Explore preview worlds before stepping into the full challenge.";
        } else if (label.includes("rooms")) {
            note.textContent = "Choose the atmosphere and pressure level that fits your team.";
        } else {
            note.textContent = "Quick links to the most useful pages across the MystIQ experience.";
        }

        column.insertBefore(note, list);
    });
}

enhanceFooterColumns();

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("loginPassword");
    const passwordIcon = document.querySelector(".password-toggle i");

    if (!passwordInput || !passwordIcon) {
        return;
    }

    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    passwordIcon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
}
