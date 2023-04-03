import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';

import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import {  useContext, useEffect, useRef, useState } from 'react';
import ItemCart from '../ItemCart';
import { useStore } from '../../context/StoreContext';

const cx = classnames.bind(styles);

function Header() {
    const { cartState, setRefCart } = useContext(CartContext);
    const [listProductCart, setListProductCart] = useState([]);
    const [total, setTotal] = useState({ sumProduct: 0, sumPrice: 0 });
    const [hidenCart, setHidenCart] = useState(false);
    const { setStatusData, data } = useStore();
    const { categories } = data;
    const refCart = useRef();

    useEffect(() => {
        const totals = cartState.reduce(
            (acc, product) => {
                acc.sumProduct += product.count;
                acc.sumPrice += parseInt(product.price) * product.count;
                return acc;
            },
            {
                sumProduct: 0,
                sumPrice: 0,
            },
        );
        setTotal(totals);
        setListProductCart(cartState);
    }, [cartState]);

    useEffect(() => {
        setRefCart(refCart);
    }, [setRefCart]);

    const handleReLoad = (e) => {
        setStatusData({
            type: 'GET_ALL',
        });
    };

    const handleChangeSubcate = (e, idMainCate, idSubCate) => {
        setStatusData({
            type: 'GET_BY_MAIN_SUB',
            payload: {
                idMainCate,
                idSubCate,
            },
        });
    };

    // Cart component của header

    let Cart = (
        <div>
            {listProductCart.map((product, index) => {
                return <ItemCart key={index} product={product} />;
            })}
            <hr />
            <div className={cx('subtotal')}>
                <span>Subtotal:</span>
                <span className={cx('price')}>${total.sumPrice}.00</span>
            </div>
            <div className={cx('cart-control')}>
                <Link to={'/cart'}>
                    <button className={cx('btn-cart', 'view')}>
                        View cart
                    </button>
                </Link>
                <Link to={'/cart'}>
                    <button className={cx('btn-cart', 'checkout')}>
                        Checkout
                    </button>
                </Link>
                <Link to={'/cart'}>
                    <button className={cx('btn-cart', 'paypal')}>
                        <img
                            src="./assets/images/paypalLogo.png"
                            alt="paypal"
                        />
                    </button>
                </Link>
            </div>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('groupLeft')}>
                <Link onClick={handleReLoad} to={'/'} className={cx('logo')}>
                    Shophistic Lite
                </Link>
                <nav>
                    <ul className={cx('navigation')}>
                        {categories &&
                            categories.map((category) => (
                                <li key={category.id}>
                                    {category.name.toUpperCase()} <span></span>
                                    <ul className={cx('nav')}>
                                        {category.subcategories.map(
                                            (cate, index) => (
                                                <li
                                                    onClick={(e) =>
                                                        handleChangeSubcate(
                                                            e,
                                                            category.id,
                                                            index,
                                                        )
                                                    }
                                                    key={index}
                                                >
                                                    <Link
                                                        style={{
                                                            width: '100%',
                                                            lineHeight: '100%',
                                                            display:
                                                                'inline-block',
                                                        }}
                                                        to={'/'}
                                                    >
                                                        {cate}
                                                    </Link>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </li>
                            ))}

                        <li>BLOG</li>
                        <li>GO PRO</li>
                    </ul>
                </nav>
            </div>

            <div className={cx('groupRight')}>
                <button className={cx('btn-login')}>
                    <Link to={'/login'}>Login</Link>{' '}
                </button>{' '}
                <div ref={refCart} className={cx('btn-card')}>
                    <Link to={'/cart'}>
                        <button
                            onClick={(e) => {
                                setHidenCart(true);
                            }}
                            className={cx('btn')}
                        >
                            <span>$</span>
                            {total.sumPrice}.00{' '}
                            <span className={cx('count')}>
                                ({total.sumProduct})
                            </span>{' '}
                            <FontAwesomeIcon
                                icon={faCartPlus}
                                className={cx('icon')}
                            />
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={cx('change-icon')}
                            />
                        </button>
                    </Link>
                    {!hidenCart && (
                        <div className={cx('cart-info')}>
                            <div className={cx('cart-message')}>
                                {listProductCart.length > 0
                                    ? Cart
                                    : 'No products in the cart.'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
