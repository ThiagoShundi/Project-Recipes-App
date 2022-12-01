import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import MealsId from './pages/MealsId';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/meals/id" component={ MealsId } />
      <Route path="/drinks/id" />
      <Route path="/meals/:id/in-progress" />
      <Route path="/drinks/:id/in-progress" />
    </Switch>
  );
}
