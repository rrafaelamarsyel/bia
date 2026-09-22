const galeriData = {
    know: [
        { src: "assets/tk/tk-bksn.webp", caption: "Belajar cerita Kitab Suci bersama-sama" },
        { src: "assets/tk/tk-kenaikanYesus.webp", caption: "Mengenal kisah Kenaikan Tuhan Yesus" },
        { src: "assets/tk/fr%20mengenal.webp", caption: "Ngobrol santai soal iman bareng Frater" },
        { src: "assets/tk/saviero%20berdoa.webp", caption: "Belajar berdoa dengan cara yang sederhana" }
    ],
    grow: [
        { src: "assets/bir/bir-games1.webp", caption: "Main bareng sambil belajar kerja sama" },
        { src: "assets/bir/bir-games2.webp", caption: "Games kelompok yang selalu ramai" },
        { src: "assets/bir/bir-kelas.webp", caption: "Kelas yang bikin makin dekat satu sama lain" },
        { src: "assets/bir/kelas%2034%20kumpul.webp", caption: "Kumpul bareng kelompok kelas 3-4 SD" }
    ],
    serve: [
        { src: "assets/lektor/lektor.webp", caption: "Belajar bertugas sebagai lektor di misa anak" },
        { src: "assets/lektor/lektor%20jov.webp", caption: "Membacakan Kitab Suci di depan teman-teman" },
        { src: "assets/lektor/sasa%20lektor.webp", caption: "Giliran bertugas melayani lewat bacaan" },
        { src: "assets/lektor/jov%20dkk%20persembahan.webp", caption: "Ikut membawa persembahan saat misa" }
    ]
};

const judulKategori = {
    know: "Know - Mengenal",
    grow: "Grow - Bertumbuh",
    serve: "Serve - Melayani"
};

let kategoriAktif = null;
let indexAktif = 0;

const overlay = document.getElementById("lightboxOverlay");
const imgEl = document.getElementById("lightboxImg");
const titleEl = document.getElementById("lightboxTitle");
const captionEl = document.getElementById("lightboxCaption");
const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");

function tampilkanFoto() {
    const foto = galeriData[kategoriAktif][indexAktif];
    imgEl.src = foto.src;
    imgEl.alt = judulKategori[kategoriAktif];
    titleEl.textContent = judulKategori[kategoriAktif];
    captionEl.textContent = foto.caption;
}

function bukaModal(kategori) {
    kategoriAktif = kategori;
    indexAktif = 0;
    tampilkanFoto();
    overlay.classList.add("active");
}

function tutupModal() {
    overlay.classList.remove("active");
}

function fotoBerikutnya() {
    const total = galeriData[kategoriAktif].length;
    indexAktif = (indexAktif + 1) % total;
    tampilkanFoto();
}

function fotoSebelumnya() {
    const total = galeriData[kategoriAktif].length;
    indexAktif = (indexAktif - 1 + total) % total;
    tampilkanFoto();
}

document.querySelectorAll(".why-card").forEach(card => {
    card.addEventListener("click", () => {
        bukaModal(card.dataset.category);
    });
});

if (btnClose) btnClose.addEventListener("click", tutupModal);
if (btnNext) btnNext.addEventListener("click", fotoBerikutnya);
if (btnPrev) btnPrev.addEventListener("click", fotoSebelumnya);

if (overlay) {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            tutupModal();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (!overlay || !overlay.classList.contains("active")) return;
    if (e.key === "Escape") tutupModal();
    if (e.key === "ArrowRight") fotoBerikutnya();
    if (e.key === "ArrowLeft") fotoSebelumnya();
});

async function loadComponent(selector, file) {
    const element = document.querySelector(selector);
    if (!element) return;

    const response = await fetch(file + "?v=" + Date.now(), { cache: "no-store" });
    element.innerHTML = await response.text();
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    });


    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");


        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

const heroSlides = document.querySelectorAll(".hero-slide");

if (heroSlides.length > 1) {
    let heroSlideIndex = 0;

    setInterval(() => {
        heroSlides[heroSlideIndex].classList.remove("active");
        heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
        heroSlides[heroSlideIndex].classList.add("active");
    }, 5000);
}

document.querySelectorAll(".video-frame").forEach(bingkai => {
    const video = bingkai.querySelector("video");

    if (!video) return;

    const tandaiSiap = () => bingkai.classList.add("is-siap");

    if (video.readyState >= 1) {
        tandaiSiap();
    } else {
        video.addEventListener("loadedmetadata", tandaiSiap);
    }
});
