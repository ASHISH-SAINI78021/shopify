import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage';
import About from './components/pages/About';
import Policy from './components/pages/Policy';
import Contact from './components/pages/Contact';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import Dashboard from './components/pages/User/Dashboard';
import PageNotFound from './components/Layout/Routes/PageNotFound';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import Private from './components/Layout/Routes/Private';
import { useAuth } from './components/context/auth';
import Admin from './components/Layout/Routes/Admin';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import CreateCategory from './components/Layout/Admin/CreateCategory';
import Product from './components/Layout/Admin/Product';
import User from './components/Layout/Admin/User';
import Info from './components/Layout/Admin/Info';
import Info2 from './components/Layout/User/Info';
import Order from './components/Layout/User/Order';
import AllProducts from './components/Layout/Admin/AllProducts';
import Update from './components/Layout/Admin/Update';
import Search from './components/pages/Search';
import Details from './components/pages/Details';
import Category from './components/pages/Category';
import CategoryProduct from './components/pages/CategoryProduct';
import Cart from './components/pages/Cart';




function App() {
  const [auth , setauth] = useAuth();
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<Details />} />
        <Route path='/category' element={<Category />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/forgotpassword/*' element={<PageNotFound page="login" />} >
          <Route path='' element={<ForgotPassword />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />


        {(auth?.user?.role === 1) ?
        <Route path='/dashboard/*' element={<Admin/>}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/add-product' element={<Product />} />
          <Route path='admin/user' element={<User />} />
          <Route path='admin/info' element={<Info/>} />
          <Route path='admin/allproducts' element={<AllProducts/>} />
          <Route path='admin/update/:id' element={<Update />} />
          <Route path='*' element={<PageNotFound />} />
        </Route> :
        <Route path='/dashboard/*' element={<Private/>}>
          <Route path='' element={<Dashboard />} />
          <Route path='user/order' element={<Order />} />
          <Route path='user/info' element={<Info2 />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
        }
        
        
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
