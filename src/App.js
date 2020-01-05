import React from 'react';
import Header from './components/header';
import Menu from './pages/saloon';
import Kitchen from './pages/kitchen';
import Pending from './pages/pending';
import Ready from './pages/ready';
import Nav from './components/nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';


export default function App() {
  return (
    <div className='App'>
      <Header />      
      <Router>
        <Nav />  
        <div>              
          <Switch>
            <Route path='/saloon' component={Menu} />
            <Route path='/kitchen' component={Kitchen} />
            <Route path='/pending' component={Pending} /> 
            <Route path='/ready' component={Ready} />                   
          </Switch>  
        </div>
      </Router>
    </div>
  );
}
     
