const infoOverlay = document.getElementById("infoOverlay");
const infoTanggal = document.getElementById("infoModalTanggal");
const infoJudul = document.getElementById("infoModalJudul");
const infoIsi = document.getElementById("infoModalIsi");
const infoClose = document.getElementById("infoClose");

let tombolTerakhir = null;

function bukaInfo(tombol) {
    const { tanggal, judul, isi } = tombol.dataset;

    infoTanggal.textContent = tanggal;
    infoJudul.textContent = judul;
    infoIsi.textContent = isi;

    tombolTerakhir = tombol;
    infoOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    infoClose.focus({ preventScroll: true });
}

function tutupInfo() {
    infoOverlay.classList.remove("active");
    document.body.style.overflow = "";

    if (tombolTerakhir) {
        tombolTerakhir.focus({ preventScroll: true });
    }
}

if (infoOverlay) {
    document.querySelectorAll(".info-open").forEach(tombol => {
        tombol.addEventListener("click", () => bukaInfo(tombol));
    });

    infoClose.addEventListener("click", tutupInfo);

    infoOverlay.addEventListener("click", e => {
        if (e.target === infoOverlay) {
            tutupInfo();
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && infoOverlay.classList.contains("active")) {
            tutupInfo();
        }
    });
}
