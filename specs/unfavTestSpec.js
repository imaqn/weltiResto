import FavoriteRestaurantIdb from '../src/scripts/data/database';
import * as testFactories from './helpers/testFactories';

const favButtonContainer = () => {
  document.body.innerHTML = '<div id="favButtonContainer"></div>';
};

describe('Delete restaurant from favourites', () => {
  beforeEach(async () => {
    favButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been saved', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="delete this restaurant from favourite"]'))
      .toBeTruthy();
  });

  it('should not display like widget when the restaurant has been saved', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="save this restaurant to favourites"]'))
      .toBeFalsy();
  });

  it('should be able to remove saved restaurant from the list', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    document.querySelector('[aria-label="delete this restaurant from favourite"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavoured restaurant is not in the list', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    // hapus dulu film dari daftar film yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="delete this restaurant from favourite"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
