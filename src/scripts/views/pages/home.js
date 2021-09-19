import RestaurantSource from '../../data/source';
import { createRestoItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="jumbotron">
        <div class="cap">
            <h1>Welti Restos</h1>
            <h2>Eat comfortably at our partner restaurants and don't worry about the price</h2>
        </div>
        </div>
        <div class="content">
          <div id="restos">
 
          </div>
        </div>
      `;
  },

  async afterRender() {
    const data = await RestaurantSource.getRestoData();
    const restosData = data.restaurants;
    const restosContainer = document.querySelector('#restos');
    restosData.forEach((restos) => {
      restosContainer.innerHTML += createRestoItemTemplate(restos);
    });
  },

};

export default Home;
