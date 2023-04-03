import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import Cart from './pages/Cart';
import DetailProductLayout from './layout/DetailProductLayout';
import HomeAdmin from './admin/pages/HomeAdmin';
import LoginAdmin from './admin/pages/LoginAdmin';
import Dashboard from './admin/pages/Dashboard';
import Category from './admin/pages/Category';
import AdminProduct from './admin/pages/AdminProduct';
import Product from './pages/Product'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/product" element={<DetailProductLayout />}>
                <Route path="/product/:id" element={<Product />} />
            </Route>
                <Route path="/admin" element={<HomeAdmin />}>
                    <Route path="/admin" element={<LoginAdmin />} />

                    <Route path="/admin/dashboard" element={<Dashboard />}>
                        <Route path="/admin/dashboard" element={<Category />} />
                        <Route
                            path="/admin/dashboard/product"
                            element={<AdminProduct/>}
                        />
                    </Route>
                </Route>
            {/* <Route path="/*" element={<h1>404</h1>} /> */}
        </Routes>
    );
}

export default App;
