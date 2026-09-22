const targetReveal = [
    ".why-card",
    ".vm-card",
    ".about-text",
    ".about-image",
    ".acara-card",
    ".rutin-card",
    ".alur-minggu",
    ".video-frame",
    ".gedung-foto",
    ".table-wrap",
    ".lokasi-card",
    ".info-board",
    ".faq-item",
    ".gabung-box",
    ".pembimbing-wrap",
    ".pembimbing-section .center",
    ".form-card",
    ".form-note",
    ".jadwal-head",
    ".keg-head",
    ".quick-card",
    ".panduan-card",
    ".testimoni-card",
    ".cta-banner-inner",
    ".tt-hero-text",
    ".tt-hero-media",
    ".tt-story-text",
    ".tt-story-media",
    ".tt-habit-card",
    ".tt-timeline li",
    ".tt-mentors-head",
    ".tt-cta"
].join(", ");

function initNavbar() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("navbarToggle");
    const menu = document.getElementById("navbar-menu");

    if (!menu) return;

    const halamanSekarang = window.location.pathname.split("/").pop() || "index.html";

    menu.querySelectorAll("a").forEach(link => {
        const fileLink = link.getAttribute("href").split("/").pop();
        link.classList.toggle("active", fileLink === halamanSekarang);
    });

    if (!toggle) return;

    const tutupMenu = () => {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
        const terbuka = menu.classList.toggle("active");
        toggle.classList.toggle("active", terbuka);
        toggle.setAttribute("aria-expanded", terbuka ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", tutupMenu);
    });

    document.addEventListener("click", event => {
        if (menu.classList.contains("active") && !navbar.contains(event.target)) {
            tutupMenu();
        }
    });
}

function pasangScrollNavbar() {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    const cekScroll = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    cekScroll();
    window.addEventListener("scroll", cekScroll, { passive: true });
}

function pasangReveal() {
    if (!("IntersectionObserver" in window)) return;

    const pengamat = new IntersectionObserver(daftar => {
        daftar.forEach(item => {
            if (item.isIntersecting) {
                item.target.classList.add("is-visible");
                pengamat.unobserve(item.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });

    const hitungAnak = new Map();

    document.querySelectorAll(targetReveal).forEach(el => {
        const induk = el.parentElement;
        const urutan = hitungAnak.get(induk) || 0;

        hitungAnak.set(induk, urutan + 1);
        el.style.setProperty("--delay", Math.min(urutan, 4) * 90 + "ms");
        el.classList.add("reveal");
        pengamat.observe(el);
    });
}

function pasangTransisiHalaman() {
    document.addEventListener("click", event => {
        const link = event.target.closest("a");

        if (!link) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target === "_blank" || link.hasAttribute("download")) return;

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

        const tujuan = new URL(link.href, window.location.href);

        if (tujuan.origin !== window.location.origin) return;
        if (tujuan.pathname === window.location.pathname) return;

        event.preventDefault();
        document.body.classList.add("keluar");

        setTimeout(() => {
            window.location.href = tujuan.href;
        }, 260);
    });

    window.addEventListener("pageshow", () => {
        document.body.classList.remove("keluar");
    });
}

initNavbar();
pasangScrollNavbar();
pasangReveal();
pasangTransisiHalaman();
