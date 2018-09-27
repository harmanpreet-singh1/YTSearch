import React from 'react';
import _ from 'lodash';
import VideoListItem from '../video_list_item';

/**
 * Main component for the sidebar list of videos.
 * To load more videos, user have to click on load more button. 
 */
class VideoList extends React.Component {

    showMore = () => {
        const { fetchVideos, searchTerm, nextPageToken } = this.props;
        // Dispatching an action for loading more videos in the sidebar by merging it with the existing videos.
        fetchVideos({
            searchTerm: searchTerm, 
            loadMore: true, 
            nextPageToken: nextPageToken
        });
    }

    render() {
        const { videos, onVideoSelect, totalResults, nextPageToken } = this.props;
        if (_.isEmpty(videos)) {
            return null;
        }
        const videoItems = videos.map((video, index) => {
            return (
                <VideoListItem 
                    onUserSelected={onVideoSelect}           
                    key={video.etag+index} 
                    video={video} />
            );
        });
        return (
            <div className="video-list col-md-4">
                <ul className="list-group">
                    {videoItems}
                </ul>
                {/* Show load more button only when we have (totalResults > 5 && nextPageToken) */}
                {(totalResults > 5 && nextPageToken) &&
                    <div className="load-more">
                        <button className="col-xs-12 col-md-12" onClick={this.showMore}>Load More</button>
                    </div>
                }
            </div>
        );
    }
};

export default VideoList;