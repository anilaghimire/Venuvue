import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 

import Homepage from './pages/Homepage';
import Registerpage from './pages/Registerpage';
import Navbar from './components/Navbar';

import ProductDetail from './pages/ProductDetail';




import LoginPage from './pages/loginpage';
import Admindashboard from './pages/AdminDashboard';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminBookings from './pages/admin/AdminBooking.jsx';
import CartItems from './pages/admin/CartItem.jsx';
import AdminRoutes from './protected/AdminRoutes';
import UserRoutes from './protected/UserRoutes';
import FeaturePage from './pages/admin/Featurepage';
import Cart from './pages/cart/cart';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings.jsx';
import ListingPage from './pages/ListingPage';
import FAQPage from './pages/FAQ.jsx';



// for showing toast messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './pages/forgetPassword.jsx';
import ResetPassword from './pages/ResestPassword.jsx';


function App() {
  return (
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
         <Route path = "/" element = {<Homepage/>}/>   {/* //landing page and home */}
        <Route path = '/register' element = {<Registerpage></Registerpage>}/>
        <Route path = '/login' element = {<LoginPage></LoginPage>}/>
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path="/cartpage" element={<Cart/>} />
        <Route path='/profile'element={<Profile/>} />
        <Route path="/booking" element={<Booking></Booking>} />
        <Route path="/mybookings" element={<MyBookings/>} />
        <Route path="/listingpage" element={<ListingPage/>}/>
        <Route path = '/faq' element={<FAQPage/>}/>
        <Route path = '/forgot-password' element={<ForgetPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        
       
        

        <Route element={<UserRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        <Route path = '/admindashboard' element = {<Admindashboard> </Admindashboard>}/>
        <Route element={<AdminRoutes/>}>

        <Route path="/admin/cart" element={<CartItems />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />

        <Route element= {<UserRoutes/>}>
          <Route path='/feature' element = {<FeaturePage/>}/>
        </Route>
       
        
        <Route path = '/admin/edit/:id' element={<AdminEditProduct/>}/>
        


        </Route>
      </Routes>
    </Router>
  );
}

export default App;