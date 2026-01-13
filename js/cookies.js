// js/cookies.js
(() => {
    'use strict';

    const STORAGE_KEY = 'cookie_consent_v1';

    const els = {};
    const state = {
        analytics: false,
        marketing: false,
        decided: false
    };

    function qs(id) { return document.getElementById(id); }

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }

    function save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function show(el) { if (el) el.style.display = 'flex'; }
    function hide(el) { if (el) el.style.display = 'none'; }

    function showBannerIfNeeded() {
        const saved = load();
        if (!saved) {
            show(els.bannerOverlay);
            hide(els.manageBtn);
            return;
        }

        // Ya hay consentimiento guardado
        hide(els.bannerOverlay);
        state.analytics = !!saved.analytics;
        state.marketing = !!saved.marketing;
        state.decided = true;
        show(els.manageBtn);
    }

    function openPreferences() {
        // precarga switches desde estado guardado (si existe)
        const saved = load();
        const a = saved ? !!saved.analytics : state.analytics;
        const m = saved ? !!saved.marketing : state.marketing;

        els.analyticsSwitch.checked = a;
        els.marketingSwitch.checked = m;

        hide(els.bannerOverlay);
        show(els.prefOverlay);
    }

    function closePreferences() {
        hide(els.prefOverlay);
        if (!state.decided) show(els.bannerOverlay);
    }

    function acceptAll() {
        state.analytics = true;
        state.marketing = true;
        state.decided = true;

        save({ decided: true, analytics: true, marketing: true, ts: Date.now() });

        hide(els.bannerOverlay);
        hide(els.prefOverlay);
        show(els.manageBtn);

        // Aquí es donde “activarías” scripts de analítica/ads si los usas.
    }

    function denyAll() {
        state.analytics = false;
        state.marketing = false;
        state.decided = true;

        save({ decided: true, analytics: false, marketing: false, ts: Date.now() });

        hide(els.bannerOverlay);
        hide(els.prefOverlay);
        show(els.manageBtn);

        // Aquí es donde “bloquearías” scripts de analítica/ads si los usas.
    }

    function enableAllToggles() {
        els.analyticsSwitch.checked = true;
        els.marketingSwitch.checked = true;
    }

    function disableAllToggles() {
        els.analyticsSwitch.checked = false;
        els.marketingSwitch.checked = false;
    }

    function savePreferences() {
        state.analytics = !!els.analyticsSwitch.checked;
        state.marketing = !!els.marketingSwitch.checked;
        state.decided = true;

        save({
            decided: true,
            analytics: state.analytics,
            marketing: state.marketing,
            ts: Date.now()
        });

        hide(els.prefOverlay);
        hide(els.bannerOverlay);
        show(els.manageBtn);

        // Aquí activas/desactivas scripts según state.analytics/state.marketing
    }

    function bind() {
        els.cookieAccept.addEventListener('click', acceptAll);
        els.cookieDeny.addEventListener('click', denyAll);
        els.cookiePreferences.addEventListener('click', openPreferences);

        els.enableAll.addEventListener('click', enableAllToggles);
        els.disableAll.addEventListener('click', disableAllToggles);
        els.saveBtn.addEventListener('click', savePreferences);

        // Cerrar preferencias al hacer click fuera del cuadro (opcional)
        els.prefOverlay.addEventListener('click', (e) => {
            if (e.target === els.prefOverlay) closePreferences();
        });

        els.manageBtn.addEventListener('click', openPreferences);
    }

    document.addEventListener('DOMContentLoaded', () => {
        els.bannerOverlay = qs('cookie-overlay');
        els.prefOverlay = qs('cookie-preferences-overlay');

        els.cookieAccept = qs('cookie-accept');
        els.cookieDeny = qs('cookie-deny');
        els.cookiePreferences = qs('cookie-preferences');

        els.analyticsSwitch = qs('cookie-analytics');
        els.marketingSwitch = qs('cookie-marketing');

        els.enableAll = qs('cookie-enable-all');
        els.disableAll = qs('cookie-disable-all');
        els.saveBtn = qs('cookie-save');

        els.manageBtn = qs('cookie-manage-consent');

        if (!els.bannerOverlay || !els.prefOverlay) return;

        bind();
        showBannerIfNeeded();
    });
})();
