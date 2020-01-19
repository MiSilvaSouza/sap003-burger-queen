import React from 'react';
import Header from './components/header';
import Menu from './pages/saloon';
import Kitchen from './pages/kitchen';
import Ready from './pages/ready';
import Delivered from './pages/delivered';
import Nav from './components/nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';


export default function App() {
  return (
    <div className='App'>
      <Header img={'imagens/logo.png'} alt={'logo'} title={'BURGER QUEEN'}/>      
      <Router>
        <Nav />                    
          <Switch>
            <Route path='/saloon' component={Menu} />
            <Route path='/kitchen' component={Kitchen} />           
            <Route path='/ready' component={Ready} />
            <Route path='/delivered' component={Delivered} />                   
          </Switch>       
      </Router>
    </div>
  )
};
     
