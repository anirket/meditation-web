function app() {
    //selecting all
    const song = document.querySelector(".song ");
    const minutesButton = document.querySelectorAll(".minutes button");
    const outline = document.querySelector(".outer-outline circle");
    const play = document.querySelector(".play");
    const timer = document.querySelector(".time-display");
    const theme = document.querySelectorAll(".theme button")
    const outlineLength = outline.getTotalLength();
    const video = document.querySelector(".vid-container video");
    console.log(outlineLength);
    let defaultTime = 120;
    //outline animation
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //controller core functionality
    play.addEventListener("click", () => {
        validation(song);
    })
    function validation(song) {
        if (song.paused) {
            song.play();
            play.src = `./svg/pause.svg`;
            video.play();
        }
        else {
            song.pause();
            play.src = `./svg/play.svg`;
            video.pause();

        }

    }

    //timer and animation
    song.ontimeupdate = () => {
        let currenttime = song.currentTime;
        let elapsedTime = defaultTime - currenttime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);
        //animate the svg
        outline.style.strokeDashoffset = outlineLength - (currenttime / defaultTime) * outlineLength;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        timer.textContent = `${minutes}:${seconds}`;
        if (elapsedTime < 0) {

            timer.textContent = `0:00`;
            song.pause();
            play.src = `./svg/play.svg`;
            video.pause();
            outline.style.strokeDashoffset = 0;
            song.currentTime = 0;
        }
    }


minutesButton.forEach((button) =>{
    button.addEventListener("click",()=>{

        
        
        play.src = `./svg/pause.svg`;
        video.pause();
        outline.style.strokeDashoffset = 0;
        song.currentTime = 0;
        song.play();
        video.play();


        let duration =button.getAttribute("data-sec");
        defaultTime = duration;
        let seconds = Math.floor(duration % 60);
        let minutes = Math.floor(duration / 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timer.textContent = `${minutes}:${seconds}`;
     
    })

})


//theme

theme.forEach((themer) =>{
    themer.addEventListener("click",()=>{
        song.src = themer.getAttribute("data-sound");
        video.src = themer.getAttribute("data-video");
        validation(song);
    })
})

}



app();