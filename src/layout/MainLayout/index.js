import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import CartContextProvider from '../../context/CartContext';
import styles from './MainLayout.module.scss';
import StoreContextProvider from '../../context/StoreContext';

const cx = classNames.bind(styles);

function MainLayout() {
    return (
        <StoreContextProvider>
            <CartContextProvider>
                <div className={cx('wrapper')}>
                    <Header />
                    <div className={cx('container')}>
                        <SideBar />
                        <Outlet />
                        {/* <Content /> */}
                    </div>
                    <div>footer</div>
                </div>
            </CartContextProvider>
        </StoreContextProvider>
    );
}

export default MainLayout;
