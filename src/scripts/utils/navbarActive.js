import UrlParser from '../routes/urlParser';

const setActiveNavbar = () => {
  const navLinks = document.querySelectorAll('.nav-link');
  let activeUrl = UrlParser.parseActiveUrlWithCombiner();

  if (activeUrl === '') activeUrl = '/';

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');

    if (!href || !href.startsWith('#')) return;

    const cleanHref = href.replace('#', '');

    link.classList.remove('active');
    link.removeAttribute('aria-current');

    if (
      cleanHref === activeUrl
      || (activeUrl.startsWith(cleanHref) && cleanHref !== '/')
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
};

export default setActiveNavbar;
