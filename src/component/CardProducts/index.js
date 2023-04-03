import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartPlus,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './CardProducts.module.scss';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const cx = classnames.bind(styles);

function CardProducts({ product }) {
    const { dispatch, refCart } = useContext(CartContext);
    const refProduct = useRef();
    const [state, setState] = useState(false);
    const [showBtnViewcart, setShowBtnViewCart] = useState(false);
  

    
    const handleAddProduct = (e) => {
        setState(true);
        setShowBtnViewCart(true);
        const posisonCart = refCart.current.getBoundingClientRect();
        const posisonProduct = refProduct.current.getBoundingClientRect();
        const xTranlate = parseInt(
            posisonCart.x - posisonProduct.x - 300 * 0.1,
        );
        const yTranlate = parseInt(
            posisonCart.y - posisonProduct.y - 300 * 0.5,
        );
        refProduct.current.style.transform = `translate(${xTranlate}px, ${yTranlate}px) scale(0.1)`;
        refProduct.current.style.opacity = 1;
        refProduct.current.style.transition = 'transform 1s linear';
        refProduct.current.style.zIndex = 99;

        setTimeout(() => {
            refProduct.current.style.transform = '';
            refProduct.current.style.transition = 'none';
            refProduct.current.style.opacity = 0;
            refCart.current.style.transform = 'scale(1.2)';
            refProduct.current.style.zIndex = 0;

            setTimeout(() => {
                refCart.current.style.transform = '';
            }, 200);
            setState(false);

            dispatch({
                type: 'ADD',
                payload: {
                    name: product.name,
                    price: product.price,
                    urlImage: product.listImg[0].url,
                    id: product.id
                },
            });
        }, 1200);
    };
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card-img')}>
                <Link to={`/product/:${product?.id}`}>
                    <img
                        className={cx('main-img')}
                        src={product.listImg && product?.listImg[0].url}
                        alt="product"
                    />
                    <img
                        className={cx('hover-img')}
                        src={product.listImg && product.listImg[1].url}
                        alt="product"
                    />
                    <img
                        ref={refProduct}
                        className={cx('AddtoCart')}
                        src={product.listImg && product?.listImg[0].url}
                        alt="product"
                    />
                </Link>
                <div className={cx('control-btn')}>
                    <button
                        onClick={handleAddProduct}
                        className={cx(
                            'cart-icon',
                            state === true ? 'Added' : '',
                        )}
                    >
                        {showBtnViewcart ? (
                            <FontAwesomeIcon icon={faCheck} />
                        ) : (
                            <FontAwesomeIcon icon={faCartPlus} />
                        )}
                    </button>
                    {showBtnViewcart && (
                        <Link to={'/cart'}>
                            <button className={cx('btn-viewcart')}>
                                View cart
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            <div className={cx('card-content')}>
                <h5>{product.subCate}</h5>
                <p className={cx('title')}>{product.name}</p>
                <span className={cx('price')}>${product.price}.00</span>
            </div>
        </div>
    );
}

export default CardProducts;
