import app from 'flarum/forum/app';

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

app.initializers.add('zequeen-acgembed-remastered', () => {
  patchAll();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;

        if (node.tagName === 'IFRAME') {
          patchIframe(node);
          return;
        }

        if (typeof node.querySelectorAll === 'function') {
          node.querySelectorAll('iframe').forEach(patchIframe);
        }
      });
    });
  });

  const observerTarget = document.body || document.documentElement;

  if (observerTarget) {
    observer.observe(observerTarget, {
      childList: true,
      subtree: true,
    });
  }
});
