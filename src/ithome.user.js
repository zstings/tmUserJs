// ==UserScript==
// @name        it之家优化
// @namespace   https://github.com/zstings/
// @version     0.1
// @description it之家优化
// @author      @zstings
// @match       https://*.ithome.com/*
// @icon        https://img.ithome.com/img/soft/ithome.svg
// ==/UserScript==

(function () {
  'use strict';
  // 监听DOM节点的变化
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // 遍历添加的节点
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 搜索所有span.img-placeholder子节点
            node.querySelectorAll('span.img-placeholder').forEach(childNode => {
              const img = document.createElement('img');
              img.src = atob(childNode.dataset.s);
              img.setAttribute('style', 'width: 100%');
              childNode.parentElement.appendChild(img);
              childNode.remove();
            });
          }
        });
      }
    });
  });
  // 开始观察页面的根节点
  observer.observe(document.body, { childList: true, subtree: true });
})();
