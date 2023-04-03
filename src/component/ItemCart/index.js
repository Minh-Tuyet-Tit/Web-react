import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './ItemCart.module.scss';

const cx = classnames.bind(styles);

function ItemCart({ product }) {
    const { dispatch } = useContext(CartContext);
    const handleRemoveProduct = (e) => {
        dispatch({
            type: 'REMOVE',
            payload: product,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <button onClick={handleRemoveProduct} className={cx('remove-item')}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>

            <div className={cx('product-list')}>
                <img src={product.urlImage} alt='ảnh' />
                <p className={cx('name-product')}>{product.name}</p>
            </div>
            <p className={cx('amount')}>
                {product.count} x ${product.price}.00
            </p>
        </div>
    );
}

export default ItemCart;
