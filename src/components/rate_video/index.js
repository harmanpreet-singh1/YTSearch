import React from 'react';
import { showError } from '../../helpers/utils';

class RateVideo extends React.Component {

   /**
    * Common API function for both the up and down arrow. 
    * We are dispatching an action for updating the rate values on the actual video.
    */
   rateApiFetch = (evt, clickedIdVal, otherIdVal) => {
      const { 
         target, target: { parentElement, classList } 
      } = evt;
      const { 
         rateVideoFetch, selectedVideo : { id: { videoId } } 
      } = this.props;

      const rate = target.getAttribute('data-rate');
      parentElement.querySelector('#'+otherIdVal).classList.remove('active');

      if(classList.contains('active')) {
         localStorage.removeItem('rateTarget');
         rateVideoFetch({rating: 'none', id: videoId});
      } else {
         localStorage.setItem('rateTarget', clickedIdVal);
         rateVideoFetch({rating: rate, id: videoId});
      }
   }

   /**
    * This is the up/down arrow click handler which will only fire when we have the access token for authentication.
    * This is using the rateApiFetch function for dispatching an action.
    */
   rateBtnClicked = (evt) => {
      const { target: { id } } = evt;
      if(localStorage.getItem('access_token')) {
         if(id === 'upButton') {
            this.rateApiFetch(evt, id, 'downButton');
         } else {
            this.rateApiFetch(evt, id, 'upButton');
         }
      } else {
         showError('Please login first to rate the video.');
      }
   }

   render() {
      const { rateVideoError, rateVideoData } = this.props;
      let iconChangeClass;
      // Checking if there is some change in the data or error property for rating.
      if(!rateVideoError && rateVideoData) {
         iconChangeClass = 'active';
      } else {
         iconChangeClass = '';
      }
      const iconStyles = {
         pointerEvents: 'none',
         display: 'block',
         width: '100%',
         height: '100%'
      };
      // Error message strip will be shown when we not have any auth token.
      (rateVideoError) && showError('Invalid Token. Please re-login.');
      return (
         <div className="rate-video">
            <button id="upButton" data-rate="like" className={(localStorage.getItem('rateTarget') === 'upButton') ? 'yt-icon-button active' : 'yt-icon-button '+ {iconChangeClass}} onClick={this.rateBtnClicked} aria-label="like this video">
               <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={iconStyles}>
                  <g className="style-scope yt-icon">
                     <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" className="style-scope yt-icon">
                     </path>
                  </g>
               </svg>
            </button>
            <button id="downButton" data-rate="dislike" className={(localStorage.getItem('rateTarget') === 'downButton') ? 'yt-icon-button active' : 'yt-icon-button '+ {iconChangeClass}} onClick={this.rateBtnClicked} aria-label="dislike this video">
               <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={iconStyles}>
                  <g className="style-scope yt-icon">
                     <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" className="style-scope yt-icon">
                     </path>
                  </g>
               </svg>
            </button>
         </div>
      );
   }
}
export default RateVideo;