import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import {Container} from 'react-bootstrap';
import AdminDashboard from './admin/AdminDashboard.js';
import AdminUsers from './admin/AdminUsers.js';
import AdminProducts from './admin/AdminProducts.js';
import AdminCategories from './admin/AdminCategories.js';
import AdminEditProduct from './admin/AdminEditProduct.js';
import AdminEditCategory from './admin/AdminEditCategory.js';
import AdminAddCategory from './admin/AdminAddCategory.js';
import AdminEditBanner from './admin/AdminEditBanner.js';
import AdminBanners from './admin/AdminBanners.js';
import AdminOrders from './admin/AdminOrders.js';
import ShippingPage from './pages/ShippingPage.js';
import PlaceOrderPage from './pages/PlaceOrderPage.js';
import PayNow from './pages/PayNow.js';
import MyOrders from './pages/MyOrders.js';
import SearchPage from './pages/SearchPage.js';
import AdminAddProduct from './admin/AdminAddProduct';


const App = () => {
  return (
    <Router>
     <Header />
          <main>
              <Routes>
                <Route path="/" element={<HomePage/>} exact/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="/category/:categoryId" element={<CategoryPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/shipping" element={<ShippingPage/>}/>
                <Route path="/myorders" element={<MyOrders/>}/>
                <Route path="/placeorder" element={<PlaceOrderPage/>}/>
                <Route path="/paynow" element={<PayNow/>}/>
                <Route path="/order/:id" element={<OrderPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                <Route path="/admin-users" element={<AdminUsers/>}/>
                <Route path="/admin-products" element={<AdminProducts/>}/>
                <Route path="/admin-categories" element={<AdminCategories/>}/>
                <Route path="/admin-banners" element={<AdminBanners/>}/>
                <Route path="/search/:keyword" element={<SearchPage />}/>
                <Route path="/product/:id/edit" element={<AdminEditProduct />}/>
                <Route path="/product/:id/add-category" element={<AdminAddCategory />}/>
                <Route path="/category/:id/add-product" element={<AdminAddProduct />}/>
                <Route path="/category/:id/edit" element={<AdminEditCategory />}/>
                <Route path="/banner/:id/edit" element={<AdminEditBanner />}/>
                <Route path="/admin-orders" element={<AdminOrders/>}/>
                <Route path="/category/:categoryId/page/:pageNumber" element={<CategoryPage/>} exact/>
                
              </Routes>
          </main>
        <Footer />
      </Router>
  );
}

export default App;
