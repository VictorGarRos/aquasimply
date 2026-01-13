// js/app.js
(() => {
  'use strict';

  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function preventPrivacyLinkJump() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-privacy-link]');
      if (!link) return;
      e.preventDefault();
      // Aquí puedes abrir tu modal/ página de privacidad si quieres
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setYear();
    preventPrivacyLinkJump();
  });
})();
