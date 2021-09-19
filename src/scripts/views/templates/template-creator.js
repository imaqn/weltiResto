/* eslint-disable no-tabs */
import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (restoData) => {
  let detail = '';
  detail += `
    <h2>${restoData.name}</h2>
      <div class = "overview">
        ⭐️${restoData.rating} | `;
  restoData.categories.forEach((category) => {
    if (category !== restoData.categories[0]) detail += ', ';
    detail += `${category.name}`;
  });
  detail += ` | ${restoData.address}, ${restoData.city} </div>
  <div class="about">
    <img id="pic-resto" class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restoData.pictureId}" alt="${restoData.name}">
    <p id="desc"><b>About : </b> <br> ${restoData.description}</p>`;
  detail += '<ul aria-label="Food">';
  restoData.menus.foods.forEach((food) => {
    detail += `<li>${food.name}</li>`;
  });
  detail += '</ul>';
  detail += '<ul aria-label="Beverages">';
  restoData.menus.drinks.forEach((drink) => {
    detail += `<li>${drink.name}</li>`;
  });
  detail += ` </ul>
            </div><br>`;
  detail += '<b>Reviews</b>';
  detail += '<div class="allReviews">';
  restoData.customerReviews.forEach((review) => {
    detail += `<div class="review">
                <span class="reviewName">${review.name}</span>
                <br><p>${review.review}</p>
                <span class="reviewDate">on ${review.date}</span>
              </div>`;
  });
  detail += '</div>';
  return detail;
};
const createRestoItemTemplate = (restoData) => `
  <div class="menu">
    <img class="pic-restos lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restoData.pictureId}" alt="${restoData.name || '-'}">
    <h2><a class="resto-name" href="${`/#/detail/${restoData.id}`}">${restoData.name || '-'}</a></h2>
      <div class = "stars">⭐️${restoData.rating}</div>
      <span style="color: #fcba03; padding-left: 3%">${restoData.city}</span>
    <p>${restoData.description || '-'}</P>
  </div>
`;
const createFavRestaurantButtonTemplate = () => `
  <button aria-label="save this restaurant to favourites" id="favButton" class="fav">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnfavRestaurantButtonTemplate = () => `
  <button aria-label="delete this restaurant from favourite" id="favButton" class="fav">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
export {
  createRestoDetailTemplate,
  createRestoItemTemplate,
  createFavRestaurantButtonTemplate,
  createUnfavRestaurantButtonTemplate,
};
