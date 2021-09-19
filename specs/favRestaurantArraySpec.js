import { itActsAsFavRestaurantModel } from './contract/favRestaurantContract';

let favRestaurants = [];

const FavRestaurantArray = {

  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favRestaurants.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurants() {
    return favRestaurants;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    favRestaurants = favRestaurants.filter((restaurant) => restaurant.id !== id);
  },

  searchRestaurant(query) {
    return this.getAllRestaurants()
      .filter((restaurant) => {
        const loweredCaseRestoName = (restaurant.name || '-').toLowerCase();
        const jammedRestoName = loweredCaseRestoName.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestoName.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favRestaurants = []);

  itActsAsFavRestaurantModel(FavRestaurantArray);
});
