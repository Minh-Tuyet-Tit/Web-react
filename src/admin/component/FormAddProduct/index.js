import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import styles from './FormAddProduct.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addProduct, imgProcess, updatesProduct } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FormAddProduct({ show, updateProduct, setCurrProduct }) {
    const { storeState, storeDispatch } = useAdmin();
    const [valueMainCate, setValueMainCate] = useState(0);
    const [valueSubCate, setValueSubCate] = useState(0);
    const [valueDesc, setValueDesc] = useState('');
    const [listUrl, setListUrl] = useState([]);
    const [valueNamePrice, setValueNamePrice] = useState({
        name: '',
        price: '',
    });
    const [message, setMessage] = useState({
        name: '',
        price: '',
    });

    useEffect(() => {
        if (updateProduct) {
            setValueDesc(updateProduct.description);
            setValueNamePrice({
                name: updateProduct.name,
                price: updateProduct.price,
            });
            setListUrl(updateProduct.listImg);
        } else {
            setValueDesc('');
            setValueNamePrice({
                name: '',
                price: '',
            });
            setListUrl([]);
        }
    }, [updateProduct]);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        file.id = file.name + Date.now().toString();
        try {
            const url = await imgProcess(file)
            if(url){
                setListUrl([...listUrl, {url, id: file.id}]);
            }
        } catch (error) {
            console.log(error);
        }
        e.target.value = null;
    };

    const handleChangeValueNamePrice = (e) => {
        setValueNamePrice({
            ...valueNamePrice,
            [e.target.name]: e.target.value,
        });
    };


    const handleAddProduct = async () => {
        if (
            storeState.categories.length > 0 
        ) {
            if (!valueNamePrice.name) {
                setMessage({
                    ...message,
                    name: 'Vui lòng nhập tên sản phẩm',
                });
            } else if (!valueNamePrice.price) {
                setMessage({
                    ...message,
                    price: 'Vui lòng nhập giá sản phẩm',
                });
            }
            setTimeout(() => {
                setMessage({
                    ...message,
                    name: '',
                    price: '',
                });
            }, 3000);

            if (valueNamePrice.name && valueNamePrice.price) {
                const product = {
                    ...valueNamePrice,
                    idMainCate: storeState.categories[valueMainCate]?.id,
                    idSubCate: valueSubCate,
                    listImg: listUrl,
                    description: valueDesc,
                };
                try {
                    const isAdd = await addProduct(product);
                    if (isAdd) {
                        storeDispatch({
                            type: 'ADD_PRODUCT',
                            payload: product,
                        });
                        setCurrProduct(false);
                        alert('add ok');
                    } else {
                        alert('add fail');
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    show(false);
                }
            } else {
                
                return;
            }
        } else {
            return;
        }
    };


    const handleUpdate = async () => {
        if (!valueNamePrice.name) {
            setMessage({
                ...message,
                name: 'Vui lòng nhập tên sản phẩm',
            });
        } else if (!valueNamePrice.price) {
            setMessage({
                ...message,
                price: 'Vui lòng nhập giá sản phẩm',
            });
        }

        setTimeout(() => {
            setMessage({
                ...message,
                name: '',
                price: '',
            });
        }, 3000);

        if (valueNamePrice.name && valueNamePrice.price) {
            const product = {
                ...valueNamePrice,
                idMainCate: storeState.categories[valueMainCate]?.id,
                idSubCate: valueSubCate,
                listImg: listUrl,
                description: valueDesc,
            };
            try {
                const isUpdate = await updatesProduct(
                    product,
                    updateProduct.id,
                );
                if (isUpdate) {
                    storeDispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: {
                            ...product,
                            id: updateProduct.id,
                        },
                    });
                    alert('update ok');
                } else {
                    alert('update fail');
                }
            } catch (error) {
                console.log(error);
            } finally {
                show(false);
            }
        } else {
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-control')}>
                <label htmlFor="name">Name product</label> <br />
                <input
                    value={valueNamePrice.name}
                    onChange={handleChangeValueNamePrice}
                    type={'text'}
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                />
                <p style={{ color: 'red' }}>{message.name}</p>
            </div>
            <div className={cx('form-control')}>
                <label htmlFor="price">Price product</label> <br />
                <input
                    value={valueNamePrice.price}
                    onChange={handleChangeValueNamePrice}
                    type={'number'}
                    id="price"
                    name="price"
                    placeholder="Enter product price"
                />
                <p style={{ color: 'red' }}>{message.price}</p>
            </div>
            <div className={cx('form-control')}>
                <label htmlFor="desc">Description</label> <br />
                <ReactQuill
                    id="desc"
                    theme={'snow'}
                    value={valueDesc}
                    onChange={setValueDesc}
                />
            </div>

            <div className={cx('product-category')}>
                <div className={cx('main-cate')}>
                    <label htmlFor="main-cate">Main category</label> <br />
                    <select
                        id="main-cate"
                        value={valueMainCate}
                        onChange={(e) => {
                            setValueMainCate(e.target.value);
                            setValueSubCate(0);
                        }}
                    >
                        {storeState?.categories &&
                            storeState?.categories?.map((cate, index) => {
                                return (
                                    <option key={index} value={index}>
                                        {cate.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className={cx('sub-cate')}>
                    <label htmlFor="sub-cate">Sub category</label> <br />
                    {storeState.categories[valueMainCate]?.subcategories
                        ?.length > 0 && (
                        <select
                            id="sub-cate"
                            value={valueSubCate}
                            onChange={(e) => setValueSubCate(e.target.value)}
                        >
                            {storeState?.categories[valueMainCate]
                                .subcategories &&
                                storeState.categories[
                                    valueMainCate
                                ].subcategories.map((cate, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {cate}
                                        </option>
                                    );
                                })}
                        </select>
                    )}
                </div>
            </div>
            <div className={cx('listImg')}>
                {listUrl.map((url, index) => (
                    <img
                        key={index}
                        src={url.url}
                        alt="ảnh"
                        style={{ width: 100, marginRight: 5 }}
                    />
                ))}
            </div>
            <div className={cx('upload-img')}>
                <div>
                    <p className={cx('icon')}>
                        <FontAwesomeIcon icon={faFileArrowUp} />
                    </p>
                    <p>Add Images Product</p>
                </div>
                <input
                    type={'file'}
                    accept=".jpeg,.png,.gif,.jpg"
                    onChange={handleChange}
                />
            </div>

            <div className={cx('control')}>
                <button
                    onClick={() => {
                        show(false);
                        if (setCurrProduct) {
                            setCurrProduct(false);
                        }
                    }}
                >
                    Close
                </button>
                {updateProduct ? (
                    <button onClick={handleUpdate}>Update</button>
                ) : (
                    <button onClick={handleAddProduct}>Add</button>
                )}
            </div>
        </div>
    );
}

export default FormAddProduct;
