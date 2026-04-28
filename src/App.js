import React, { Component } from 'react';
import './App.css';

import MusicsPage from './components/pages/MusicsPage';
import AddMusic from './components/AddMusic';

import { Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import PrivateRoute from './routes/PrivateRoute';
import Cart from './components/Cart';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />


        <Container text>
          {/* 🔐 Protected Routes */}
          <PrivateRoute path="/products" component={MusicsPage} />
          <PrivateRoute path="/add" component={AddMusic} />
          <PrivateRoute path="/cart" component={Cart} />

          {/* 🌐 Public Route */}
          <Route path="/login" component={Login} />
        </Container>

        <Footer />
      </div>
    );
  }
}

export default App;