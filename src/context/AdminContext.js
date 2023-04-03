import { onAuthStateChanged } from 'firebase/auth';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase/config';
import { adminReducer, adminStoresReducer } from '../reducer/adminReducer';
import { getCatrgory, getProducts } from '../utils';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

function AdminContextProvider({ children }) {
    const [adminState, dispatch] = useReducer(adminReducer, {
        loading: true,
        isAuthenticate: false,
        data: null,
    });

    const [storeState, storeDispatch] = useReducer(adminStoresReducer, {
        categories: [],
        products: [],
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        const getStore = async () => {
            try {
                const categories = await getCatrgory();
                const products = await getProducts();

                if (categories || products) {
                    storeDispatch({
                        type: 'GETSTORE',
                        payload: {
                            ...storeState,
                            categories: categories || [],
                            products: products || [],
                        },
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getStore();
    }, []);

    useEffect(() => {
        const destroy = async () => {
            try {
                await onAuthStateChanged(auth, (data) => {
                    if (data) {
                        dispatch({
                            type: 'SETADMIN',
                            payload: {
                                loading: false,
                                isAuthenticate: true,
                                data: data,
                            },
                        });
                        //navigate('/admin/dashboard');
                    } else {
                        dispatch({
                            type: 'SETADMIN',
                            payload: {
                                loading: true,
                                isAuthenticate: false,
                                data: data,
                            },
                        });
                        navigate('/admin');
                    }
                });
            } catch (error) {
                console.log('lỗi hệ thống', error);
            }
        };

        return () => {
            destroy();
        };
    }, [navigate]);

    const adminData = {
        adminState,
        dispatch,
        storeState,
        storeDispatch,
        loading,
    };
    return (
        <AdminContext.Provider value={adminData}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;
