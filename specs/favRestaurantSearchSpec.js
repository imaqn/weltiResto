import FavRestaurantSearchPresenter from '../src/scripts/views/pages/favRestaurant/fav-resto-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/database';
import FavRestaurantSearchView from '../src/scripts/views/pages/favRestaurant/fav-restaurant-search-view';

describe('Searching restaurant', () => {
  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  let view;
  const setRestoSearchContainer = () => {
    view = new FavRestaurantSearchView();
    document.body.innerHTML = view.getTemplate;
  };

  let presenter;
  let favRestaurant;
  const constructPresenter = () => {
    favRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavRestaurantSearchPresenter({
      favRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchResto('resto a');
      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for faved restaurant', () => {
      searchResto('resto a');
      expect(favRestaurant.searchRestaurant).toHaveBeenCalledOnceWith('resto a');
    });

    it('should show - when the returned restaurant that doesnt have name', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        const restoName = document.querySelectorAll('.resto-name');
        expect(restoName.item(0).textContent).toEqual('-');
        done();
      });

      favRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([
        { id: 444 },
      ]);

      searchResto('resto a');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.menu').length).toEqual(3);
        done();
      });

      favRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' },
      ]);
      searchResto('resto a');
    });

    it('should show the name of the restaurant found by Favorite Restaurants', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        const restoName = document.querySelectorAll('.resto-name');
        expect(restoName.item(0).textContent).toEqual('resto abc');
        expect(restoName.item(1).textContent).toEqual('ada juga resto abcde');
        expect(restoName.item(2).textContent).toEqual('ini juga boleh resto a');
        done();
      });

      favRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' },
      ]);
      searchResto('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchResto(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchResto('    ');

      expect(favRestaurant.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.restoNotFound').length)
            .toEqual(1);
          done();
        });

      favRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([]);

      searchResto('resto a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.menu').length).toEqual(0);
        done();
      });

      favRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([]);

      searchResto('resto a');
    });
  });
});
