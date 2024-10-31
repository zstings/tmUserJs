// ==UserScript==
// @name        csdn优化
// @namespace   https://github.com/zstings/
// @version     0.3
// @description csdn优化
// @author      @zstings
// @match       https://blog.csdn.net/*/article/details/*
// @match       https://*.blog.csdn.net/article/details/*
// @downloadURL https://github.com/zstings/tmUserJs/raw/refs/heads/main/src/csdn.user.js
// @updateURL   https://github.com/zstings/tmUserJs/raw/refs/heads/main/src/csdn.user.js
// @icon        https://g.csdnimg.cn/static/logo/favicon32.ico
// @run-at      document-start
// ==/UserScript==

(function () {
  'use strict';
  const style = document.createElement('style');
  style.innerHTML = `
    /* 正文 、代码块不限制高度 */
    .article_content, main div.blog-content-box pre.set-code-hide {
      height: auto!important;
      max-height: fit-content!important;
    }
    /* 右侧边栏 */
    .recommend-right_aside .kind_person,
    #recommendAdBox,
    /* 左侧边栏 */
    .blog_container_aside,
    /* 登录弹窗 */
    .passport-login-container,
    /* 关注看原文 */
    div.hide-article-box,
    /*  代码折叠块 */
    .hide-preCode-box,
    /* 右下角登录小弹出 */
    .passport-login-tip-container {
      display: none!important;
    }
    /* 评论 */
    .recommend-right {
      position: fixed!important;
      right: 20px!important;
    }
    .recommend-right_aside #groupfile {
      border-radius: 10px!important;
    }
    /* 正文 */
    .nodata .container main {
      width: 1400px!important;
      float: inherit!important;
    }
    .nodata .container {
      margin-right: 0!important;
      width: fit-content!important;
    }
    /* 角标 */
    .csdn-side-toolbar > *:not(a[data-type="gotop"]) {
      display: none!important;
    }
    .csdn-side-toolbar {
      left: calc(50% + 1400px / 2 + 60px)!important;
    }
  `;
  document.querySelector('head').appendChild(style);

  document.addEventListener('DOMContentLoaded', () => {
    // 监听节点的属性变化
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          // 找到复制按钮，将signin事件改成copyCode事件，这些都是csdn自己内部的逻辑
          document.querySelectorAll('[onclick="hljs.signin(event)"]').forEach(childNode => {
            childNode.setAttribute('onclick', 'hljs.copyCode(event)');
          });
          // 将登录复制按钮文案改成复制
          document.querySelectorAll('[data-title="登录复制"]').forEach(childNode => {
            childNode.dataset.title = '复制';
          });
        }
      });
    });
    // 开始观察页面的根节点
    observer.observe(document.querySelector('#article_content'), { attributes: true, subtree: true });
  });
  window.addEventListener('load', () => {
    // 取消a链接拦截 csdn使用了jq的on批量绑定了a的click事件，相反使用jq的off解除绑定
    $('#content_views').off('click', 'a');
    // 给所有a链接添加在新标签打开
    $('#content_views a').attr('target', '_blank');
  });
})();
