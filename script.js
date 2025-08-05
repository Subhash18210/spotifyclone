async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // Full file name with extension
            songs.push(decodeURIComponent(element.href.split("/songs/")[1]));
        }
    }

    return songs;
}

let audio = new Audio();

const playmusic = (track) => {
    console.log("Trying to play:", track);
    audio.src = "/songs/" + encodeURIComponent(track);
    audio.play().catch((e) => {
        console.error("Audio playback error:", e);
    });
};

async function main() {
    let songs = await getsongs();
    console.log("Available Songs:", songs);

    let songUL = document.querySelector(".songlist ul");

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        songUL.innerHTML += `
        <li data-index="${i}">
            <img src="music.svg">
            <div class="info">
                <div>${song}</div>
                <div>Subhash</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img src="playnow.svg">
            </div>
        </li>`;
    }

    Array.from(songUL.getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            const index = e.dataset.index;
            const songName = songs[index];
            playmusic(songName);
        });
    });
}

main();




