import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import video1 from '~/assets/videos/video1.mp4';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBookmark, faCommentDots, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import { HeartIcon } from '../Icons';
import { Link } from 'react-router';
import Button from '../Button';
import { useElementOnScreen } from '~/pages/Home/Home';

const cx = classNames.bind(styles);

const VideoInfo = () => {
    return (
        <div className={cx('video-info')}>
            <img className={cx('avatar')} src="https://animehay.moe/upload/poster/3518-1725729749.jpg" alt="" />
            <div className={cx('wrapper-name')}>
                <div>
                    <Link className={cx('nick-name')} to="@hieuphan">
                        hieuphan
                    </Link>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                    <Link className={cx('name')} to="@hieuphan">
                        Hiếu Phan
                    </Link>
                </div>
                <div className={cx('content')}>Video Vì là sai lối</div>
                <div className={cx('music')}>
                    <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
                    <span className={cx('music-name')}> Vì là sai lối - Nguyễn Thành Đạt</span>
                </div>
            </div>
            <div>
                <Button small primary className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>
        </div>
    );
};

const VideoContent = ({ ref }) => {
    const [likeActive, setLikeActive] = useState(false);
    const [saveActive, setSaveActive] = useState(false);
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef();

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    const isVisible = useElementOnScreen(options, videoRef);
    const handleVideo = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current
                .play()
                .then(() => {
                    setPlaying(true);
                })
                .catch((error) => {
                    console.error('Error playing video:', error);
                });
        }
    };

    useEffect(() => {
        const handleUserInteraction = () => {
            videoRef.current.muted = false; // Bật âm thanh khi có tương tác
        };

        document.addEventListener('click', handleUserInteraction);
        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                videoRef.current.muted = true; // Đảm bảo video bị tắt tiếng nếu cần
                videoRef.current
                    .play()
                    .then(() => {
                        setPlaying(true);
                    })
                    .catch((error) => {
                        console.error('Error playing video:', error);
                    });
            }
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]); // Không cần `playing` trong danh sách phụ thuộc

    return (
        <div className={cx('video-wrapper')}>
            <video
                muted
                autoPlay
                onClick={handleVideo}
                ref={videoRef}
                className={cx('video')}
                loop
                src={video1}
                width={330}
                height={450}
            />
            <div className={cx('action-btn')}>
                <div className={cx('single-btn')}>
                    <button className={cx('btn')} onClick={() => setLikeActive(!likeActive)}>
                        <HeartIcon className={cx('heart-icon', { active: likeActive })} />
                    </button>
                    <strong className={cx('value')}>678.9K</strong>
                </div>

                <div className={cx('single-btn')}>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCommentDots} />
                    </button>
                    <strong className={cx('value')}>678.9K</strong>
                </div>

                <div className={cx('single-btn')}>
                    <button onClick={() => setSaveActive(!saveActive)} className={cx('btn')}>
                        <FontAwesomeIcon className={cx('bookmark-icon', { active: saveActive })} icon={faBookmark} />
                    </button>
                    <strong className={cx('value')}>678.9K</strong>
                </div>

                <div className={cx('single-btn')}>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                    </button>
                    <strong className={cx('value')}>678.9K</strong>
                </div>
            </div>
        </div>
    );
};

function Video({ ref }) {
    return (
        <div className={cx('wrapper')}>
            <VideoInfo />
            <VideoContent />
        </div>
    );
}

export default Video;
