(function () {
  function isMobileUserAgent() {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
      return navigator.userAgentData.mobile;
    }

    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile/i.test(ua);
  }

  function toMobileOutchain(url) {
    return url.replace('//music.163.com/outchain/', '//music.163.com/m/outchain/');
  }

  function patchIframe(iframe) {
    if (!isMobileUserAgent()) return;

    const src = iframe.getAttribute('src');
    if (!src || !src.includes('//music.163.com/outchain/')) return;
    if (src.includes('//music.163.com/m/outchain/')) return;

    iframe.setAttribute('src', toMobileOutchain(src));
  }

  function patchAll() {
    document.querySelectorAll('iframe').forEach(patchIframe);
  }

  document.addEventListener('DOMContentLoaded', function () {
    patchAll();

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (!(node instanceof HTMLElement)) return;

          if (node.tagName === 'IFRAME') {
            patchIframe(node);
            return;
          }

          node.querySelectorAll && node.querySelectorAll('iframe').forEach(patchIframe);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
})();
