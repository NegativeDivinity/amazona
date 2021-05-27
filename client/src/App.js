import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignInScreen from './screens/SignInScreen';


function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <Router>
      <div className="app">
        <div className = 'grid-container'>
              <header className = 'row'>
                  <div className = 'brand'>
                      <Link to = '/'>amazona</Link>
                  </div>
                  <div>
                      <Link to = '/cart'>Cart
                        {cartItems.length > 0 && (
                          <span className = 'badge'>{cartItems.length}</span>
                        )}
                      </Link>
                        {
                          userInfo ? (
                            <div className="dropdown">
                              <Link to = '#'>
                                {userInfo.name} <i className = 'fa fa-caret-down'></i> 
                              </Link>
                              <ul className = 'dropdown-content'>
                                <li>
                                  <Link to = '/orderhistory'>Order History</Link>
                                </li>
                                <li>
                                  <Link to = '#signout' onClick = {signoutHandler}>Sign Out</Link>
                                </li>
                              </ul>
                            </div>
                          ) :
                          (
                            <Link to = '/signin'>Sign In</Link>
                          )
                        }
                  </div>
              </header>
              <main>
                <Route path = '/cart/:id?' component = {CartScreen} />
                <Route path = '/product/:id' component = {ProductScreen} />
                <Route path = '/signin' component = {SignInScreen} />
                <Route path = '/register' component = {RegisterScreen} />
                <Route path = '/shipping' component = {ShippingScreen} />
                <Route path = '/payment' component = {PaymentScreen} />
                <Route path = '/placeorder' component = {PlaceOrderScreen} />
                <Route path = '/order/:id' component = {OrderScreen} />
                <Route path = '/orderhistory' component = {OrderHistoryScreen} />
                <Route exact path = '/' component = {HomeScreen} /> 
              </main>
              <footer className = 'row center'>
                  All rights reserved
              </footer>
          </div>
      </div>
    </Router>
  );
}

export default App;
