<<<<<<< HEAD

(function(){
  function heavyPromoInit(){

    console.info('heavy-lib: heavyPromoInit executed');
  }


  window.heavyPromoInit = heavyPromoInit;
})();
=======
/* Simulated heavy library (deferred). Exposes a hook heavyPromoInit used by promo.js when available. */
(function(){
  function heavyPromoInit(){
    // pretend to do heavy work; keep it safe and idempotent
    console.info('heavy-lib: heavyPromoInit executed');
  }

  // expose a well-known hook
  window.heavyPromoInit = heavyPromoInit;
})();
>>>>>>> 74800c9525ade1d781a99ce0ba2e9d292d825fc8
