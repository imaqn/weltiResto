import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favourites from '../views/pages/favourite';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/detail/:id': Detail,
  '/favourites': Favourites,
};
export default routes;
