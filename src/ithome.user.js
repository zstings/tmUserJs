// ==UserScript==
// @name        it之家优化
// @namespace   https://github.com/zstings/
// @version     0.4
// @description it之家优化
// @author      @zstings
// @match       https://*.ithome.com/*
// @downloadURL https://github.com/zstings/tmUserJs/raw/refs/heads/main/src/ithome.user.js
// @updateURL   https://github.com/zstings/tmUserJs/raw/refs/heads/main/src/ithome.user.js
// @icon        https://img.ithome.com/img/soft/ithome.svg
// ==/UserScript==

(function () {
  'use strict';
  const style = document.createElement('style');
  style.innerHTML = `
    #login-guide-box {
      display: none!important;
    }
  `;
  document.querySelector('head').appendChild(style);
  // 监听DOM节点的变化
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // 遍历添加的节点
        document.querySelectorAll('span.img-placeholder').forEach(childNode => {
          const img = document.createElement('img');
          img.src = atob(childNode.dataset.s);
          img.setAttribute('style', 'width: 100%');
          childNode.parentElement.appendChild(img);
          childNode.remove();
        });
      }
    });
  });
  // 开始观察页面的根节点
  observer.observe(document.body, { childList: true, subtree: true });
})();
