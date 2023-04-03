import { createContext, useContext, useEffect, useState } from 'react';
import {
    getCatrgory,
    getProducts,
    getProductsByMainAndSubCate,
    getProductsByMainCate,
} from '../utils';

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

function StoreContextProvider({ children }) {
    const [data, setData] = useState({
        products: [],
        categories: [],
    });

    const [statusData, setStatusData] = useState({
        type: 'GET_ALL',
        payload: {
            idMainCate: '',
            idSubCate: '',
        },
    });

    const [loading, setLoading] = useState(false)
    useEffect(() => {

        setLoading(true)
        const getAllData = async () => {
            try {
                const products = await getProducts();
                const categories = await getCatrgory();
                setData({
                    products,
                    categories,
                });
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        };

        const getDataByMainCate = async () => {
            try {
                const products = await getProductsByMainCate(
                    statusData.payload.idMainCate,
                );
                const categories = await getCatrgory();
                setData({
                    products,
                    categories,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const getDataByMainCateAndSubCate = async () => {
            try {
                const products = await getProductsByMainAndSubCate(
                    statusData.payload.idMainCate,
                    statusData.payload.idSubCate,
                );
                const categories = await getCatrgory();
                setData({
                    products,
                    categories,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (statusData.type === 'GET_ALL') {
            getAllData();
        } else if (statusData.type === 'GET_BY_MAIN') {
            getDataByMainCate();
        } else if (statusData.type === 'GET_BY_MAIN_SUB') {
            getDataByMainCateAndSubCate();
        }
    }, [statusData]);

    const storeData = { data, statusData, setStatusData, loading, setData };

    return (
        <StoreContext.Provider value={storeData}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
