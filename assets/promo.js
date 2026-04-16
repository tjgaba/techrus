/* Promo JS: safe doPromo implementation and form handling */
(function(){
  function safeCall(fn){
    try{
      if(typeof fn === 'function') fn();
    }catch(e){
      console.error('Promo safeCall error:', e);
    }
  }

  window.doPromo = function(){
    // previously called undefinedFunction(); — guard against missing libs
    if (typeof window.undefinedFunction === 'function'){
      safeCall(window.undefinedFunction);
    } else if (typeof window.heavyPromoInit === 'function'){
      safeCall(window.heavyPromoInit);
    } else {
      // fallback behavior (no exception)
      console.info('Promo: no heavy init available, running lightweight fallback');
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    var cta = document.getElementById('promo-cta');
    if(cta) cta.addEventListener('click', window.doPromo);

    var form = document.getElementById('promo-form');
    if(form){
      form.addEventListener('submit', function(e){
        // simple client-side validation and graceful submit
        var email = document.getElementById('promo-email');
        if(!email || !email.value){
          e.preventDefault();
          email && email.focus();
          return;
        }
        // allow default submit to server/contact; could add AJAX here
      });
    }
  });
})();
