import { createRestoItemTemplate } from '../../templates/template-creator';

class FavRestaurantSearchView {
  getTemplate() {
    return `
        <div class="content">
        <h2 id="favTitle">Your favourite restaurants</h3>
        <input id="query" type="text" placeholder="Search">
            <div id="restos" class="restos">

            </div>
        </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavRestaurants(restos) {
    let html;
    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), '');
    } else {
      html = '<div class="restoNotFound">There is no favourite restaurant</div>';
    }
    document.getElementById('restos').innerHTML = html;

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
  }
}

export default FavRestaurantSearchView;
