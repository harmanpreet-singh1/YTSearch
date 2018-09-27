import React from 'react';

/**
 * Generating multiple lists as per the result recieved from the API. 
 * We are using bootstrap classes here to optimize the code.
 */
const VideoListItem = (props) => {
    const { video, onUserSelected } = props;
    const { 
        snippet: { thumbnails, title } 
    } = video;
    const imageUrl = thumbnails.default.url;

    return (
    <li onClick={() => {
            localStorage.removeItem('rateTarget'); 
            onUserSelected(video)
        }} className="list-group-item">
        <div className="video-list media">
            <div className="media-left">
                <img className="media-object" alt={title} src={imageUrl} />
            </div>
            <div className="media-body">
                <div className="media-heading">{title}</div>
            </div>
        </div>
    </li>
    );
};

export default VideoListItem;