/* eslint-disable no-underscore-dangle */
import { createFavRestaurantButtonTemplate, createUnfavRestaurantButtonTemplate } from '../views/templates/template-creator';

const FavButtonInitiator = {
  async init({ favButtonContainer, favRestaurants, restaurant }) {
    this._favButtonContainer = favButtonContainer;
    this._restaurant = restaurant;
    this._favRestaurants = favRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderFaved();
    } else {
      this._renderFav();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderFav() {
    this._favButtonContainer.innerHTML = createFavRestaurantButtonTemplate();

    const favButton = document.querySelector('#favButton');
    favButton.addEventListener('click', async () => {
      await this._favRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFaved() {
    this._favButtonContainer.innerHTML = createUnfavRestaurantButtonTemplate();

    const favButton = document.querySelector('#favButton');
    favButton.addEventListener('click', async () => {
      await this._favRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavButtonInitiator;
