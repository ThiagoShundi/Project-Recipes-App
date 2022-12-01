import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
// import RecipeDetails from './pages/RecipeDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/meals/:id" />
      <Route path="/drinks/:id" />
      <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
      <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" />
      <Route path="/drinks/:id/in-progress" />
    </Switch>
  );
}
