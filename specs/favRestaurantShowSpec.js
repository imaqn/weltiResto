import FavRestaurantSearchView from '../src/scripts/views/pages/favRestaurant/fav-restaurant-search-view';
import FavRestaurantShowPresenter from '../src/scripts/views/pages/favRestaurant/fav-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/database';

describe('Showing all favorite restaurants', () => {
  let view;
  const renderTemplate = () => {
    view = new FavRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should render the information that there is no favourite restaurant', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.restoNotFound').length).toEqual(1);

        done();
      });
      const favRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favRestaurants.getAllRestaurants.and.returnValues([]);
      new FavRestaurantShowPresenter({
        view,
        favRestaurants,
      });
    });

    it('should ask for the favorite restaurants', () => {
      const favRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);

      new FavRestaurantShowPresenter({
        view,
        favRestaurants,
      });

      expect(favRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.menu').length).toEqual(2);
        done();
      });
      const favRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favRestaurants.getAllRestaurants.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, city: 'Colombo', description: 'Sebuah resto A',
        },
        {
          id: 22, neme: 'B', rating: 4, city: 'Colombus', description: 'Sebuah resto B',
        },
      ]);
      new FavRestaurantShowPresenter({
        view,
        favRestaurants,
      });
    });
  });
});
