/* Simulated heavy library (deferred). Exposes a hook heavyPromoInit used by promo.js when available. */
(function(){
  function heavyPromoInit(){
    // pretend to do heavy work; keep it safe and idempotent
    console.info('heavy-lib: heavyPromoInit executed');
  }

  // expose a well-known hook
  window.heavyPromoInit = heavyPromoInit;
})();
