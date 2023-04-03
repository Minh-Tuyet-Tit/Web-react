import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './SidebarAdmin.module.scss'
const cx = classNames.bind(styles)


function SidebarAdmin() {
    return (
        <div className={cx('wrapper')}>
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to={'/admin/dashboard'}>Category</Link>{' '}
                </li>
                <li>
                    <Link to={'/admin/dashboard/product'}>Products</Link>{' '}
                </li>
                <li>Order</li>
                <li>Setting</li>
            </ul>
        </div>
    );
}

export default SidebarAdmin;