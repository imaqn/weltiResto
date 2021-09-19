import API_ENDPOINT from '../globals/api-endpoints';

class RestaurantSource {
  static async getRestoData() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  static async detailResto(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}
export default RestaurantSource;
