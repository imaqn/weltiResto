import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import FavButtonInitiator from '../../utils/fav-button-presenter';
import FavoriteRestaurantIdb from '../../data/database';

const Detail = {
  async render() {
    return `
      <div id="resto" class="resto"></div>
      <div id="favButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await RestaurantSource.detailResto(url.id);
    const restoData = resto.restaurant;
    const restoContainer = document.querySelector('#resto');
    restoContainer.innerHTML = createRestoDetailTemplate(restoData);

    FavButtonInitiator.init({
      favButtonContainer: document.querySelector('#favButtonContainer'),
      favRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restoData.id,
        pictureId: restoData.pictureId,
        name: restoData.name,
        rating: restoData.rating,
        description: restoData.description,
        city: restoData.city,
        address: restoData.address,
      },
    });
  },
};

export default Detail;
