import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import AccountPreview from './AccountPreview';
import Image from '../Image';

const cx = classNames.bind(styles);

function AccountItem({ tooltip, data }) {
    const renderPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    if (tooltip)
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
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>
                            {data.first_name} {data.last_name}
                        </p>
                    </div>
                </div>
            </Tippy>
        );
    else
        return (
            <div className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>
                        {data.first_name} {data.last_name}
                    </p>
                </div>
            </div>
        );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
