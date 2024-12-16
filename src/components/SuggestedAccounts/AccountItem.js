// import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tippy
            interactive
            delay={[800, 0]}
            placement="bottom"
            offset={[-20, 0]}
            render={renderPreview}
            appendTo={document.body}
        >
            <div className={cx('account-item')}>
                <img
                    className={cx('avatar')}
                    src="https://qc-static.coccoc.com/a-images/88c/e1c/88ce1c3c7e58c8fe0f517528df8c50d9df42d53e6ad93affb2c6b7b2fd33efad.png"
                    alt=""
                />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>hieuphan</strong>
                        <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>Hiếu Phan</p>
                </div>
            </div>
        </Tippy>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
