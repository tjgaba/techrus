/* Promo JS: safe doPromo implementation and form handling */
(function(){
  function safeCall(fn){
    try{
      if(typeof fn === 'function') fn();
    }catch(e){
      // keep errors non-fatal for the rest of the page
      typeof console !== 'undefined' && console.error && console.error('Promo safeCall error:', e);
    }
  }

  var root = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined') ? globalThis : null;

  if(root){
    root.doPromo = function(){
      if (typeof root.undefinedFunction === 'function'){
        safeCall(root.undefinedFunction);
      } else if (typeof root.heavyPromoInit === 'function'){
        safeCall(root.heavyPromoInit);
      } else {
        typeof console !== 'undefined' && console.info && console.info('Promo: no heavy init available, running lightweight fallback');
      }
    };
  }

  if (typeof document !== 'undefined' && document.addEventListener){
    function initPromo(){
      var cta = document.getElementById('promo-cta');
      if(cta && typeof root !== 'undefined' && typeof root.doPromo === 'function'){
        try{ cta.addEventListener('click', root.doPromo); }catch(e){ typeof console !== 'undefined' && console.error && console.error('Promo CTA attach error:', e); }
      }

      var form = document.getElementById('promo-form');
      if(form){
        try{
          form.addEventListener('submit', function(e){
            var email = document.getElementById('promo-email');
            if(!email || !email.value){
              e.preventDefault();
              if(email && typeof email.focus === 'function') email.focus();
              return;
            }
          });
        }catch(e){ typeof console !== 'undefined' && console.error && console.error('Promo form attach error:', e); }
      }
    }

    try{
      if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', initPromo);
      } else {
        initPromo();
      }
    }catch(err){
      typeof console !== 'undefined' && console.error && console.error('Promo init error:', err);
    }
  }

})();
