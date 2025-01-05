import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from '~/components/Video';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);
const TYPE = 'for-you';
const PAGE = 1;

export const useElementOnScreen = (options, targetRef) => {
    const [isVisible, setIsVisible] = useState();
    const callbackFunction = (entries) => {
        const [entry] = entries; //const entry = entries[0]
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);
    return isVisible;
};

function Home() {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        videoService.getVideo({ type: TYPE, page: PAGE }).then((data) => {
            setVideo(data);
        });
    }, []);

    useEffect(() => {
        document.querySelector('.wrapper').focus();
    }, []);

    return (
        <div tabIndex={1} className={cx('wrapper')}>
            {video.map((video) => (
                <Video key={video.id} data={video} />
            ))}
        </div>
    );
}

export default Home;
