import React, { useEffect, useState } from 'react';
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
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';


function App() {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productCategoryList = useSelector(state => state.productCategoryList);
  const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch])

  return (
    <Router>
      <div className="app">
        <div className = 'grid-container'>
              <header className = 'row'>
                  <div className = 'brand'>
                      <button 
                        type = 'button' 
                        className = 'open-sidebar' 
                        onClick = {() => setSidebarIsOpen(true)}
                      >
                        <i className = 'fa fa-bars'></i>
                      </button>
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
                              <li>
                                <Link to = '/support'>Support</Link>
                              </li>
                            </ul>
                          </div>
                        )}
                  </div>
              </header>
              <aside className = {sidebarIsOpen ? 'open' : ''}>
                <ul className = 'categories'>
                  <li>
                    <strong>Categories</strong>
                    <button onClick = {() => setSidebarIsOpen(false)} className = 'close-sidebar' type = 'button'>
                      <i className = 'fa fa-close'></i>
                    </button>
                  </li>
                  {loadingCategories ? (<LoadingBox />
                    ) : errorCategories ? (
                    <MessageBox variant = 'danger'>{errorCategories}</MessageBox>
                    ) : (
                    <ul>
                        {categories.map(c => (
                            <li key={c}>
                                <Link 
                                  to = {`/search/category/${c}`}
                                  onClick = {() => setSidebarIsOpen(false)}
                                >
                                    {c}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    )}
                </ul>
              </aside>
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
                <Route exact path = '/search/name/:name?' component = {SearchScreen} />
                <Route exact path = '/search/category/:category' component = {SearchScreen} />
                <Route exact path = '/search/category/:category/name/:name' component = {SearchScreen} />
                <Route exact path = '/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber' component = {SearchScreen} />
                <PrivateRoute path = '/profile' component = {UserProfileScreen} />
                <AdminRoute exact path = '/productlist' component = {ProductListScreen} />
                <AdminRoute exact path = '/dashboard' component = {DashboardScreen} />
                <AdminRoute exact path = '/productlist/pageNumber/:pageNumber' component = {ProductListScreen} />
                <AdminRoute exact path = '/orderlist' component = {OrderListScreen} />
                <AdminRoute path = '/userlist' component = {UserListScreen} />
                <AdminRoute path = '/user/:id/edit' component = {UserEditScreen} />
                <AdminRoute path = '/support' component = {SupportScreen} />
                <SellerRoute path = '/productlist/seller' component = {ProductListScreen} />
                <SellerRoute path = '/orderlist/seller' component = {OrderListScreen} />
                <Route exact path = '/' component = {HomeScreen} /> 
              </main>
              <footer className = 'row center'>
                {userInfo && !userInfo.isAdmin && <ChatBox userInfo = {userInfo} />}
                All rights reserved
              </footer>
          </div>
      </div>
    </Router>
  );
}

export default App;
