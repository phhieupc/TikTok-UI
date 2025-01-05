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
import * as userService from '~/services/userService';
import * as userFollowsService from '~/services/userFollowsService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((prevUsers) => {
                    const uniqueUsers = new Map();
                    [...prevUsers, ...data].forEach((user) => {
                        uniqueUsers.set(user.id, user);
                    });
                    return Array.from(uniqueUsers.values());
                    // [...prevUsers, ...data]);
                });
            })
            .catch((error) => console.log(error));
    }, [page]);

    useEffect(() => {
        userFollowsService
            .getFollowed({ page, perPage: PER_PAGE })
            .then((data) => {
                setFollowedUsers((prevUsers) => {
                    const uniqueUsers = new Map();
                    [...prevUsers, ...data].forEach((user) => {
                        uniqueUsers.set(user.id, user);
                    });
                    return Array.from(uniqueUsers.values());
                    // [...prevUsers, ...data]);
                });
            })
            .catch((error) => console.log(error));
    }, [page]);

    const handleViewChange = () => {
        setIsSeeAll(!isSeeAll);
        if (isSeeAll) {
            setPage(INIT_PAGE);
        } else {
            setPage(page + 1);
        }
    };

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
            <SuggestedAccounts
                label="Suggested account"
                tooltip
                data={suggestedUsers}
                isSeeAll={isSeeAll}
                onViewChange={handleViewChange}
            />
            <SuggestedAccounts
                label="Following account"
                data={followedUsers}
                isSeeAll={isSeeAll}
                onViewChange={handleViewChange}
            />

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
