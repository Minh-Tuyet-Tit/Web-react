import classNames from 'classnames/bind';
import styles from './DetailProductLayout.module.scss';

import Header from '../../component/Header';
import CartContextProvider from '../../context/CartContext';
import { Outlet } from 'react-router-dom';
import StoreContextProvider from '../../context/StoreContext';
const cx = classNames.bind(styles);

function DetailProductLayout() {
    return (
        <StoreContextProvider>
            <CartContextProvider>
                <div className={cx('wrapper')}>
                    <Header />
                    <main className={cx('container')}>
                        <Outlet />
                    </main>
                    <div>footer</div>
                </div>
            </CartContextProvider>
        </StoreContextProvider>
    );
}

export default DetailProductLayout;
