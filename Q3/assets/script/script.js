
let playpause_btn = document.querySelector(".playpause");
let next_btn = document.querySelector(".next-video");
let prev_btn = document.querySelector(".prev-video");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let description = document.querySelector(".description");

// Specify globally used values
let video_index = 0;
let isPlaying = false;
let updateTimer;
let video_list = [
    {
        description:"MongoDB & Node.js: Connecting & CRUD Operations (Part 1 of 4)",
        path: "assets/video/1.mp4"
    },
    {
        description:"MongoDB & Node.js: Connecting & CRUD Operations (Part 2 of 4)",
        path: "assets/video/2.mp4"
    },
];

let curr_video = document.querySelector('#my-video');



function loadvideo(video_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new video
    curr_video.src = video_list[video_index].path;
    curr_video.load();

    // Update description of the video
    description.textContent = video_list[video_index].description;

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next video if the current finishes playing
    // using the 'ended' event
    curr_video.addEventListener("ended", nextvideo);
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00 / 00:00";
    seek_slider.value = 0;
}

function playpause() {
    // Switch between playing and pausing
    if (!isPlaying) playvideo();
    else pausevideo();
}
function nextvideo() {
    // Go back to the first video if the
    // current one is the last in the video list
    if (video_index < video_list.length - 1)
        video_index += 1;
    else video_index = 0;

    // Load and play the new video
    loadvideo(video_index);
    playvideo();
}
function playvideo() {
    // Play the loaded video
    curr_video.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause"></i>';
}

function pausevideo() {
    // Pause the loaded video
    curr_video.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play"></i>';
}


function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the video
    seekto = curr_video.duration * (seek_slider.value / 100);

    // Set the current video position to the calculated seek position
    curr_video.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_video.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current video duration is a legible number
    if (!isNaN(curr_video.duration)) {
        seekPosition = curr_video.currentTime * (100 / curr_video.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_video.currentTime / 60);
        let currentSeconds = Math.floor(curr_video.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_video.duration / 60);
        let durationSeconds = Math.floor(curr_video.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds +" / "+durationMinutes+ ":" + durationSeconds;

    }
}

// Load the first video in the videolist
loadvideo(video_index);