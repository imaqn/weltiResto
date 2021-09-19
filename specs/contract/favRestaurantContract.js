const itActsAsFavRestaurantModel = (favRestaurant) => {
  it('should return the restaurants that has been added', async () => {
    favRestaurant.putRestaurant({ id: 1 });
    favRestaurant.putRestaurant({ id: 2 });

    expect(await favRestaurant.getRestaurant(1))
      .toEqual({ id: 1 });
    expect(await favRestaurant.getRestaurant(2))
      .toEqual({ id: 2 });
    expect(await favRestaurant.getRestaurant(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favRestaurant.putRestaurant({ aProperty: 'property' });

    expect(await favRestaurant.getAllRestaurants())
      .toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favRestaurant.putRestaurant({ id: 1 });
    favRestaurant.putRestaurant({ id: 2 });

    expect(await favRestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    favRestaurant.putRestaurant({ id: 1 });
    favRestaurant.putRestaurant({ id: 2 });
    favRestaurant.putRestaurant({ id: 3 });

    await favRestaurant.deleteRestaurant(1);

    expect(await favRestaurant.getAllRestaurants())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favRestaurant.putRestaurant({ id: 1 });
    favRestaurant.putRestaurant({ id: 2 });
    favRestaurant.putRestaurant({ id: 3 });

    await favRestaurant.deleteRestaurant(4);

    expect(await favRestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favRestaurant.putRestaurant({ id: 1, name: 'resto a' });
    favRestaurant.putRestaurant({ id: 2, name: 'resto b' });
    favRestaurant.putRestaurant({ id: 3, name: 'resto abc' });
    favRestaurant.putRestaurant({ id: 4, name: 'ini resto abcd' });

    expect(await favRestaurant.searchRestaurant('resto a')).toEqual([
      { id: 1, name: 'resto a' },
      { id: 3, name: 'resto abc' },
      { id: 4, name: 'ini resto abcd' },
    ]);
  });
};

export { itActsAsFavRestaurantModel };
