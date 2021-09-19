import FavoriteRestaurantIdb from '../../src/scripts/data/database';
import FavButtonInitiator from '../../src/scripts/utils/fav-button-presenter';

const createFavButtonPresenter = async (restaurant) => {
  await FavButtonInitiator.init({
    favButtonContainer: document.querySelector('#favButtonContainer'),
    favRestaurants: FavoriteRestaurantIdb,
    restaurant,
  });
};

export { createFavButtonPresenter };
