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