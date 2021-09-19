import FavoriteRestaurantIdb from '../../data/database';
import FavRestaurantSearchView from './favRestaurant/fav-restaurant-search-view';
import FavRestaurantShowPresenter from './favRestaurant/fav-restaurant-show-presenter';
import FavRestaurantSearchPresenter from './favRestaurant/fav-resto-search-presenter';

const view = new FavRestaurantSearchView();

const Favourites = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavRestaurantShowPresenter({ view, favRestaurants: FavoriteRestaurantIdb });
    new FavRestaurantSearchPresenter({ view, favRestaurant: FavoriteRestaurantIdb });
  },
};

export default Favourites;
