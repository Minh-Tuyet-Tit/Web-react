import {  Outlet } from 'react-router-dom';
import AdminContextProvider from '../../../context/AdminContext';

function HomeAdmin() {

    return (
        <AdminContextProvider>
            <Outlet />
        </AdminContextProvider>
    );
}

export default HomeAdmin;
