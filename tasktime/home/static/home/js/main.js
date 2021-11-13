const loadHome = () => {
    const urlVideo = document.querySelector("#how .video .url-video").value,
    video = document.querySelector("#how .video video");

    const source = document.createElement("source");
    source.setAttribute("src", urlVideo);
    source.setAttribute("type", "video/mp4");

    video.appendChild(source);
    video.load();
}

document.addEventListener('DOMContentLoaded', loadHome);

export default loadHome;