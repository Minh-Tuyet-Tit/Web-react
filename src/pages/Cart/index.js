import {
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import classnames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);
function Cart() {
    const { cartState, dispatch } = useContext(CartContext);
    const [value, setValue] = useState(() => {
        const initValue = {};
        for (let i = 0; i < cartState.length; i++) {
            initValue[cartState[i].name] = cartState[i].count;
        }
        return initValue;
    });

    const [message, setMessage] = useState('');
    const [currProduct, setCurrProduct] = useState();
    //xử lý xóa sản phẩm trong giao diện
    const handleRemoveProduct = (product) => {
        dispatch({
            type: 'REMOVE',
            payload: product,
        });

        setMessage((prew) => {
            prew = `"${product.name}" removed  `;
            return prew;
        });

        setCurrProduct(product);
    };

    // xử lý input
    const handleChange = (e, product) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });

        dispatch({
            type: 'ADD',
            payload: {
                ...product,
                count: 1,
            },
        });
    };

    //xử lý undo

    const handleUndo = () => {
        dispatch({
            type: 'ADD',
            payload: currProduct,
        });

        setMessage('');
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('page-title')}>Cart</h1>

            <div className={cx('cart-inner')}>
                {message && (
                    <div className={cx('message')}>
                        {' '}
                        <span className={cx('message-icon')}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </span>
                        {message}
                        <span onClick={handleUndo} className={cx('undo')}>
                            Undo?
                        </span>
                    </div>
                )}

                {cartState.length === 0 && (
                    <Fragment>
                        {' '}
                        <div className={cx('cart-emty')}>
                            <span>Your cart is currently empty.</span>
                        </div>
                    </Fragment>
                )}

                {/* đây là đoạn table */}
                {cartState.length > 0 && (
                    <Fragment>
                        <table className={cx('cart-table')} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th className={cx('product-remove')}>
                                        &nbsp;
                                    </th>
                                    <th className={cx('product-thumbnail')}>
                                        &nbsp;
                                    </th>
                                    <th className={cx('product-name')}>
                                        Product
                                    </th>
                                    <th className={cx('product-price')}>
                                        Price
                                    </th>
                                    <th className={cx('product-quantity')}>
                                        Quantity
                                    </th>
                                    <th className={cx('product-subtotal')}>
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartState.map((product, index) => (
                                    <Fragment key={index}>
                                        <tr>
                                            <td
                                                className={cx('product-remove')}
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        handleRemoveProduct(
                                                            product,
                                                        );
                                                    }}
                                                    className={cx('btn-remove')}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCircleXmark}
                                                    />
                                                </button>
                                            </td>
                                            <td
                                                className={cx(
                                                    'product-thumbnail',
                                                )}
                                            >
                                                <img
                                                    src={product.urlImage}
                                                    alt="ảnh"
                                                />
                                            </td>
                                            <td className={cx('product-name')}>
                                                {product.name}
                                            </td>
                                            <td className={cx('product-price')}>
                                                <span>${product.price}.00</span>
                                            </td>
                                            <td
                                                className={cx(
                                                    'product-quantity',
                                                )}
                                            >
                                                <input
                                                    value={value[product.name]}
                                                    name={product.name}
                                                    onChange={(e) => {
                                                        handleChange(
                                                            e,
                                                            product,
                                                        );
                                                    }}
                                                    type={'number'}
                                                    min={0}
                                                />
                                            </td>
                                            <td
                                                className={cx(
                                                    'product-subtotal',
                                                )}
                                            >
                                                {' '}
                                                <span>
                                                    $
                                                    {parseInt(product.price) *
                                                        value[product.name]}
                                                    .00
                                                </span>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}

                                <tr>
                                    <td colSpan={6}>
                                        <div className={cx('action')}>
                                            <div className={cx('coupon')}>
                                                <input type={'text'} />
                                                <button>Apply coupon</button>
                                            </div>

                                            <button
                                                className={cx('btn-updateCart')}
                                            >
                                                Update cart
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Fragment>
                )}

                {/* end table */}
                {cartState.length === 0 && (
                    <Link to={'/'}>
                        <div className={cx('return-shop')}>Return to shop</div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Cart;
