class FavRestaurantShowPresenter {
  constructor({ view, favRestaurants }) {
    this._view = view;
    this._favRestaurants = favRestaurants;

    this._showFavRestaurants();
  }

  async _showFavRestaurants() {
    const restaurants = await this._favRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restos) {
    this._view.showFavRestaurants(restos);
  }
}

export default FavRestaurantShowPresenter;
