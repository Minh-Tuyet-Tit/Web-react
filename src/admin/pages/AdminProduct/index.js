import classNames from 'classnames/bind';
import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { remveProduct } from '../../../utils';
import ModalForm from '../../component/ModalForm';
import styles from './AdminProduct.module.scss';

const cx = classNames.bind(styles);

function AdminProduct() {
    const { storeState, storeDispatch } = useAdmin();
    const [showModalForm, setShowModaForm] = useState(false);
    const [currProduct, setCurrProduct] = useState(false);
    const handleAdd = (e) => {
        setShowModaForm(true);
    };

    const handleUpdate = (currProduct) => {
        setShowModaForm(true);
        setCurrProduct(currProduct);
    };

    const findCate = (id) => {
        const cate = storeState.categories.find((cate) => {
            return cate.id === id;
        });

        return cate;
    };

    const handleRemoveProduct = async (currProduct) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete the product?')) {
            try {
                const isRemove = await remveProduct(currProduct);
                if (isRemove) {
                    storeDispatch({
                        type: 'REMOVE_PRODUCT',
                        payload: {
                            id: currProduct.id,
                        },
                    });
                    alert('remove ok');
                } else {
                    alert('remove fail');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            {showModalForm && (
                <ModalForm
                    currProduct
                    setCurrProduct={setCurrProduct}
                    updateProduct={currProduct}
                    title={currProduct ? 'Update Product' : 'Add Product'}
                    show={setShowModaForm}
                />
            )}

            <h2>Product Management</h2>

            <div className={cx('inner')}>
                <div>
                    <button onClick={handleAdd} className={cx('btn-add')}>
                        Add Product
                    </button>
                </div>
                <table className={cx('table')} border="1">
                    <thead>
                        <tr>
                            <th colSpan={2}>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Date created</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeState?.products?.length > 0 &&
                            storeState?.products?.map((product, index) => (
                                <tr key={index}>
                                    <td style={{ width: 100 }}>
                                        <img
                                            src={product?.listImg[0]?.url}
                                            alt="ảnh"
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 10,
                                            }}
                                        />
                                    </td>
                                    <td className={cx('product-name')}>
                                        {product.name}
                                    </td>
                                    <td className={cx('product-cate')}>
                                        {findCate(product.idMainCate).name} /{' '}
                                        {
                                            findCate(product.idMainCate)
                                                .subcategories[
                                                product.idSubCate
                                            ]
                                        }
                                    </td>
                                    <td className={cx('product-price')}>
                                        {product.price}
                                    </td>
                                    <td className={cx('product-desc')}>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: product.description,
                                            }}
                                        ></div>
                                    </td>
                                    <td>{product.createAt}</td>
                                    <td className={cx('product-control')}>
                                        <button
                                            onClick={(e) =>
                                                handleUpdate(product)
                                            }
                                        >
                                            Update
                                        </button>{' '}
                                        <br />
                                        <button
                                            onClick={(e) => {
                                                handleRemoveProduct(product);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProduct;
