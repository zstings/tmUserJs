// ==UserScript==
// @name         禁止copy事件绑定
// @namespace    https://github.com/zstings/
// @version      0.2
// @description  禁止网页上任何形式的复制事件监听
// @author       @zstings
// @match        *://*/*
// @icon         data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🚫</text></svg>
// @grant        none
// @run-at       document-start
// @downloadURL https://github.com/zstings/tmUserJs/raw/refs/heads/main/src/disableCopyEvent.user.js
// @updateURL   https://github.com/zstings/tmUserJs/raw/refs/heads/main/src/disableCopyEvent.user.js
// ==/UserScript==

(function () {
  'use strict';
  const COPY_EVENT = 'copy';
  const COPY_EVENT_HANDLER = 'on' + COPY_EVENT;
  const readOnlyProperty = { value: null, writable: false };
  Object.defineProperty(HTMLElement.prototype, COPY_EVENT_HANDLER, readOnlyProperty);
  Object.defineProperty(Document.prototype, COPY_EVENT_HANDLER, readOnlyProperty);
  Object.defineProperty(window, COPY_EVENT_HANDLER, readOnlyProperty);

  HTMLElement.prototype._addEventListener = Element.prototype.addEventListener;
  Document.prototype._addEventListener = Document.prototype.addEventListener;
  Window.prototype._addEventListener = Window.prototype.addEventListener;
  HTMLElement.prototype.addEventListener = customAddEventListener;
  Document.prototype.addEventListener = customAddEventListener;
  Window.prototype.addEventListener = customAddEventListener;
  function customAddEventListener(eventType, listener, options) {
    if (eventType !== COPY_EVENT && this && this._addEventListener) this._addEventListener(eventType, listener, options);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const copyElements = [...document.querySelectorAll('[' + COPY_EVENT_HANDLER + ']')];
    copyElements.forEach(item => item.removeAttribute(COPY_EVENT_HANDLER));
    const style = document.createElement('style');
    style.innerHTML = '*{user-select: auto!important;}';
    document.querySelector('head').appendChild(style);
  });
})();
