import { itActsAsFavRestaurantModel } from './favRestaurantContract';
import FavoriteRestaurantIdb from '../../src/scripts/data/database';

describe('Favourite Restaurant Idb Contract Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });
  itActsAsFavRestaurantModel(FavoriteRestaurantIdb);
});
