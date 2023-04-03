import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { useStore } from '../../context/StoreContext';
import { useEffect, useRef, useState } from 'react';

const cx = classnames.bind(styles);

function SideBar() {
    const refUl = useRef();
    const { data, setStatusData } = useStore();
    //const [isCheck, setIsCheck] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories([...data.categories]);
    }, [data]);
    const handleChangeSubcate = (e, idMainCate, idSubCate) => {
        if (e.target.checked) {
            setStatusData({
                type: 'GET_BY_MAIN_SUB',
                payload: {
                    idMainCate,
                    idSubCate,
                },
            });
            //setIsCheck(true);
            const listInput = refUl?.current?.querySelectorAll('input');
            for (let i = 0; i < listInput.length; i++) {
                if (listInput[i] !== e.target) {
                    listInput[i].checked = false;
                }
            }
        } else {
            //setIsCheck(false);
        }
    };

    const handleChangeMainCate = (e, idMainCate) => {
        if (e.target.checked) {
            setStatusData({
                type: 'GET_BY_MAIN',
                payload: {
                    idMainCate,
                },
            });

           // setIsCheck(true);
            const listInput = refUl?.current?.querySelectorAll('input');
            for (let i = 0; i < listInput.length; i++) {
                if (listInput[i] !== e.target) {
                    listInput[i].checked = false;
                }
            }
        } else {
            //setIsCheck(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-product')}>
                <form className={cx('form-search')}>
                    <input type="text" placeholder="Search products..." />
                    <button>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>

            <div className={cx('category-product')}>
                <h4>PRODUCT CATEGORIES</h4>
                <ul ref={refUl} className={cx('main-category')}>
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <li key={category.id}>
                                <input
                                    type="checkbox"
                                    id={category.id}
                                    onChange={(e) =>
                                        handleChangeMainCate(e, category.id)
                                    }
                                />
                                <label htmlFor={category.id}>
                                    {category.name}
                                </label>
                                <ul className={cx('catrgory')}>
                                    {category.subcategories.map(
                                        (cate, index) => {
                                            return (
                                                <li key={index}>
                                                    {' '}
                                                    <input
                                                        type="checkbox"
                                                        id={`${category.id}-${index}`}
                                                        name={`${category.id}-${index}`}
                                                        onChange={(e) =>
                                                            handleChangeSubcate(
                                                                e,
                                                                category.id,
                                                                index,
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`${category.id}-${index}`}
                                                    >
                                                        {cate}
                                                    </label>
                                                </li>
                                            );
                                        },
                                    )}
                                </ul>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
