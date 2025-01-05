import Video from '~/components/Video';
import { useEffect, useState } from 'react';
import * as videoService from '~/services/videoService';

const TYPE = 'following';
const PAGE = 1;

function Following() {
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
        <div tabIndex={1} className="wrapper">
            {video.map((video) => (
                <Video key={video.id} data={video} />
            ))}
        </div>
    );
}

export default Following;
