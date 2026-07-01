const banner = document.getElementById('banner-id');

const setHeight = () => {
  const h = banner.offsetHeight;
  document.documentElement.style.setProperty('--banner-height', `${h}px`);
  document.body.style.marginTop = `${h}px`;
};

setHeight();

const resizeObserver = new ResizeObserver(setHeight);
resizeObserver.observe(banner);
