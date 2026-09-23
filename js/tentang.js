const daftarPembimbing = document.getElementById("pembimbingScroller");
const panahKiri = document.getElementById("pembimbingPrev");
const panahKanan = document.getElementById("pembimbingNext");

if (daftarPembimbing && panahKiri && panahKanan) {
    const cekPanah = () => {
        const batas = daftarPembimbing.scrollWidth - daftarPembimbing.clientWidth;
        panahKiri.classList.toggle("is-hidden", daftarPembimbing.scrollLeft <= 4);
        panahKanan.classList.toggle("is-hidden", daftarPembimbing.scrollLeft >= batas - 4);
    };

    const geser = (arah) => {
        const kartu = daftarPembimbing.querySelector(".pembimbing-card");
        const jarak = kartu ? (kartu.offsetWidth + 20) * 2 : 400;
        daftarPembimbing.scrollBy({ left: arah * jarak, behavior: "smooth" });
    };

    panahKiri.addEventListener("click", () => geser(-1));
    panahKanan.addEventListener("click", () => geser(1));
    daftarPembimbing.addEventListener("scroll", cekPanah, { passive: true });
    window.addEventListener("resize", cekPanah);

    cekPanah();
}

const habitData = Array.from(document.querySelectorAll(".tt-habit-card")).map(card => ({
    src: card.querySelector("img").src,
    alt: card.querySelector("img").alt,
    label: card.querySelector(".tt-habit-label").textContent,
    num: card.querySelector(".tt-habit-num").textContent
}));

const habitOverlay = document.getElementById("habitOverlay");
const habitModalImg = document.getElementById("habitModalImg");
const habitModalLabel = document.getElementById("habitModalLabel");
const habitModalNum = document.getElementById("habitModalNum");
const habitClose = document.getElementById("habitClose");
const habitPrev = document.getElementById("habitPrev");
const habitNext = document.getElementById("habitNext");

let habitIndex = 0;

function tampilkanHabit() {
    const item = habitData[habitIndex];
    habitModalImg.src = item.src;
    habitModalImg.alt = item.alt;
    habitModalLabel.textContent = item.label;
    habitModalNum.textContent = item.num;
}

function bukaHabit(index) {
    habitIndex = index;
    tampilkanHabit();
    habitOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function tutupHabit() {
    habitOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

function habitBerikutnya() {
    habitIndex = (habitIndex + 1) % habitData.length;
    tampilkanHabit();
}

function habitSebelumnya() {
    habitIndex = (habitIndex - 1 + habitData.length) % habitData.length;
    tampilkanHabit();
}

if (habitOverlay) {
    document.querySelectorAll(".tt-habit-card").forEach((card, index) => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", () => bukaHabit(index));

        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bukaHabit(index);
            }
        });
    });

    habitClose.addEventListener("click", tutupHabit);
    habitNext.addEventListener("click", habitBerikutnya);
    habitPrev.addEventListener("click", habitSebelumnya);

    habitOverlay.addEventListener("click", e => {
        if (e.target === habitOverlay) tutupHabit();
    });

    document.addEventListener("keydown", e => {
        if (!habitOverlay.classList.contains("active")) return;
        if (e.key === "Escape") tutupHabit();
        if (e.key === "ArrowRight") habitBerikutnya();
        if (e.key === "ArrowLeft") habitSebelumnya();
    });
}
