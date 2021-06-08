import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignInScreen from './screens/SignInScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';


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
                    <Route render = {({history}) => <SearchBox history={history}/>}/>
                  </div>
                  <div>
                      <Link to = '/cart'>Cart
                        {cartItems.length > 0 && (
                          <span className = 'badge'>{cartItems.length}</span>
                        )}
                      </Link>
                        {userInfo ? (
                            <div className="dropdown">
                              <Link to = '#'>
                                {userInfo.name} <i className = 'fa fa-caret-down'></i> 
                              </Link>
                              <ul className = 'dropdown-content'>
                                <li>
                                  <Link to = '/profile'>User Profile</Link>
                                </li>
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
                        {
                          userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                              <Link to = '#admin'>
                                Seller <i className = 'fa fa-caret-down'></i>
                              </Link>
                              <ul className="dropdown-content">
                                <li>
                                  <Link to = '/productlist/seller'>Products</Link>
                                </li>
                                <li>
                                  <Link to = '/orderlist/seller'>Orders</Link>
                                </li>
                              </ul>
                          </div>
                          )
                        }
                        {userInfo && userInfo.isAdmin && (
                          <div className="dropdown">
                            <Link to = '#admin'>
                              Admin <i className = 'fa fa-caret-down'></i>
                            </Link>
                            <ul className="dropdown-content">
                              <li>
                                <Link to = '/dashboard'>Dashboard</Link>
                              </li>
                              <li>
                                <Link to = '/productlist'>Products</Link>
                              </li>
                              <li>
                                <Link to = '/orderlist'>Orders</Link>
                              </li>
                              <li>
                                <Link to = '/userlist'>Users</Link>
                              </li>
                            </ul>
                          </div>
                        )}
                  </div>
              </header>
              <main>
                <Route path = '/seller/:id' component = {SellerScreen} />
                <Route path = '/cart/:id?' component = {CartScreen} />
                <Route exact path = '/product/:id' component = {ProductScreen} />
                <Route exact path = '/product/:id/edit' component = {ProductEditScreen} />
                <Route path = '/signin' component = {SignInScreen} />
                <Route path = '/register' component = {RegisterScreen} />
                <Route path = '/shipping' component = {ShippingScreen} />
                <Route path = '/payment' component = {PaymentScreen} />
                <Route path = '/placeorder' component = {PlaceOrderScreen} />
                <Route path = '/order/:id' component = {OrderScreen} />
                <Route path = '/orderhistory' component = {OrderHistoryScreen} />
                <Route path = '/search/name/:name?' component = {SearchScreen} />
                <PrivateRoute path = '/profile' component = {UserProfileScreen} />
                <AdminRoute exact path = '/productlist' component = {ProductListScreen} />
                <AdminRoute exact path = '/orderlist' component = {OrderListScreen} />
                <AdminRoute path = '/userlist' component = {UserListScreen} />
                <AdminRoute path = '/user/:id/edit' component = {UserEditScreen} />
                <SellerRoute path = '/productlist/seller' component = {ProductListScreen} />
                <SellerRoute path = '/orderlist/seller' component = {OrderListScreen} />
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
