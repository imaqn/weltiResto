class FavRestaurantSearchPresenter {
  constructor({ favRestaurant, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favRestaurant = favRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchResto(latestQuery);
    });
  }

  async _searchResto(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestos;
    if (this.latestQuery.length > 0) {
      foundRestos = await this._favRestaurant.searchRestaurant(this.latestQuery);
    } else {
      foundRestos = await this._favRestaurant.getAllRestaurants();
    }
    this._showFoundRestos(foundRestos);
  }

  _showFoundRestos(restos) {
    this._view.showFavRestaurants(restos);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavRestaurantSearchPresenter;
