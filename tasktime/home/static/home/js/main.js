const loadHome = () => {
    const urlVideo = document.querySelector("#how .video .url-video").value,
    source = document.querySelector("#how .video source"),
    video = document.querySelector("#how .video video");

    source.setAttribute("src", urlVideo);
    video.load();    
}

document.addEventListener("load", loadHome);
