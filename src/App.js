import React from 'react';
import Header from './components/header';
import Menu from './pages/saloon';
import Kitchen from './pages/kitchen';
import Nav from './components/nav';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './style.css';



export default function App() {
  return (
    <div className='App'>
      <Header />      
      <Router>
        <Nav />  
        <div>              
          <Switch>
            <Route exact path="/saloon" component={Menu} />
            <Route exact path="/kitchen" component={Kitchen} />                  
          </Switch>  
        </div>
      </Router>
    </div>
  );
}
     
