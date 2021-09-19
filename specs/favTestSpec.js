import FavoriteRestaurantIdb from '../src/scripts/data/database';
import * as testFactories from './helpers/testFactories';

describe('Save Favourite Restaurant', () => {
  const favButtonContainer = () => {
    document.body.innerHTML = '<div id="favButtonContainer"></div>';
  };

  beforeEach(() => {
    favButtonContainer();
  });

  it('should show the love button when the restaurant were not a favourite before', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="save this restaurant to favourites"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant were not a favourite before', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="delete this restaurant from favourite"]')).toBeFalsy();
  });

  it('should be able to save the restaurant', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    document.querySelector('#favButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when it is already a favorite', async () => {
    await testFactories.createFavButtonPresenter({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#favButton').dispatchEvent(new Event('click'));
    // tidak ada film yang ganda
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // menggunakan metode xit, bukan it
  it('should not add a restaurant when it has no id', async () => {
    await testFactories.createFavButtonPresenter({});

    document.querySelector('#favButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
