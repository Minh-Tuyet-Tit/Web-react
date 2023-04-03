import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import styles from './HeaderAdmin.module.scss';
const cx = classNames.bind(styles);


function HeaderAdmin() {
    const handleLogout = async (e) => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1> Shophistic Lite</h1>
                <button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket}/> Logout</button>
            </div>
        </div>
    );
}

export default HeaderAdmin;
