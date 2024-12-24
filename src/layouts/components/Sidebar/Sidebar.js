import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested account" tooltip />
            <SuggestedAccounts label="Following account" />

            <div className={cx('footer')}>
                <div className={cx('title')}>
                    <h4>Công ty</h4>
                    <h4>Chương trình</h4>
                    <h4>Điều khoản và chính sách</h4>
                </div>
                <Tippy interactive maxWidth={170} offset={[70, 4]} content="NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK">
                    <button className={cx('add')}>Thêm</button>
                </Tippy>
                <div className={cx('cpr')}>
                    <FontAwesomeIcon icon={faCopyright} />
                    <span> 2024 TikTok</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
