import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { addMainCategory, addSubCategory } from '../../../utils';
import FormAddProduct from '../FormAddProduct';
import styles from './ModalForm.module.scss';

const cx = classNames.bind(styles);

function ModalForm({
    show,
    title,
    currCate,
    currProduct,
    updateProduct,
    setCurrProduct,
}) {
    const [value, setValue] = useState('');

    const [showMessage, setShowMessage] = useState('');
    const { storeState, storeDispatch } = useAdmin();
    const { categories } = storeState;
    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            show(false);

            if (setCurrProduct) {
                setCurrProduct(false);
            }
        } else return;
    };

    const handleAddCategory = async () => {
        if (!value) {
            setShowMessage('please enter category name');
            setTimeout(() => {
                setShowMessage('');
            }, 5000);
            return;
        } else if (currCate === 'mainCate') {
            if (categories?.some((cate) => cate.name === value)) {
                setShowMessage('Category name already exists');
                setTimeout(() => {
                    setShowMessage('');
                }, 5000);
                return;
            } else {
                try {
                    const isAdd = await addMainCategory(value);
                    if (isAdd) {
                        alert('Add success');
                        show(false);
                        storeDispatch({
                            type: 'ADD_MAIN_CATE',
                            payload: {
                                name: value,
                                id: isAdd,
                            },
                        });
                    } else {
                        alert('Add failure');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            if (currCate?.subcategories?.includes(value)) {
                setShowMessage('Category name already exists');
                setTimeout(() => {
                    setShowMessage('');
                }, 5000);
                return;
            } else {
                try {
                    const isAdd = await addSubCategory(currCate, value);
                    if (isAdd) {
                        alert('Add success');
                        show(false);
                    } else {
                        alert('Add failure');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    return (
        <div onClick={handleClose} className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <h2>{title}</h2>

                    <button
                        onClick={(e) => {
                            show(false);
                            if (setCurrProduct) {
                                setCurrProduct(false);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

                {/* form add sub category */}
                {currCate && (
                    <div className={cx('main-form')}>
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type={'text'}
                            placeholder={
                                currCate === 'mainCate'
                                    ? 'Name MainCategory'
                                    : 'Name SubCategory'
                            }
                        />
                        <p style={{ color: 'red' }}>{showMessage}</p>
                        <button
                            onClick={handleAddCategory}
                            className={cx('btn-add')}
                        >
                            Add
                        </button>
                    </div>
                )}

                {/* form add product */}

                {currProduct && (
                    <FormAddProduct
                        updateProduct={updateProduct}
                        setCurrProduct={setCurrProduct}
                        currProduct={currProduct}
                        show={show}
                    />
                )}
            </div>
        </div>
    );
}

export default ModalForm;
