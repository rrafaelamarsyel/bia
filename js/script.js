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
    overlay.dataset.category = kategori;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function tutupModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
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
    card.addEventListener("click", () => bukaModal(card.dataset.category));
});

if (btnClose) btnClose.addEventListener("click", tutupModal);
if (btnNext) btnNext.addEventListener("click", fotoBerikutnya);
if (btnPrev) btnPrev.addEventListener("click", fotoSebelumnya);

if (overlay) {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) tutupModal();
    });
}

document.addEventListener("keydown", (e) => {
    if (!overlay || !overlay.classList.contains("active")) return;
    if (e.key === "Escape") tutupModal();
    if (e.key === "ArrowRight") fotoBerikutnya();
    if (e.key === "ArrowLeft") fotoSebelumnya();
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