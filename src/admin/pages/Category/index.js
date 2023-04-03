import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Category.module.scss';

import {  removeSubCategory } from '../../../utils';
import Loading from '../../../component/Loading';
import ModalForm from '../../component/ModalForm';
import { useAdmin } from '../../../context/AdminContext';

const cx = classNames.bind(styles);

function Category() {
    const { storeState ,loading } = useAdmin();
    const [categories, setCategories] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [showModalForm, setShowModaForm] = useState(false);
    const [currCate, setCurrCate] = useState('');

    useEffect(() => {
        setCategories([...storeState.categories]);
    }, [storeState]);

    const handleAdd = (e) => {
        setShowModaForm(true);
        setCurrCate('mainCate');
    };

    const handleRemove = async (category, indexMainCate, indexSubCate) => {
        //setLoading(true);
        try {
            const isRemove = await removeSubCategory(category, indexSubCate);
            if (isRemove) {
                alert('Removed');

                let newArr = categories.map((category) => {
                    return {
                        ...category,
                        subcategories: [...category.subcategories] || [],
                    };
                });
                const newSubCate = category?.subcategories?.filter(
                    (cate, index) => index !== indexSubCate,
                );

                newArr[indexMainCate].subcategories = [...newSubCate] || [];
                setCategories(newArr);
            }
        } catch (error) {
            console.log(error);
        } finally {
            //setLoading(false);
        }
    };
    
    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            {showModalForm && (
                <ModalForm
                    currCate={currCate}
                    title={
                        currCate === 'mainCate'
                            ? 'Add MainCategory'
                            : 'Add SubCatrgory'
                    }
                    show={setShowModaForm}
                />
            )}

            <h2>Catalog management</h2>
            <div className={cx('inner')}>
                <div>
                    <button onClick={handleAdd} className={cx('btn-add')}>
                        Add category
                    </button>
                </div>

                <table className={cx('table')} border="1">
                    <thead>
                        <tr>
                            <th>Catrgory</th>
                            <th>SubCatrgory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((dt, index) => (
                                <tr key={index}>
                                    <td className={cx('main-category')}>
                                        {dt?.name}
                                    </td>
                                    <td className={cx('sub-category')}>
                                        <ul>
                                            {dt?.subcategories &&
                                                dt?.subcategories.map(
                                                    (sct, id) => (
                                                        <li key={id}>
                                                            <span>{sct}</span>
                                                            <div
                                                                className={cx(
                                                                    'control',
                                                                )}
                                                            >
                                                                <button
                                                                    className={cx(
                                                                        'btn-control',
                                                                        'delete',
                                                                    )}
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        handleRemove(
                                                                            dt,
                                                                            index,
                                                                            id,
                                                                        );
                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>{' '}
                                                                <button
                                                                    className={cx(
                                                                        'btn-control',
                                                                        'update',
                                                                    )}
                                                                >
                                                                    Update
                                                                </button>{' '}
                                                            </div>
                                                        </li>
                                                    ),
                                                )}
                                        </ul>

                                        <button
                                            onClick={(e) => {
                                                setShowModaForm(true);
                                                setCurrCate(dt);
                                            }}
                                            className={cx('btn-control', 'add')}
                                        >
                                            Add
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

export default Category;
