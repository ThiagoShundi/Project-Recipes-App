import { useLocation } from 'react-router-dom';
import Drinks from './Drinks';
import Meals from './Meals';

function Recipes() {
  const location = useLocation();
  if (location.pathname === '/meals') {
    return <Meals />;
  }
  return (
    <Drinks />
  );
}

export default Recipes;
