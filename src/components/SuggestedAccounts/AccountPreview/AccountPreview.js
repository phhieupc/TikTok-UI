import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://qc-static.coccoc.com/a-images/88c/e1c/88ce1c3c7e58c8fe0f517528df8c50d9df42d53e6ad93affb2c6b7b2fd33efad.png"
                    alt=""
                />
                <Button primary small>
                    Follow
                </Button>
            </div>

            <div className={cx('body')}>
                <h4 className={cx('nick-name')}>
                    <strong>hieuphan</strong>
                    <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />
                </h4>
                <p className={cx('name')}>Phan Hữu Hiếu</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
