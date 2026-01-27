import About from '../view/pages/about';
import CekMakanan from '../view/pages/classification';
import HistoryMenus from '../view/pages/historyMenus';
import Home from '../view/pages/home/home';
import Menu from '../view/pages/menus';

const routes = {
  '/': Home,
  '/tentang': About,
  '/daftarmenu': Menu,
  '/cekmakanan': CekMakanan,
  '/riwayat': HistoryMenus,
};

export default routes;
