window.videoPlayer = () => {
  const video_tags = document.querySelectorAll(".custom-video-player .video");

  const playButton = document.querySelectorAll(".custom-video-player .play");
  const playbackIcons = document.querySelectorAll(".playback-icons use");
  const video_controls = document.querySelectorAll(
    ".custom-video-player .video-controls"
  );
  const timeElapsed = document.querySelector(
    ".custom-video-player .time-elapsed"
  );
  const duration = document.querySelectorAll(".custom-video-player .duration");
  const videoWorks = !!document.createElement("video").canPlayType; // to cast  variable to be explicitly boolean
  const progressBar = document.querySelectorAll(
    ".custom-video-player .progress-bar"
  );
  const seek = document.querySelectorAll(".custom-video-player .seek");
  const seekTooltip = document.querySelectorAll(
    ".custom-video-player .seek-tooltip"
  );
  const playbackAnimation = document.querySelectorAll(
    ".custom-video-player .playback-animation"
  );

  // volume controls
  const volumeButton = document.querySelectorAll(
    ".custom-video-player .volume-button"
  );
  const volumeIcons = document.querySelectorAll(
    ".custom-video-player .volume-button use"
  );
  const volumeMute = document.querySelectorAll(
    '.custom-video-player use[href="#volume-mute"]'
  );
  const volumeLow = document.querySelectorAll(
    '.custom-video-player use[href="#volume-low"]'
  );
  const volumeHigh = document.querySelectorAll(
    '.custom-video-player use[href="#volume-high"]'
  );
  const volume = document.querySelectorAll(".custom-video-player .volume");

  // for full-screen size need this elements
  const fullscreenButton = document.querySelectorAll(
    ".custom-video-player .fullscreen-button"
  );
  const videoContainer = document.querySelectorAll(
    ".custom-video-player .video-container"
  );
  const fullscreenIcons = document.querySelectorAll(".fullscreen-button use");

  // for picture-in-pircture need this element
  const pipButton = document.querySelectorAll(
    ".custom-video-player .pip-button"
  );

  // forward / backward video buttons
  const forward_30 = document.querySelectorAll(
    ".custom-video-player .forward-30"
  );
  const backward_10 = document.querySelectorAll(
    ".custom-video-player .backward-10"
  );

  // create instanse of video
  // if canPlayType method supports, means HTML5 video is supported
  // so default video controls disabled and our custom controls appear

  if (videoWorks) {
    for (let video of video_tags) {
      video.controls = false;
    }
    for (let video_control of video_controls) {
      video_control.classList.remove("hidden");
    }
  }

  // togglePlay toggles the playback state of the video.
  // If the video playback is paused or ended, the video is play
  // otherwise, the video is paused
  function togglePlay(closestVideo) {
    if (closestVideo.paused || closestVideo.ended) {
      closestVideo.play();
    } else {
      closestVideo.pause();
    }
  }
  for (let playbtn of playButton) {
    let closest_video = playbtn
      .closest(".video-container")
      .querySelector(".video");

    playbtn.addEventListener("click", () => togglePlay(closest_video));
  }

  // this function updates the playback icon and tooltip
  // depending on the playback state
  function updatePlayButton(video) {
    let closest_playback_icons = video
      .closest(".video-container")
      .querySelectorAll(".playback-icons use");
    closest_playback_icons.forEach(icon => icon.classList.toggle("hidden"));

    let closest_play = video.closest(".video-container").querySelector(".play");
    if (video.paused) {
      closest_play.setAttribute("data-title", "پخش (k)");
    } else {
      closest_play.setAttribute("data-title", "توقف (k)");
    }
  }

  // formatVideoTime takes a time length in seconds and returns the time in
  // minutes and seconds
  function formatVideoTime(timeInSeconds) {
    let result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2)
    };
  }

  //forward_30second forward video timer
  function forward_30second(video) {
    debugger;
    if (video.duration <= 30 || video.ended) return;
    video.pause();
    const currentTime = video.currentTime;
    video.currentTime = parseFloat(currentTime + 30);
    video.play();
  }

  function backward_10second(video) {
    debugger;
    if (video.currentTime === 0 || video.duration <= 10) return;
    video.pause();
    const currentTime = video.currentTime;
    video.currentTime = parseFloat(currentTime - 10);
    video.play();
  }
  for (let fr_30_single of forward_30) {
    let closest_video = fr_30_single
      .closest(".video-container")
      .querySelector(".video");
    fr_30_single.addEventListener("click", () =>
      forward_30second(closest_video)
    );
  }
  for (let bw_10_single of backward_10) {
    let closest_video = bw_10_single
      .closest(".video-container")
      .querySelector(".video");
    bw_10_single.addEventListener("click", () =>
      backward_10second(closest_video)
    );
  }
  // initializeVideo sets the video duration, and maximum value of the progressBar
  function initializeVideo(video) {
    const videoDuration = Math.round(video.duration);
    const time = formatVideoTime(videoDuration);
    let closest_seek = video.closest(".video-container").querySelector(".seek");
    let closest_progressBar = video
      .closest(".video-container")
      .querySelector(".progress-bar");
    let closest_duration = video
      .closest(".video-container")
      .querySelector(".duration");

    closest_seek.setAttribute("max", videoDuration);
    closest_progressBar.setAttribute("max", videoDuration);

    closest_duration.innerText = `${time.minutes}:${time.seconds}`;
    closest_duration.setAttribute(
      "datetime",
      `${time.minutes}m ${time.seconds}s`
    );
  }

  // updateTimeElapsed indicates how far through the video
  // the current playback is
  function updateTimeElapsed(video) {
    let closest_timeElapsed = video
      .closest(".video-container")
      .querySelector(".time-elapsed");
    const time = formatVideoTime(Math.round(video.currentTime));

    closest_timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    closest_timeElapsed.setAttribute(
      "datetime",
      `${time.minutes}m ${time.seconds}`
    );
  }

  //updateProgress indicates how far through the video
  // the current playback is by updating the progress bar
  function updateProgress(video) {
    let closest_progressBar = video
      .closest(".video-container")
      .querySelector(".progress-bar");
    let closest_seek = video.closest(".video-container").querySelector(".seek");
    closest_seek.value = Math.floor(video.currentTime);
    closest_progressBar.value = Math.floor(video.currentTime);
  }

  // updateSeekTooltip uses the position of the mouse on the progress bar to
  // roughly work out what point in the video the user will skip to if
  // the progress bar is clicked at that point
  function updateSeekTooltip(seekSingle, event) {
    let closest_seekTooltip = event.target
      .closest(".video-container")
      .querySelector(".seek-tooltip");
    const skipTo = Math.round(
      (event.offsetX / event.target.clientWidth) *
        parseInt(event.target.getAttribute("max"), 10)
    );
    event.target.setAttribute("data-seek", skipTo);
    const t = formatVideoTime(skipTo);
    closest_seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = seekSingle.getBoundingClientRect();
    closest_seekTooltip.style.left = `${event.pageX - rect.left}px`;
  }
  for (let seek_single of seek) {
    seek_single.addEventListener("input", () => skipAhead(seek_single));
    seek_single.addEventListener("mousemove", event =>
      updateSeekTooltip(seek_single, event)
    );
  }

  // skipAhead jumps to a different point in the video
  // when the progress bar is clicked
  function skipAhead(seekSingle) {
    const skipTo = seekSingle.dataset.seek
      ? seekSingle.dataset.seek
      : seekSingle.value;
    let closest_video = seekSingle
      .closest(".video-container")
      .querySelector(".video");
    let closest_progressBar = seekSingle
      .closest(".video-container")
      .querySelector(".progress-bar");
    closest_video.currentTime = skipTo;
    closest_progressBar.value = skipTo;
    seekSingle.value = skipTo;
  }

  // updateVolume updates the video's volume
  // and disables the muted state if active
  function updateVolume(volumeSingle) {
    let closest_video = volumeSingle
      .closest(".video-container")
      .querySelector(".video");
    let closest_volume = volumeSingle
      .closest(".video-container")
      .querySelector(".volume");

    if (closest_video.muted) {
      closest_video.muted = false;
    }
    closest_video.volume = closest_volume.value;
  }
  for (let volume_single of volume) {
    volume_single.addEventListener("input", () => updateVolume(volume_single));
  }

  // updateVolumeIcon updates the volume icon so that it correctly reflects
  // the volume of the video
  function updateVolumeIcon(video) {
    let closest_volumeMute = video
      .closest(".video-container")
      .querySelector('use[href="#volume-mute"]');
    let closest_volumeLow = video
      .closest(".video-container")
      .querySelector('use[href="#volume-low"]');
    let closest_volumeHigh = video
      .closest(".video-container")
      .querySelector('use[href="#volume-high"]');
    let closest_volumeButton = video
      .closest(".video-container")
      .querySelector(".volume-button");
    closest_volumeButton.querySelectorAll("use").forEach(icon => {
      icon.classList.add("hidden");
    });

    closest_volumeButton.setAttribute("data-title", "بیصدا (m)");

    if (video.muted || video.volume === 0) {
      closest_volumeMute.classList.remove("hidden");
      closest_volumeButton.setAttribute("data-title", "صدا (m)");
    } else if (video.volume > 0 && video.volume <= 0.5) {
      closest_volumeLow.classList.remove("hidden");
    } else {
      closest_volumeHigh.classList.remove("hidden");
    }
  }

  // toggleMute mutes or unmutes the video when executed
  // When the video is unmuted, the volume is returned to the value
  // it was set to before the video was muted
  function toggleMute(volumeButton) {
    let closest_video = volumeButton
      .closest(".video-container")
      .querySelector(".video");
    let closest_volume = volumeButton
      .closest(".video-container")
      .querySelector(".volume");
    closest_video.muted = !closest_video.muted;

    if (closest_video.muted) {
      volumeButton.setAttribute("data-volume", volumeButton.value);
      closest_volume.value = 0;
    } else {
      closest_volume.value = volumeButton.dataset.volume;
    }
  }
  for (let volumeButton_single of volumeButton) {
    volumeButton_single.addEventListener("click", () =>
      toggleMute(volumeButton_single)
    );
  }

  // animatePlayback displays an animation when
  // the video is played or paused
  function animatePlayback(video) {
    let closest_playbackAnimation = video
      .closest(".video-container")
      .querySelector(".playback-animation");
    closest_playbackAnimation.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)"
        },
        {
          opacity: 0,
          transform: "scale(1.3)"
        }
      ],
      {
        duration: 500
      }
    );
  }

  // toggleFullScreen toggles the full screen state of the video
  // If the browser is currently in fullscreen mode,
  // then it should exit and vice versa.
  function toggleFullScreen(closestVideo) {
    let closest_videoContainer = closestVideo.closest(".video-container");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      document.webkitExitFullscreen();
    } else if (closest_videoContainer.webkitRequestFullscreen) {
      // Need this to support Safari
      closest_videoContainer.webkitRequestFullscreen();
    } else {
      closest_videoContainer.requestFullscreen();
    }
  }
  for (let fullscreenButton_single of fullscreenButton) {
    let closest_video = fullscreenButton_single
      .closest(".video-container")
      .querySelector(".video");

    fullscreenButton_single.addEventListener("click", () =>
      toggleFullScreen(closest_video)
    );
  }

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== "undefined";
  if (!isFirefox) {
    // no need this to firefox
    for (let video of video_tags) {
      let closest_fullscreenButton = video
        .closest(".video-container")
        .querySelector(".fullscreen-button");
      closest_fullscreenButton.addEventListener("click", () =>
        updateFullscreenButton(video)
      );
      video.addEventListener("dblclick", () => updateFullscreenButton(video));
    }
  }
  document.addEventListener("keydown", e => {
    let played_video = Array.from(video_tags).find(video => !video.paused);
    if (e.key == "Escape" && document.fullscreenElement) {
      updateFullscreenButton(played_video);
    }
  });
  // updateFullscreenButton changes the icon of the full screen button
  // and tooltip to reflect the current full screen state of the video
  function updateFullscreenButton(video) {
    let closest_fullscreen_button = video
      .closest(".video-container")
      .querySelector(".fullscreen-button");
    closest_fullscreen_button
      .querySelectorAll("use")
      .forEach(icon => icon.classList.toggle("hidden"));

    if (document.fullscreenElement) {
      closest_fullscreen_button.setAttribute("data-title", "تمام صفحه (f)");
    } else {
      closest_fullscreen_button.setAttribute(
        "data-title",
        " خروج از تمام صفحه (f)"
      );
    }
  }
  for (let videoContainer_single of videoContainer) {
    videoContainer_single.addEventListener(
      "fullscreenchange",
      updateFullscreenButton
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!("pictureInPictureEnabled" in document)) {
      for (let pipButton_single of pipButton) {
        pipButton_single.classList.add("hidden");
      }
    }
  });

  // togglePip toggles Picture-in-Picture mode on the video
  async function togglePip(video) {
    let closest_pipButton = video
      .closest(".video-container")
      .querySelector(".pip-button");
    try {
      if (video !== document.pictureInPictureElement) {
        closest_pipButton.disabled = true;
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      new Error(error);
    } finally {
      closest_pipButton.disabled = false;
    }
  }

  for (let pipButton_single of pipButton) {
    let closest_video = pipButton_single
      .closest(".video-container")
      .querySelector(".video");

    pipButton_single.addEventListener("click", () => togglePip(closest_video));
  }

  //hideControls hides the video controls when not in use
  //if the video is paused, the controls must remain visible
  function hideControls(closestVideo) {
    let closest_controls = closestVideo
      .closest(".video-container")
      .querySelector(".video-controls");
    if (closestVideo.paused) {
      return;
    }

    closest_controls.classList.add("hide");
  }

  //showControls displays the video controls
  function showControls(closestVideo) {
    let closest_controls = closestVideo
      .closest(".video-container")
      .querySelector(".video-controls");
    closest_controls.classList.remove("hide");
  }

  for (let video_controls_single of video_controls) {
    let closest_video = video_controls_single
      .closest(".video-container")
      .querySelector(".video");

    video_controls_single.addEventListener("mousemove", () =>
      showControls(closest_video)
    );
    video_controls_single.addEventListener("mouseleave", () =>
      hideControls(closest_video)
    );
  }

  // keyboardShortcuts executes the relevant functions for
  // each supported shortcut key
  function keyboardShortcuts(event, video) {
    let closest_videoContainer = video.closest(".video-container");
    let { key } = event;

    switch (key) {
      case "k":
        togglePlay(video);
        animatePlayback(video);
        if (video.paused) {
          showControls(video);
        } else {
          setTimeout(() => {
            hideControls(video);
          }, 2000);
        }
        break;
      case "m":
        toggleMute(closest_videoContainer.querySelector(".volume-button"));
        break;
      case "f":
        toggleFullScreen(video);
        break;
      case "p":
        togglePip(video);
        break;
    }
  }

  // Event Listeners

  // ==== video events ====

  // when mouse enter video interface, controls visible
  // and when mouse leave this area controls hide
  for (let video of video_tags) {
    let video_container = video.closest(".video-container");

    video.addEventListener("mouseleave", () => hideControls(video));
    let videoInterval;
    // when mouse enter, interval every 3s, trying to hideControls
    // controls are only hidden when mousemove stop
    video.addEventListener("mouseenter", () => {
      showControls(video);
      videoInterval = setInterval(() => {
        hideControls(video);
      }, 3000);
    });

    // to avoid intervalId's conflict
    video.addEventListener("mouseleave", () => {
      if (videoInterval !== undefined) clearInterval(videoInterval);
    });
    // until mousemove, controls appear
    video.addEventListener("mousemove", () => showControls(video));

    // this will cause the video duration to be updated when the video's metadata has been loaded.
    video.addEventListener("loadedmetadata", () => {
      setTimeout(() => {
        initializeVideo(video);
      }, 100);
    });
    video_container.addEventListener("keyup", event =>
      keyboardShortcuts(event, video)
    );

    video.addEventListener("timeupdate", () => updateTimeElapsed(video));
    video.addEventListener("timeupdate", () => updateProgress(video));
    video.addEventListener("volumechange", () => updateVolumeIcon(video));
    video.addEventListener("click", () => togglePlay(video));
    video.addEventListener("click", () => animatePlayback(video));
    video.addEventListener("dblclick", () => toggleFullScreen(video));

    video.addEventListener("pause", () => updatePlayButton(video));
    video.addEventListener("play", () => updatePlayButton(video));
  }
};
