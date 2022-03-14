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
  initUI();
  const url_css = `https://raw.githubusercontent.com/qthang-git/css/main/musicplayer.tiktok.min.css`;
  // loadCSS(url_css)
  importStyleCss(url_css);
  //  getIdTikTok();
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
    </div>;
      `;
    $(btnUI).appendTo(body);
  }

  function getIdTikTok() {
    const data = null;
    const username = window.location.href.split("@");
    const url =
      "https://tiktok28.p.rapidapi.com/profile/" +
      username[1] +
      "?schemaType=1";
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var resData = JSON.parse(this.responseText);
        console.log(resData.user);
        // console.log(resData)
      }
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("x-rapidapi-host", "tiktok28.p.rapidapi.com");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "6150648b36msh4af9f79046a129ap1bed93jsn0973858a8196"
    );

    xhr.send(data);

    // fetch("https://tiktok28.p.rapidapi.com/profile/@valentinaof.4?schemaType=1", {
    // 	"method": "GET",
    // 	"headers": {
    // 		"x-rapidapi-host": "tiktok28.p.rapidapi.com",
    // 		"x-rapidapi-key": "6150648b36msh4af9f79046a129ap1bed93jsn0973858a8196"
    // 	}
    // })
    // .then(response => {
    // 	console.log(response.json());
    // })
    // .catch(err => {
    // 	console.error(err);
    // });
  }

  function loadCSS(url) {
    var meta = window.document.createElement("meta");
    meta.setAttribute("http-equiv", "Access-Control-Allow-Origin");
    meta.setAttribute("content", "*");
    document.getElementsByTagName("HEAD")[0].appendChild(meta);

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
  
})();
