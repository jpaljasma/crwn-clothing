import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
const HatsPage = () => {
  return (
    <div>
      <h1>Hats Page</h1>
    </div>
  )
};

const FourOhFour = ({ location, match }) => {
  return (
    <div className='error'>
      <h1>404</h1>
      <p>The requested document <code>{location.pathname}</code> was not found.</p>
      <p>Please proceed to <Link to={match.url}>home page</Link>.</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
        <Route component={FourOhFour} status={404}/>
      </Switch>
    </div>
  );
}

export default App;
