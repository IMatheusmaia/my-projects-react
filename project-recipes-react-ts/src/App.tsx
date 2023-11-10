import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import NotFound from './pages/NotFound';

function App() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLogged = user.email !== undefined;
  return (
    <Routes>
      <Route index element={ isLogged ? <Profile /> : <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/meals/:ID_DA_RECEITA" element={ <RecipeDetails /> } />
        <Route path="/drinks/:ID_DA_RECEITA" element={ <RecipeDetails /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/meals/:ID_DA_RECEITA" element={ <Meals /> } />
      <Route path="/meals/:ID_DA_RECEITA/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:ID_DA_RECEITA" element={ <Drinks /> } />
      <Route path="/drinks/:ID_DA_RECEITA/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
