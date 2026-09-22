const pembimbingOverlay = document.getElementById("pembimbingOverlay");
const pembimbingModalImg = document.getElementById("pembimbingModalImg");
const pembimbingModalName = document.getElementById("pembimbingModalName");
const pembimbingModalRole = document.getElementById("pembimbingModalRole");
const pembimbingModalMessage = document.getElementById("pembimbingModalMessage");
const pembimbingClose = document.getElementById("pembimbingClose");

function bukaPembimbing(card) {
    const { name, role, message, img } = card.dataset;

    pembimbingModalImg.src = img;
    pembimbingModalImg.alt = name;
    pembimbingModalName.textContent = name;
    pembimbingModalRole.textContent = role;
    pembimbingModalMessage.textContent = message;

    pembimbingOverlay.classList.add("active");
}

function tutupPembimbing() {
    pembimbingOverlay.classList.remove("active");
}

document.querySelectorAll(".pembimbing-card").forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", () => bukaPembimbing(card));

    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            bukaPembimbing(card);
        }
    });
});

if (pembimbingClose) {
    pembimbingClose.addEventListener("click", tutupPembimbing);
}

if (pembimbingOverlay) {
    pembimbingOverlay.addEventListener("click", (e) => {
        if (e.target === pembimbingOverlay) {
            tutupPembimbing();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (!pembimbingOverlay || !pembimbingOverlay.classList.contains("active")) return;
    if (e.key === "Escape") tutupPembimbing();
});

const NOMOR_WA_PENDAFTARAN = "62895327098067";

const kelasOptions = {
    sd: ["1", "2", "3", "4", "5", "6"],
    smp: ["1", "2", "3"],
    sma: ["1", "2", "3"]
};

function isiKelas(kelasSelect, jenjang) {
    kelasSelect.innerHTML = "";

    if (!jenjang || !kelasOptions[jenjang]) {
        kelasSelect.innerHTML = '<option value="">Pilih jenjang dahulu</option>';
        kelasSelect.disabled = true;
        kelasSelect.setAttribute("disabled", "disabled");
        return;
    }

    kelasSelect.disabled = false;
    kelasSelect.removeAttribute("disabled");

    const opsiKosong = document.createElement("option");
    opsiKosong.value = "";
    opsiKosong.textContent = "Pilih kelas";
    kelasSelect.appendChild(opsiKosong);

    kelasOptions[jenjang].forEach(angka => {
        const opsi = document.createElement("option");
        opsi.value = angka;
        opsi.textContent = "Kelas " + angka;
        kelasSelect.appendChild(opsi);
    });
}

function labelJenjang(value) {
    const map = { sd: "SD", smp: "SMP", sma: "SMA" };
    return map[value] || "-";
}

function initFormDaftar() {
    const jenjangSelect = document.getElementById("jenjang");
    const kelasSelect = document.getElementById("kelas");
    const form = document.getElementById("formDaftar");

    if (!jenjangSelect || !kelasSelect) return;

    isiKelas(kelasSelect, jenjangSelect.value);

    jenjangSelect.addEventListener("change", () => {
        isiKelas(kelasSelect, jenjangSelect.value);
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const namaLengkap = document.getElementById("namaLengkap").value.trim();
            const namaPanggilan = document.getElementById("namaPanggilan").value.trim();
            const umur = document.getElementById("umur").value.trim();
            const jenjang = jenjangSelect.value;
            const kelas = kelasSelect.value;
            const sekolah = document.getElementById("sekolah").value.trim();
            const alamat = document.getElementById("alamat").value.trim();
            const wilayah = document.getElementById("wilayah").value.trim();
            const teleponAnak = document.getElementById("teleponAnak").value.trim();
            const namaOrtu = document.getElementById("namaOrtu").value.trim();
            const peranOrtu = document.getElementById("peranOrtu").value.trim();
            const teleponOrtu = document.getElementById("teleponOrtu").value.trim();
            const sudahBaptis = document.getElementById("sudahBaptis").checked;
            const sudahKomuni = document.getElementById("sudahKomuni").checked;

            const namaOrtuLengkap = namaOrtu + " / " + peranOrtu;

            const pesan =
                "Halo, saya ingin mendaftarkan anak untuk mengikuti Bina Iman Anak Toasebio dengan data sebagai berikut:\n\n" +
                "Nama Lengkap: " + namaLengkap + "\n" +
                "Nama Panggilan: " + namaPanggilan + "\n" +
                "Umur: " + umur + " tahun\n" +
                "Jenjang: " + labelJenjang(jenjang) + "\n" +
                "Kelas: " + kelas + "\n" +
                "Sekolah: " + sekolah + "\n" +
                "Nomor Telepon Anak: " + (teleponAnak || "-") + "\n" +
                "Alamat Rumah: " + alamat + "\n" +
                "Wilayah/Lingkungan Gereja: " + (wilayah || "-") + "\n" +
                "Nama Orang Tua/Wali: " + namaOrtuLengkap + "\n" +
                "Nomor Telepon Orang Tua/Wali: " + teleponOrtu + "\n" +
                "Sudah Baptis Katolik: " + (sudahBaptis ? "Sudah" : "Belum") + "\n" +
                "Sudah Komuni Pertama: " + (sudahKomuni ? "Sudah" : "Belum") + "\n\n" +
                "Terima kasih.";

            const url = "https://wa.me/" + NOMOR_WA_PENDAFTARAN + "?text=" + encodeURIComponent(pesan);
            window.open(url, "_blank");

            tampilkanNotifikasi("Pendaftaran berhasil dikirim! Silakan lanjutkan di WhatsApp.");

            form.reset();
            isiKelas(kelasSelect, "");
        });
    }
}

function tampilkanNotifikasi(pesan) {
    const notif = document.createElement("div");
    notif.className = "form-notif";
    notif.textContent = pesan;
    document.body.appendChild(notif);

    requestAnimationFrame(() => notif.classList.add("show"));

    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => notif.remove(), 300);
    }, 3500);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFormDaftar);
} else {
    initFormDaftar();
}
