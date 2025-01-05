import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, isSeeAll = false, tooltip, data = [], onViewChange }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((data) => (
                <AccountItem tooltip={tooltip} data={data} key={data.id} />
            ))}
            <p className={cx('more-btn')} onClick={onViewChange}>
                {isSeeAll ? 'See less' : 'See all'}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
