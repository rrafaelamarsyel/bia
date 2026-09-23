document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const tombolKiri = carousel.querySelector("[data-prev]");
    const tombolKanan = carousel.querySelector("[data-next]");
    const kotakDots = carousel.querySelector("[data-dots]");
    const jeda = Number(carousel.dataset.autoplay) || 0;
    const dots = [];

    let indexAktif = 0;
    let timer = null;
    let mulaiX = 0;
    let sedangHover = false;

    function pindah(tujuan) {
        indexAktif = (tujuan + slides.length) % slides.length;
        track.style.transform = "translateX(-" + indexAktif * 100 + "%)";
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === indexAktif));
    }

    function mulaiAutoplay() {
        clearInterval(timer);
        if (jeda > 0 && slides.length > 1 && !sedangHover) {
            timer = setInterval(() => pindah(indexAktif + 1), jeda);
        }
    }

    slides.forEach((slide, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Foto ke-" + (i + 1));

        dot.addEventListener("click", () => {
            pindah(i);
            mulaiAutoplay();
        });

        kotakDots.appendChild(dot);
        dots.push(dot);
    });

    if (slides.length < 2) {
        tombolKiri.style.display = "none";
        tombolKanan.style.display = "none";
        kotakDots.style.display = "none";
    }

    tombolKiri.addEventListener("click", () => {
        pindah(indexAktif - 1);
        mulaiAutoplay();
    });

    tombolKanan.addEventListener("click", () => {
        pindah(indexAktif + 1);
        mulaiAutoplay();
    });

    track.addEventListener("pointerdown", e => { mulaiX = e.clientX; });

    track.addEventListener("pointerup", e => {
        const selisih = e.clientX - mulaiX;
        if (selisih > 40) {
            pindah(indexAktif - 1);
        } else {
            pindah(indexAktif + 1);
        }
        mulaiAutoplay();
    });

    carousel.addEventListener("mouseenter", () => {
        sedangHover = true;
        clearInterval(timer);
    });

    carousel.addEventListener("mouseleave", () => {
        sedangHover = false;
        mulaiAutoplay();
    });

    pindah(0);
    mulaiAutoplay();
});

const acaraOverlay = document.getElementById("acaraOverlay");
const acaraScroll = document.getElementById("acaraModalScroll");
const acaraImg = document.getElementById("acaraModalImg");
const acaraTag = document.getElementById("acaraModalTag");
const acaraJudul = document.getElementById("acaraModalJudul");
const acaraIsi = document.getElementById("acaraModalIsi");
const acaraClose = document.getElementById("acaraClose");

function bukaAcara(kartu) {
    const gambar = kartu.querySelector("img");

    acaraImg.src = gambar.src;
    acaraImg.alt = gambar.alt;
    acaraTag.textContent = kartu.querySelector(".acara-tag").textContent;
    acaraJudul.textContent = kartu.querySelector("h3").textContent;
    acaraIsi.innerHTML = kartu.querySelector(".acara-artikel").innerHTML;
    acaraScroll.scrollTop = 0;

    acaraOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    const galeriFoto = [{ src: gambar.src, alt: gambar.alt }];
    acaraIsi.querySelectorAll(".acara-modal-gallery img").forEach(gImg => {
        galeriFoto.push({ src: gImg.src, alt: gImg.alt });
    });

    acaraImg.onclick = () => bukaImgLightbox(galeriFoto, 0);

    acaraIsi.querySelectorAll(".acara-modal-gallery img").forEach((gImg, i) => {
        gImg.addEventListener("click", () => bukaImgLightbox(galeriFoto, i + 1));
    });
}

function tutupAcara() {
    acaraOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

if (acaraOverlay) {
    document.querySelectorAll(".acara-card").forEach(kartu => {
        kartu.setAttribute("tabindex", "0");
        kartu.setAttribute("role", "button");

        kartu.addEventListener("click", () => bukaAcara(kartu));

        kartu.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bukaAcara(kartu);
            }
        });
    });

    acaraClose.addEventListener("click", tutupAcara);

    acaraOverlay.addEventListener("click", e => {
        if (e.target === acaraOverlay) tutupAcara();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && acaraOverlay.classList.contains("active") && !document.getElementById("imgLightboxOverlay").classList.contains("active")) {
            tutupAcara();
        }
    });
}

const aktivitasOverlay = document.getElementById("aktivitasOverlay");
const aktivitasImg = document.getElementById("aktivitasModalImg");
const aktivitasTag = document.getElementById("aktivitasModalTag");
const aktivitasJudul = document.getElementById("aktivitasModalJudul");
const aktivitasDesc = document.getElementById("aktivitasModalDesc");
const aktivitasCaption = document.getElementById("aktivitasModalCaption");
const aktivitasClose = document.getElementById("aktivitasClose");
const aktivitasPrev = document.getElementById("aktivitasPrev");
const aktivitasNext = document.getElementById("aktivitasNext");
const aktivitasDots = document.getElementById("aktivitasDots");

let aktivitasGaleri = [];
let aktivitasIndex = 0;

function tampilkanAktivitasFoto() {
    const foto = aktivitasGaleri[aktivitasIndex];

    aktivitasImg.src = foto.src;
    aktivitasImg.alt = foto.caption;
    aktivitasCaption.textContent = foto.caption;

    aktivitasDots.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === aktivitasIndex);
    });
}

function bukaAktivitas(kartu) {
    const { title, tag, desc, images } = kartu.dataset;

    aktivitasGaleri = images.split(",").map(item => {
        const [src, caption] = item.split("|");
        return { src, caption };
    });

    aktivitasIndex = 0;
    aktivitasTag.textContent = tag;
    aktivitasJudul.textContent = title;
    aktivitasDesc.textContent = desc;

    aktivitasDots.innerHTML = "";

    aktivitasGaleri.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Foto ke-" + (i + 1));
        dot.addEventListener("click", () => {
            aktivitasIndex = i;
            tampilkanAktivitasFoto();
        });
        aktivitasDots.appendChild(dot);
    });

    tampilkanAktivitasFoto();
    aktivitasOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function tutupAktivitas() {
    aktivitasOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

function aktivitasBerikutnya() {
    aktivitasIndex = (aktivitasIndex + 1) % aktivitasGaleri.length;
    tampilkanAktivitasFoto();
}

function aktivitasSebelumnya() {
    aktivitasIndex = (aktivitasIndex - 1 + aktivitasGaleri.length) % aktivitasGaleri.length;
    tampilkanAktivitasFoto();
}

if (aktivitasOverlay) {
    document.querySelectorAll(".aktivitas-card").forEach(kartu => {
        kartu.setAttribute("tabindex", "0");
        kartu.setAttribute("role", "button");

        kartu.addEventListener("click", () => bukaAktivitas(kartu));

        kartu.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bukaAktivitas(kartu);
            }
        });
    });

    aktivitasClose.addEventListener("click", tutupAktivitas);
    aktivitasNext.addEventListener("click", aktivitasBerikutnya);
    aktivitasPrev.addEventListener("click", aktivitasSebelumnya);

    aktivitasOverlay.addEventListener("click", e => {
        if (e.target === aktivitasOverlay) tutupAktivitas();
    });

    document.addEventListener("keydown", e => {
        if (!aktivitasOverlay.classList.contains("active")) return;
        if (e.key === "Escape") tutupAktivitas();
        if (e.key === "ArrowRight") aktivitasBerikutnya();
        if (e.key === "ArrowLeft") aktivitasSebelumnya();
    });
}

const imgLightboxOverlay = document.getElementById("imgLightboxOverlay");
const imgLightboxImg = document.getElementById("imgLightboxImg");
const imgLightboxClose = document.getElementById("imgLightboxClose");
const imgLightboxPrev = document.getElementById("imgLightboxPrev");
const imgLightboxNext = document.getElementById("imgLightboxNext");
const imgLightboxCounter = document.getElementById("imgLightboxCounter");

let imgLightboxData = [];
let imgLightboxIndex = 0;
let imgLightboxMulaiX = 0;

function tampilkanImgLightbox() {
    const foto = imgLightboxData[imgLightboxIndex];
    imgLightboxImg.src = foto.src;
    imgLightboxImg.alt = foto.alt;

    const banyak = imgLightboxData.length;
    const tampilkanNav = banyak > 1;

    imgLightboxCounter.textContent = (imgLightboxIndex + 1) + " / " + banyak;
    imgLightboxPrev.style.display = tampilkanNav ? "flex" : "none";
    imgLightboxNext.style.display = tampilkanNav ? "flex" : "none";
    imgLightboxCounter.style.display = tampilkanNav ? "inline-block" : "none";
}

function bukaImgLightbox(daftarFoto, index) {
    imgLightboxData = daftarFoto;
    imgLightboxIndex = index;
    tampilkanImgLightbox();
    imgLightboxOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function tutupImgLightbox() {
    imgLightboxOverlay.classList.remove("active");
}

function imgLightboxBerikutnya() {
    imgLightboxIndex = (imgLightboxIndex + 1) % imgLightboxData.length;
    tampilkanImgLightbox();
}

function imgLightboxSebelumnya() {
    imgLightboxIndex = (imgLightboxIndex - 1 + imgLightboxData.length) % imgLightboxData.length;
    tampilkanImgLightbox();
}

if (imgLightboxOverlay) {
    imgLightboxClose.addEventListener("click", tutupImgLightbox);
    imgLightboxNext.addEventListener("click", imgLightboxBerikutnya);
    imgLightboxPrev.addEventListener("click", imgLightboxSebelumnya);

    imgLightboxOverlay.addEventListener("click", e => {
        if (e.target === imgLightboxOverlay) tutupImgLightbox();
    });

    imgLightboxImg.addEventListener("pointerdown", e => { imgLightboxMulaiX = e.clientX; });

    imgLightboxImg.addEventListener("pointerup", e => {
        const selisih = e.clientX - imgLightboxMulaiX;
        if (Math.abs(selisih) < 30) return;
        if (selisih > 0) {
            imgLightboxSebelumnya();
        } else {
            imgLightboxBerikutnya();
        }
    });

    document.addEventListener("keydown", e => {
        if (!imgLightboxOverlay.classList.contains("active")) return;
        if (e.key === "Escape") tutupImgLightbox();
        if (e.key === "ArrowRight") imgLightboxBerikutnya();
        if (e.key === "ArrowLeft") imgLightboxSebelumnya();
    });
}
