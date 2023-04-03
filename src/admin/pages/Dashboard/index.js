import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { useAdmin } from '../../../context/AdminContext';
import HeaderAdmin from '../../component/HeaderAdmin';
import SidebarAdmin from '../../component/SidebarAdmin';
import { Outlet } from 'react-router-dom';
import Loading from '../../../component/Loading';

const cx = classNames.bind(styles);

function Dashboard() {
    const { adminState } = useAdmin();

    if (adminState.loading) {
        return <Loading/>;
    } else if (adminState.isAuthenticate) {
        return (
            <div className={cx('wrapper')}>
                <HeaderAdmin />
                <div className={cx('inner')}>
                    <SidebarAdmin/>
                    <Outlet/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
