import classnames from 'classnames/bind';
import styles from './Product.module.scss';

import { Link, useParams } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Loading from '../../component/Loading';
import { getProductById, getProductsByMainAndSubCate } from '../../utils';
import CardProducts from '../../component/CardProducts';
const cx = classnames.bind(styles);

function Product() {
    const { id } = useParams();
    const mainImgref = useRef();
    const [loading, setLoading] = useState(false);
    const [currProduct, setCurrProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const { data } = useStore();

    const findCate = (id) => {
        if (data.categories.length > 0) {
            const cate = data.categories.find((cate) => {
                return cate.id === id;
            });

            return cate;
        } else return '';

    };

    useEffect(() => {
        setLoading(true);
        const getProduct = async () => {
            try {
                const product = await getProductById(id.split(':')[1]);
                if (product) {
                    setCurrProduct({
                        ...product,
                    });

                    try {
                        const data = await getProductsByMainAndSubCate(
                            product.idMainCate,
                            product.idSubCate,
                        );
                        if (data) {
                            setRelatedProduct(data);
                        }
                    } catch (error) {}
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) {
        return <Loading />;
    }
    console.log(currProduct);
    console.log(relatedProduct);
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title')}>
                <p>
                    <Link to={'/'}> Home </Link> /{' '}
                    {data.categories.length > 0 &&
                        findCate(currProduct.idMainCate).name}
                    {''} / {''}
                    {data.categories.length > 0 &&
                        findCate(currProduct.idMainCate).subcategories[
                            currProduct.idSubCate
                        ]}
                    / {currProduct.name}
                </p>
            </div>
            <div className={cx('inner')}>
                <div className={cx('detail-img')}>
                    <div className={cx('listImg')}>
                        {currProduct?.listImg &&
                            currProduct.listImg.map((img, index) => (
                                <img
                                    key={index}
                                    onMouseOver={(e) => {
                                        mainImgref.current.src = e.target.src;
                                    }}
                                    src={img.url}
                                    alt={currProduct.name}
                                />
                            ))}
                    </div>

                    <div className={cx('main-img', 'slide')}>
                        <img
                            ref={mainImgref}
                            src={
                                currProduct?.listImg &&
                                currProduct?.listImg[0]?.url
                            }
                            alt="ảnh"
                        />
                    </div>
                </div>
                <div className={cx('detail-product')}>
                    <p className={cx('product-cate')}>
                        {findCate(currProduct.idMainCate) &&
                            findCate(currProduct.idMainCate).subcategories[
                                currProduct.idSubCate
                            ]}
                    </p>
                    <p className={cx('product-star')}>Star</p>
                    <h1 className={cx('product-name')}>{currProduct.name}</h1>
                    <p className={cx('product-price')}>
                        {' '}
                        ${currProduct.price}.00
                    </p>
                    <div className={cx('add-to-cart')}>
                        {' '}
                        <input type={'number'} min={0} />{' '}
                        <button>Add to cart</button>
                    </div>
                    <div
                        className={cx('product-des')}
                        dangerouslySetInnerHTML={{
                            __html: currProduct.description,
                        }}
                    ></div>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {relatedProduct.length > 0 && data.categories.length>0 &&
                    relatedProduct.map((product, index) => {
                        product.subCate = findCate(
                            product.idMainCate,
                        )?.subcategories[product.idSubCate];
                        return <CardProducts key={index} product={product} />;
                    })}
                <CardProducts product={currProduct} />
                <CardProducts product={currProduct} />
                <CardProducts product={currProduct} />
                <CardProducts product={currProduct} />
                <CardProducts product={currProduct} />
            </div>
        </div>
    );
}

export default Product;
