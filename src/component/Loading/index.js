import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <p>
                <FontAwesomeIcon
                    className={cx('icon-loading')}
                    icon={faSpinner}
                />
            </p>
        </div>
    );
}

export default Loading;
