// ==UserScript==
// @name         禁止copy事件绑定
// @namespace    https://github.com/zstings/
// @version      0.3
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

  // 1. 拦截监听器的添加，但不破坏原型链
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    // 只有当类型是 copy/cut/contextmenu/selectstart 时才屏蔽
    const blockedEvents = ['copy', 'cut', 'contextmenu', 'selectstart'];
    if (blockedEvents.includes(type)) {
      // 我们可以选择直接跳过，或者返回一个空的监听器
      return;
    }
    return originalAddEventListener.apply(this, arguments);
  };

  // 2. 捕获阶段拦截 (高优先级)
  // 这种方法比修改 writable 更安全，因为它不会导致报错
  const blockEffect = (e) => {
    e.stopImmediatePropagation(); // 阻止其他脚本获取此事件
    return false;
  };

  // 在 window 级别监听，开启 capture: true
  window.addEventListener('copy', blockEffect, true);
  window.addEventListener('cut', blockEffect, true);
  window.addEventListener('contextmenu', blockEffect, true);
  window.addEventListener('selectstart', blockEffect, true);

  // 3. 清理 HTML 标签内联的 oncopy="return false"
  const clearInlineAttributes = () => {
    const events = ['oncopy', 'oncut', 'oncontextmenu', 'onselectstart', 'onmousedown'];
    const allElements = document.getElementsByTagName('*');
    for (let el of allElements) {
      events.forEach(attr => {
        if (el.hasAttribute(attr)) el.removeAttribute(attr);
      });
    }
  };

  // 初始清理和动态观察
  clearInlineAttributes();
  const observer = new MutationObserver(clearInlineAttributes);
  observer.observe(document.documentElement, { childList: true, subtree: true });

})();
