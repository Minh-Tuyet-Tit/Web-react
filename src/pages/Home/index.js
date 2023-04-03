import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import CardProducts from '../../component/CardProducts';

import styles from './Home.module.scss';
import { useStore } from '../../context/StoreContext';
import Loading from '../../component/Loading';

const cx = classnames.bind(styles);

function Home() {
    const { data, loading, setData, statusData } = useStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(()=>{




        return {
            data: [],
            currentPage: 1,
            itemsPage: 16,
            pagesCount: 0,
            firstIndex: 1,
            lastIndex: 16,
        };
    });

    const [valueSelect, setValueSelect] = useState(1);

    useEffect(() => {
        const pageCount = Math.ceil(
            data.products.length / pagination.itemsPage,
        );
        const lastIndex = currentPage * pagination.itemsPage;
        const firstIndex = lastIndex - pagination.itemsPage;
        const renderData = data.products.slice(firstIndex, lastIndex);
        setPagination({
            ...pagination,
            data: [...renderData],
            pagesCount: pageCount,
            lastIndex,
            firstIndex,
        });
    }, [pagination, currentPage, data.products]);

    

    const handlePageClick = (e) => {
        setCurrentPage(e.target.value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = (e) => {
        if (currentPage >= pagination.pagesCount) {
            return;
        }
        setCurrentPage(pre=>++pre);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrePage = (e) => {
        if (currentPage < 1) {
            return;
        }
        setCurrentPage(pre=>--pre);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChangeSelect = (e) => {
        setValueSelect(+e.target.value);
        console.log(valueSelect);
        if (valueSelect === 2) {
            setData({
                ...data,
                products: [...data.products.sort((a, b) => a.price - b.price)],
            });
        } else if (valueSelect === 1) {
            setData({
                ...data,
                products: [...data.products.sort((a, b) => b.price - a.price)],
            });
        }

        
    };

    const PagesNumber = [];
    for (let i = 1; i <= pagination.pagesCount; i++) {
        PagesNumber.push(
            <button
                value={i}
                className={cx(
                    'btn-page',
                    i === pagination.currentPage ? 'btn-active' : '',
                )}
                key={i}
                onClick={handlePageClick}
            >
                {i}
            </button>,
        );
    }

    const findCate = (id) => {
        const cate = data?.categories?.find((cate) => {
            return cate.id === id;
        });

        return cate;
    };

    let PageTitle

    if(statusData.type === 'GET_ALL'){
        PageTitle = ''
    }else if (statusData.type === 'GET_BY_MAIN'){
        PageTitle = (
            <h1 className={cx('page-title')}>
                {findCate(statusData.payload.idMainCate).name}
            </h1>
        );
    }else if (statusData.type === 'GET_BY_MAIN_SUB'){
        PageTitle = (
            <h1 className={cx('page-title')}>
                {findCate(statusData.payload.idMainCate).name} /{' '}
                {
                    findCate(statusData.payload.idMainCate).subcategories[
                        statusData.payload.idSubCate
                    ]
                }
            </h1>
        );
    }

 

        return (
            <div className={cx('wrapper')}>
                {loading && <Loading />}

                {PageTitle}
                <div className={cx('info')}>
                    <div className={cx('notices')}>
                        <Link to="/">Home / </Link>
                        <span>Page {pagination.currentPage}</span>
                    </div>

                    <div className={cx('odering')}>
                        <div className={cx('result count')}>
                            <span>
                                Showing {pagination.firstIndex + 1}–
                                {data.products.length < pagination.lastIndex
                                    ? data.products.length
                                    : pagination.lastIndex}{' '}
                                of {data.products.length} results
                            </span>
                        </div>
                        <select
                            className={cx('orderby')}
                            //value={valueSelect}
                            onChange={handleChangeSelect}
                        >
                            {' '}
                            <option value={1}>
                                Sort by price: low to hight
                            </option>
                            <option value={2}>
                                Sort by price: hight to low
                            </option>
                        </select>
                    </div>
                </div>
                <div className={cx('container')}>
                    {pagination.data.map((product, index) => {
                        product.subCate = findCate(product.idMainCate).subcategories[product.idSubCate]
                        return <CardProducts key={index} product={product} />;
                    })}
                </div>

                <div className={cx('pagination')}>
                    <div className={cx('pages-number')}>
                        {pagination.currentPage > 1 && (
                            <button
                                onClick={handlePrePage}
                                className={cx('btn-page')}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        )}
                        {PagesNumber.map((page) => page)}

                        {pagination.currentPage < pagination.pagesCount && (
                            <button
                                onClick={handleNextPage}
                                className={cx('btn-page')}
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
}

export default Home;
