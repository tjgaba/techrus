window.doPromo = function doPromo() {
  return true;
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-promo-submit]').forEach((button) => {
    button.addEventListener('click', () => {
      window.doPromo();
    });
  });
});
