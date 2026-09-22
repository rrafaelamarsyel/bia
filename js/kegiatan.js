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

    track.addEventListener("pointerdown", e => {
        mulaiX = e.clientX;
    });

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
        if (e.target === acaraOverlay) {
            tutupAcara();
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && acaraOverlay.classList.contains("active")) {
            tutupAcara();
        }
    });
}