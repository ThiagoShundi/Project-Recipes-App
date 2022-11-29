import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/favoriterecipes" component={ FavoriteRecipes } />
      <Route path="/meals" component={ Meals } />
      <Route path="/profile" component={ Profile } />
      <Route path="/meals/:id" />
      <Route path="/drinks/:id" />
      <Route path="/meals/:id/in-progress" />
      <Route path="/drinks/:id/in-progress" />
    </Switch>
  );
}

export default App;
