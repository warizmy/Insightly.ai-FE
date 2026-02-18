import menuImages from '../../utils/imageMapper';
import menusData from '../../../data/menus.json';

class Menu {
  _renderMenuCards() {
    return menusData
      .map((menu) => {
        const imageSrc = menuImages[menu.imageKey];
        const categoryClass = this._normalizeCategory(menu.category);

        return `
          <div class="menu-card border-0 shadow-sm overflow-hidden">
               <div class="menu-image-wrapper position-relative">
                    <img
                         src="${imageSrc}"
                         class="img-menu lazyload"
                         alt="${menu.name}"
                    />
                    <div class="category-tag category-${categoryClass}">
                         ${menu.category}
                    </div>
               </div>
               <div class="card-body p-3 text-center">
                    <h6 class="fw-bold mb-0">${menu.name}</h6>
               </div>
          </div>`;
      })
      .join('');
  }

  _render() {
    const section = document.createElement('section');
    section.innerHTML = `
      <div class="container py-5 mt-5">
        <div class="d-flex flex-column justify-content-center">
          <h2 class="fw-semibold">Menu Terdaftar</h2>
          <small class="text-secondary">
            AI kami dilatih khusus untuk mengenali hidangan-hidangan autentik Indonesia berikut ini.
          </small>

          <div class="py-5">
            <div class="card-menu-container">
              ${this._renderMenuCards()}
            </div>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  _IntializeEvent() {
  }

  _normalizeCategory(category) {
    return category
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z-]/g, '');
  }
}

export default Menu;
