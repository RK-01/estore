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
import AboutPage from './pages/AboutPage';
import ReturnPage from './pages/ReturnPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import TermsOfUse from './pages/TermsOfUse';
import AdminDashboard from './admin/AdminDashboard.js';
import AdminOneOrder from './admin/AdminOneOrder.js';
import AdminUsers from './admin/AdminUsers.js';
import AdminProducts from './admin/AdminProducts.js';
import AdminCategories from './admin/AdminCategories.js';
import AdminEditProduct from './admin/AdminEditProduct.js';
import AdminEditCategory from './admin/AdminEditCategory.js';
import AdminAddCategory from './admin/AdminAddCategory.js';
import AdminEditBanner from './admin/AdminEditBanner.js';
import AdminBanners from './admin/AdminBanners.js';
import AdminStores from './admin/AdminStores.js';
import AdminOrders from './admin/AdminOrders.js';
import ShippingPage from './pages/ShippingPage.js';
import PlaceOrderPage from './pages/PlaceOrderPage.js';
import PayNow from './pages/PayNow.js';
import MyOrders from './pages/MyOrders.js';
import SearchPage from './pages/SearchPage.js';
import AdminAddProduct from './admin/AdminAddProduct.js';
import SellerDashboard from './seller/SellerDashboard.js';
import SellerProducts from './seller/SellerProducts.js';
import SellerStore from './seller/SellerStore.js';
import SellerStoreEdit from './seller/SellerStoreEdit.js';
import SellerOneProduct from './seller/SellerOneProduct.js';
import AdminOneStore from './admin/AdminOneStore.js';
import AdminOneStoreProducts from './admin/AdminOneStoreProducts';
import AdminOneStoreOrders from './admin/AdminOneStoreOrders';
import AdminOneStorePayments from './admin/AdminOneStorePayments';
import AdminOneSellerOrder from './admin/AdminOneSellerOrder';


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
                <Route path="/aboutus" element={<AboutPage/>}/>
                <Route path="/return" element={<ReturnPage/>}/>
                <Route path="/privacy" element={<PrivacyPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/termsofuse" element={<TermsOfUse/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/shipping" element={<ShippingPage/>}/>
                <Route path="/myorders" element={<MyOrders/>}/>
                <Route path="/placeorder" element={<PlaceOrderPage/>}/>
                <Route path="/paynow" element={<PayNow/>}/>
                <Route path="/order/:id" element={<OrderPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                <Route path="/seller-dashboard" element={<SellerDashboard/>}/>
                <Route path="/seller-products" element={<SellerProducts/>}/>
                <Route path="/seller-product/:id" element={<SellerOneProduct/>}/>
                <Route path="/seller-store" element={<SellerStore/>}/>
                <Route path="/admin-stores" element={<AdminStores/>}/>
                <Route path="/store/:id/edit" element={<SellerStoreEdit/>}/>
                <Route path="/admin-store/:id/detail" element={<AdminOneStore/>}/>
                <Route path="/admin-store/:id/products" element={<AdminOneStoreProducts/>}/>
                <Route path="/admin-store/:id/orders" element={<AdminOneStoreOrders/>}/>
                <Route path="/admin-store/:id/order" element={<AdminOneSellerOrder/>}/>
                <Route path="/admin-store/:id/payment" element={<AdminOneStorePayments/>}/>
                <Route path="/admin-users" element={<AdminUsers/>}/>
                <Route path="/admin-products" element={<AdminProducts/>}/>
                <Route path="/admin-order/:id" element={<AdminOneOrder/>}/>
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
