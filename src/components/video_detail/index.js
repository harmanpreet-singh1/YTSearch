import React from 'react';
import VideoRating from '../rate_video';

/**
 * View generatio of the main content area i.e. video player.
 */
class VideoDetail extends React.Component {

   render () {
      const { video, rateVideoFetch, rateVideoError, rateVideoData } = this.props;

      if(!video){
         return null;
      }

      const { 
         id: { videoId }, 
         snippet: { title, description } 
      } = video;
      
      const url = `https://www.youtube.com/embed/${videoId}`;

      return (
         <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
               <iframe allowFullScreen="allowfullscreen" 
                    title="youtube-video-box" className="embed-responsive-item" src={url}>
                </iframe>
            </div>
            <VideoRating 
                rateVideoFetch={rateVideoFetch} 
                selectedVideo={video} 
                rateVideoError={rateVideoError}
                rateVideoData={rateVideoData}
            />
            <div className="details">
               <h3>{title}</h3>
               <p>{description}</p>
            </div>
         </div>
      );
   }
};
export default VideoDetail;