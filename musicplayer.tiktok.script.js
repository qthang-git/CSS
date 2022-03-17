// ==UserScript==
// @name         Music Player
// @namespace
// @version
// @description
// @author       You
// @match        https://www.tiktok.com/*
// @grant        GM_xmlhttpRequest
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.4/js/uikit.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.4/js/components/notification.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.4/js/uikit-icons.min.js
// @license MIT
// ==/UserScript==
(function () {
  "use strict";
  const body = "body";
  // importStyleCss(
  //   `https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css`
  // );
  importLink(
    "css",
    `https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css`,
    `sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T`
  );
  importLink(
    "css",
    `https://pro.fontawesome.com/releases/v5.10.0/css/all.css`,
    `sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p`
  );
  importStyleCss(
    `https://raw.githubusercontent.com/qthang-git/userscripts/main/musicplayer.tiktok.min.css`
  );
  
  initUI();
  importLink(
    "js",
    `https://code.jquery.com/jquery-3.3.1.min.js`,
    `sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=`
  );

  const frameUI = document.getElementById('tiktok-music-wrapper');
  const btnUI = document.getElementById('btn-open');
  const btnOpenConfig = document.getElementById('button-config');
  const btnCloseConfig = document.getElementById('button-close');
  const overlayClick = document.querySelector('.tiktok-music-overlay');
  const apiConfig = JSON.parse(localStorage.getItem('apiConfig'));
  const audio = document.getElementById('audio');
  const ul_list = document.querySelector('.music-list');
  const thumbnail = document.querySelector('.play-song .thumbnail');

  function closeConfig() {
    document.querySelector('#div-config').classList.remove('show');
    document.querySelector('.tiktok-music-overlay').classList.remove('visibility');
  };
  
  function loadConfig() {
    document.querySelector('#api-host').value = apiConfig.host;
    document.querySelector('#api-key').value = apiConfig.key;
  }

  function saveConfig() {
    const apiHost = document.getElementById('api-host');
    const apiKey = document.getElementById('api-key');
    if (apiHost.value === '' || apiKey.value === '') {
      alert('Value not empty');
      apiHost.value === '' ? apiHost.focus() : apiKey.focus();
    }
    const apiInfor = {
      host: apiHost.value,
      key: apiKey.value
    }
    localStorage.setItem('apiConfig', JSON.stringify(apiInfor));
    alert('Đã lưu! Nhấn OK để tải lại trang!');
    location.reload();
  }
  btnUI.onclick = function () {
    btnUI.classList.toggle('visibility');
    frameUI.classList.toggle('visibility');
    loadConfig();
    if (!frameUI.classList.contains('visibility')) {
      closeConfig();
    }
  }
  
  btnOpenConfig.onclick = function () {
    document.querySelector('#div-config').classList.toggle('show');
    document.querySelector('.tiktok-music-overlay').classList.toggle('visibility');
  };

  btnCloseConfig.onclick = function () {
    closeConfig();
  }

  overlayClick.onclick = function () {
    closeConfig();
  }

  

  const playPauseSong = document.getElementById('play-song');
  playPauseSong.onclick = function () {
    const playing = document.querySelector('.music-item.playing .action-play-gif');
    playPauseSong.classList.toggle('playing');
    if (playPauseSong.classList.contains('playing')) {
      thumbnail.style.animationPlayState = 'running';
      playing.style.display = "block";
      audio.play();
    } else {
      thumbnail.style.animationPlayState = 'paused';
      playing.style.display = "none";
      audio.pause();
    }
  };
  
  const randomSong = document.getElementById('random-song');
  randomSong.onclick = function () {
    randomSong.getAttribute('data-control-random') === "disable" ? randomSong.setAttribute('data-control-random', 'enable') : randomSong.setAttribute('data-control-random', 'disable');
  };

  const repeatSong = document.getElementById('repeat-song');
  repeatSong.onclick = function () {
    repeatSong.getAttribute('data-control-repeat') === "disable" ? repeatSong.setAttribute('data-control-repeat', 'all') : repeatSong.getAttribute('data-control-repeat') === "all" ? repeatSong.setAttribute('data-control-repeat', 'again') : repeatSong.setAttribute('data-control-repeat', 'disable');
    if (repeatSong.getAttribute('data-control-repeat') === "again") {
      repeatSong.innerHTML = '<span><i class="fas fa-repeat-1"></i></span>';
    } else {
      repeatSong.innerHTML = '<span><i class="fas fa-repeat"></i></span>';
    }
  };
  
  const nextSong = document.getElementById('next-song');
  nextSong.onclick = function () {
    var playingCurrent = document.querySelector('.music-item.playing');
    var playingNext = document.querySelector('.music-item.playing + .music-item') || document.querySelector('.music-item:first-child');;
    
    playingNext.classList.add('playing');
    playingCurrent.classList.remove('playing');
    
    var activeSource = document.querySelector('#audio source.active');
    var nextSource = document.querySelector('#audio source.active + source') || document.querySelector('#audio source:first-child');
    // deactivate current source, and activate the next one
    activeSource.className = '';
    nextSource.className = 'active';
    // update the audio source and start playback
    audio.src = nextSource.src;
    audio.play();
  };
  
  const prevSong = document.getElementById('previous-song');
  prevSong.onclick = function () {
    var playingCurrent = document.querySelector('.music-item.playing');
    var playingPrev = playingCurrent.previousElementSibling || document.querySelector('.music-item:last-child');;
    
    playingPrev.classList.add('playing');
    playingCurrent.classList.remove('playing');
    
    var activeSource = document.querySelector('#audio source.active');
    var prevSource = activeSource.previousElementSibling || document.querySelector('#audio source:last-child');
    // deactivate current source, and activate the prev one
    activeSource.className = '';
    prevSource.className = 'active';
    // update the audio source and start playback
    audio.src = prevSource.src;
    audio.play();
  };
  
  audio.addEventListener('ended', function(e){
    var activeSource = document.querySelector('#audio source.active');
    var nextSource = document.querySelector('#audio source.active + source') || document.querySelector('#audio source:first-child');
    // deactivate current source, and activate the next one
    activeSource.className = '';
    nextSource.className = 'active';
    // update the audio source and start playback
    audio.src = nextSource.src;
    audio.play();
  });
  
  
  
  function initUI() {
    const btnUI = `
    <div id="btn-open">
      <svg
        width="28"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <g
          class="layer"
          fill="white"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill:#e8e6e3;"
        >
          <title>Layer 1</title>
          <path
            d="m28.062509,13.095139a13.1009,13.104497 0 0 1 -7.656848,-2.448593l0,11.149365a10.137824,10.140607 0 1 1 -8.745783,-10.048278l0,5.607747a4.653857,4.655135 0 1 0 3.25745,4.440532l0,-21.795911l5.488333,0a7.557684,7.559759 0 0 0 0.116003,1.383065l0,0a7.620051,7.622143 0 0 0 3.362228,5.004488a7.573276,7.575355 0 0 0 4.178617,1.256425l0,5.451161l0,-0.000001z"
            id="svg_1"
          ></path>
        </g>
      </svg>
    </div>;`;
    const root = `
    <div class="tiktok-music-overlay"></div>
    <div id="tiktok-music-wrapper">
        <div id="btn-open"></div>
        <div class="player-header">            
            <div class="thumbnail rounded-circle">
                <svg width="28" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                    <g class="layer" fill="white">
                        <title>Layer 1</title>
                        <path
                            d="m28.062509,13.095139a13.1009,13.104497 0 0 1 -7.656848,-2.448593l0,11.149365a10.137824,10.140607 0 1 1 -8.745783,-10.048278l0,5.607747a4.653857,4.655135 0 1 0 3.25745,4.440532l0,-21.795911l5.488333,0a7.557684,7.559759 0 0 0 0.116003,1.383065l0,0a7.620051,7.622143 0 0 0 3.362228,5.004488a7.573276,7.575355 0 0 0 4.178617,1.256425l0,5.451161l0,-0.000001z"
                            id="svg_1" />
                    </g>
                </svg>
            </div>
            <h4>Tiktok musicplayer</h4>

            <div class="nav-config">
                <button id="button-config" class="navbar-toggler btn-header" type="button">
                    <span class="text-white">
                        <i class="fas fa-bars fa-1x"></i>
                    </span>
                </button>
                <div class="" id="div-config">
                    <div>
                        <button class="button" type="button" id="button-close">
                            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"
                                data-svg="close-icon">
                                <line fill="none" stroke="#999" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
                                <line fill="none" stroke="#999" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
                            </svg>
                        </button>
                        <div class="config-wrapper">
                            <label>X-RapidAPI-Host</label>
                            <input type="text" id="api-host">
                            <label>X-RapidAPI-Key</label>
                            <input type="text" id="api-key">
                            <button type="button" class="button button-save-config" onclick="saveConfig()">SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-body pb-1">
            <div class="container">
                <div >

                </div>
                <div class="play-song">
                    <div class="thumbnail rounded-circle">                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32">
                            <style type="text/css">
                                g#g2 {
                                    fill: url(#grad2)
                                }
                            </style>
                            <defs>
                                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="00%" style="stop-color:rgb(215, 42, 255);stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:rgb(0,242,255);stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <g id="g2">
                                <title>Layer 1</title>
                                <path
                            d="m28.062509,13.095139a13.1009,13.104497 0 0 1 -7.656848,-2.448593l0,11.149365a10.137824,10.140607 0 1 1 -8.745783,-10.048278l0,5.607747a4.653857,4.655135 0 1 0 3.25745,4.440532l0,-21.795911l5.488333,0a7.557684,7.559759 0 0 0 0.116003,1.383065l0,0a7.620051,7.622143 0 0 0 3.362228,5.004488a7.573276,7.575355 0 0 0 4.178617,1.256425l0,5.451161l0,-0.000001z"
                            id="svg_1" />
                            </g>
                        </svg>
                    </div>
                    <div class="controls-main">
                        <div class="player-controls">
                            <audio id="audio" preload="none"></audio>
                            <div class="controls-advenced" id="random-song" data-control-random="disable">
                                <span><i class="fas fa-random"></i></span>
                            </div>
                            <div class="controls-default" id="previous-song">
                                <span><i class="fas fa-backward"></i></span>
                            </div>
                            <div class="controls-default" id="fast-backward-song">
                                <span><i class="fas fa-fast-backward"></i></span>
                            </div>
                            <div class="controls-default" id="play-song">
                                <span><i class="fas fa-play"></i><i class='fas fa-pause'></i></span>
                            </div>
                            <div class="controls-default" id="fast-forward-song">
                                <span><i class="fas fa-fast-forward"></i></span>
                            </div>
                            <div class="controls-default" id="next-song">
                                <span><i class="fas fa-forward"></i></span>
                            </div>
                            <div class="controls-advenced" id="repeat-song" data-control-repeat="disable">
                                <span><i class="fas fa-repeat"></i></span>
                            </div>
                        </div>
                        <div class="player-timeline"></div>
                    </div>
                </div>
                <div class="playlist">
                    <a class="text-white cursor-pointer py-1 mb-2 d-block border-bottom border-white" id="get-list-song" href="#">Get List Song</a>
                    <ul class="music-list m-0 p-0">
                                           
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
    //$(btnUI).appendTo(body);
    $(root).appendTo(body);
    console.log("inject");
  }

  function getUserId() {
    const username = window.location.href.split("@");
    const url =
      "https://tiktok28.p.rapidapi.com/profile/@" +
      username[1] +
      "?schemaType=1";
    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "tiktok28.p.rapidapi.com",
        "x-rapidapi-key": apiConfig.key
      },
    })
      .then((response) => { return response.json() })
      .then((data) => {
        // console.log(data.user.id);
        getListSong(data.user.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getListSong(user_id) {
    const url = `https://tiktok-all-in-one.p.rapidapi.com/user/videos?id=${user_id}&max_cursor=1632138733000`;
    fetch(url,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": apiConfig.host,
          "x-rapidapi-key": apiConfig.key
        }
      }
    )
      .then((response) => { return response.json() })
      .then((data) => {
        ul_list.innerHTML = " ";
        audio.innerHTML = " ";
        audio.src = " ";
        loadSongToHTML(data.aweme_list);
        const listSong = document.querySelectorAll('.music-item');
        listSong.forEach((item, index) => {
          item.addEventListener('click', () => {
            const el = document.querySelector('.music-item.playing');
            const source = document.querySelector('#audio #song-'+index);
            const sourceActive = document.querySelector('#audio source.active');
            if (el !== null && sourceActive !== null ) {
              el.classList.remove('playing');
              sourceActive.classList.remove('active');
            }
            item.classList.add('playing');
            source.classList.add('active');
            playPauseSong.classList.add('playing');
            thumbnail.style.animationPlayState = 'running';
            audio.src = item.getAttribute('data-source-mp3');
            audio.play();            
          })
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function loadSongToHTML(aweme_list) {
    var list = '';
    var sourceAudio = '';
    if (aweme_list !== null) {
      aweme_list.forEach((item, index) => {
        var url = item.music.play_url.uri;
        if(url !== ''){
          sourceAudio += `<source id="song-${index}" src="${url}" type="audio/mpeg"></source>`;       
          list += `<li class="music-item song-${index}" data-source-mp3="${url}"><div class="music-item-wrapper"><div class="music-avt rounded-circle"><span class="avt-icon"><i class="fas fa-music"></i></span></div><div class="music-content"><div class="song-info"><span class="song-title">${item.music.title}</span><span class="song-artist">Artist: ${item.music.author !== '' ? item.music.author : 'empty' }</span><span class="song-album">Album: ${item.music.album !== '' ? item.music.album : 'empty' }</span></div></div><div class="action-play-gif"><i class="action-play-icon"></i></div></div></li>`;
        }
      });
    }else{
      list =  `Can't find song from this account`;
      alert(list);
    }    
    audio.innerHTML = sourceAudio;
    ul_list.innerHTML = list;
  }

  $('#get-list-song').click(function () {
    getUserId();
  });
  
  

})();

function importScriptContents(inject) {
  var script = window.document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = inject;
  document.getElementsByTagName("HEAD")[0].appendChild(script);
}

function loadCSS(url) {
  /*var meta = window.document.createElement("meta");
  meta.setAttribute("http-equiv", "Access-Control-Allow-Origin");
  meta.setAttribute("content", "*");
  document.getElementsByTagName("HEAD")[0].appendChild(meta);*/

  var link = window.document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.getElementsByTagName("HEAD")[0].appendChild(link);
}

function importStyleCss(url) {
  var style = window.document.createElement("style");
  style.type = "text/css";
  $.get(
    url,
    function (data) {
      style.innerHTML = data;
    },
    "text"
  );
  document.getElementsByTagName("HEAD")[0].appendChild(style);
}

function importLink(type, url, integrity) {
  const link =
    type === "css"
      ? window.document.createElement("link")
      : window.document.createElement("script");
  link.integrity = integrity;
  link.crossOrigin = "anonymous";
  if (type === "css") {
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  } else if (type === "js") {
    link.type = "text/javascript";
    link.src = url;
    document.body.appendChild(link);
  }
}
