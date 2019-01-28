// ==UserScript==
// @name         Magnet-ссылка для Kinozal.tv/me/guru
// @namespace    https://github.com/maxkorsov
// @version      0.2.1
// @description  В торрент раздачах Kinozal.tv/me/guru, в разделе "Список файлов" пункт "Инфо хеш" заменяется на "Magnet-ссылку", которая позволяет скачивать торренты без учета рейтинга.
// @author       maxkorsov (Forked from kvar/magnet kinozal.tv)
// @icon         https://raw.githubusercontent.com/maxkorsov/magnet-kinozal/master/magnet.png
// @compatible   firefox
// @compatible   chrome
// @match        *://kinozal.tv/details.php*
// @match        *://kinozal.me/details.php*
// @match        *://kinozal.guru/details.php*
// @match        *://kinozal.tv/comment.php*
// @match        *://kinozal.me/comment.php*
// @match        *://kinozal.guru/comment.php*
// @run-at       document-end
// @homepageURL  https://github.com/maxkorsov/magnet-kinozal
// @grant        none
// ==/UserScript==

var rplintrID;
function rplhe() {
    var el = document.getElementById('containerdata');
    var rplstr = el.innerHTML;
    if (rplstr.length>15) {
        el.innerHTML = rplstr.replace(/Инфо хеш:\s(.*?)</, 'Magnet-ссылка: <a href=magnet:?xt=urn:btih:$1>magnet:?xt=urn:btih:$1</a><');
        clearInterval(rplintrID);
    }
}
window.startrplhe = function(){rplintrID = setInterval(rplhe, 50)};

var link = document.querySelector('a[onclick*="Список файлов"]');
link.setAttribute('onclick',link.getAttribute('onclick').replace(/(.*?)(return false)/,'$1startrplhe();$2'));

if (document.getElementsByClassName('bx1 justify')[0].innerHTML.match(/Раздача заблокирована/)){link.click()};