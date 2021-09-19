Feature('Favourite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favourites');
});

Scenario('showing empty favourite restaurant', ({ I }) => {
  I.seeElement('#query');
  I.see('There is no favourite restaurant', '.restoNotFound');
});

const assert = require('assert');

Scenario('save a restaurant to favourite and delete it', async ({ I }) => {
  I.see('There is no favourite restaurant', '.restoNotFound');

  I.amOnPage('/');
  I.seeElement('.resto-name');

  const firstResto = locate('a.resto-name').first();
  const firstRestoName = await I.grabTextFrom(firstResto);

  I.click(firstResto);

  I.seeElement('#favButton');
  I.click('#favButton');
  I.amOnPage('/#/favourites');
  I.seeElement('.menu');
  const favRestaurantName = await I.grabTextFrom('a.resto-name');
  assert.strictEqual(favRestaurantName, firstRestoName);

  I.click(locate('a.resto-name'));
  I.seeElement('#favButton');
  I.click('#favButton');

  I.amOnPage('/#/favourites');
  I.see('There is no favourite restaurant', '.restoNotFound');
});

Scenario('searching favourite restaurant', async ({ I }) => {
  I.see('There is no favourite restaurant', '.restoNotFound');
  I.amOnPage('/');
  I.seeElement('.resto-name');

  const restoNames = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('a.resto-name').at(i));
    I.seeElement('#favButton');
    I.click('#favButton');
    const restoName = await I.grabTextFrom('.resto h2');
    restoNames.push(restoName);
    I.amOnPage('/');
  }

  I.amOnPage('/#/favourites');

  const searchQuery = restoNames[1].substring(1, 3);
  const matchRestaurants = restoNames.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('Search', searchQuery);
  I.pressKey('Enter');

  const visibleRestaurant = await I.grabNumberOfVisibleElements('.resto-name');
  assert.strictEqual(matchRestaurants.length, visibleRestaurant);

  matchRestaurants.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.resto-name').at(index + 1));
    assert.strictEqual(visibleName, name);
  });
});
