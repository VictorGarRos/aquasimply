// js/accessibility.js
(() => {
  'use strict';

  const state = { fontSize: 100, min: 80, step: 10 };

  function setWidgetVisible(visible) {
    const widget = document.getElementById('accessibility-widget');
    if (!widget) return;
    widget.style.display = visible ? 'flex' : 'none';
  }

  function toggleWidget() {
    const widget = document.getElementById('accessibility-widget');
    if (!widget) return;
    const visible = !(widget.style.display === 'none' || widget.style.display === '');
    setWidgetVisible(!visible);
  }

  function applyFontSize() {
    document.body.style.fontSize = `${state.fontSize}%`;
  }

  function increaseText() {
    state.fontSize += state.step;
    applyFontSize();
  }

  function decreaseText() {
    state.fontSize = Math.max(state.min, state.fontSize - state.step);
    applyFontSize();
  }

  function toggleContrast() {
    document.body.classList.toggle('high-contrast');
  }

  function toggleGrayscale() {
    document.body.classList.toggle('grayscale');
  }

  function bind() {
    const toggleBtn = document.getElementById('accessibility-toggle');
    const panel = document.getElementById('accessibility-widget');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleWidget);

    if (panel) {
      panel.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-a11y]');
        if (!btn) return;

        const action = btn.getAttribute('data-a11y');
        switch (action) {
          case 'contrast': toggleContrast(); break;
          case 'grayscale': toggleGrayscale(); break;
          case 'incText': increaseText(); break;
          case 'decText': decreaseText(); break;
          default: break;
        }
      });
    }

    // estado inicial
    setWidgetVisible(false);
  }

  document.addEventListener('DOMContentLoaded', bind);
})();
