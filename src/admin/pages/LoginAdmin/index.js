import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './LoginAdmin.module.scss';

import { getAdmin } from '../../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../../../context/AdminContext';

const cx = classNames.bind(styles);
function LoginAdmin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { adminState, dispatch } = useAdmin();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const admin = await getAdmin(values);
            if (admin) {
                navigate('/admin/dashboard');
                dispatch({
                    type: 'SETADMIN',
                    payload: {
                        loading: false,
                        isAuthenticate: true,
                        //data: data,
                    },
                });
            } else {
                console.log('Tài khoản hoặc mật khẩu không đúng');
            }
        } catch (error) {
            console.log('lỗi không xác định');
        } finally {
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    if (adminState?.isAuthenticate) {
        return <Navigate to={'/admin/dashboard'} />;
    }
    // console.log(adminState);

    return (
        <div className={cx('wrapper')}>
            {loading && (
                <div className={cx('loading')}>
                    <p>
                        <FontAwesomeIcon
                            className={cx('icon-loading')}
                            icon={faSpinner}
                        />
                    </p>
                </div>
            )}
            <h1>Shophistic Lite</h1>
            <div className={cx('inner')}>
                <h1>Login</h1>

                <form onSubmit={onSubmit} className={cx('form-login')}>
                    <div className={cx('form-group')}>
                        <input
                            value={values.email}
                            onChange={onChange}
                            name="email"
                            type={'email'}
                            placeholder="Email"
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            autocomplete="current-password"
                            value={values.password}
                            onChange={onChange}
                            name="password"
                            type={'password'}
                            placeholder="Password"
                        />
                    </div>

                    <div className={cx('form-control')}>
                        <Link to={'#'}>
                            <span>Lost your password?</span>
                        </Link>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;
