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
