/************************************
 * Author: Harmanpreet Singh
 * Task: Currency converter
 * Date: Sept 25th, 2018
 ************************************/

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import SearchBar from './components/search_bar';
import { showLoader, hideLoader } from './helpers/utils';
import NoResultComponent from './components/no_result';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail';
import { bindActionCreators } from 'redux';
import { YTSearchSelectors, YTSearchActions } from './reducer';

class App extends Component {
  constructor(props){
    super(props);
    this.videoSearch('youtube'); // Initial default youtube API call
  }

  /**
   * Function for search videos with the help of youtube API. For referene how we are sending
   * API request then visit services/index folder for getting details.
   */
  videoSearch(searchText) {
    const { fetchVideos } = this.props;
    fetchVideos({searchTerm: searchText}); // Fetching videos by dispatching an action(using Redux and Redux-saga). 
  }

  /**
  * Divided the whole application into multiple components for ease.
  */
  render() {
    const { 
      searchTerm, history, selectedVideo, rateVideoFetch, 
      videos, fetchVideos, nextPageToken, selectVideo,
      loading, etag, totalResults, rateVideoError, rateVideoData
    } = this.props;
    return (
      <div className="col-lg-10 col-lg-offset-1">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}
          history={history}
        />
        { (_.isEmpty(videos)) && etag && <NoResultComponent />}
        <VideoDetail 
          video={selectedVideo} 
          rateVideoFetch={rateVideoFetch}
          rateVideoError={rateVideoError}
          rateVideoData={rateVideoData}
        /> 
        <VideoList 
          fetchVideos={fetchVideos}
          searchTerm={searchTerm}
          nextPageToken={nextPageToken}
          onVideoSelect={userSelected => selectVideo(userSelected)}
          videos={videos}
          totalResults={totalResults}
        />
        {loading ? showLoader() : hideLoader()}
      </div>
    );
  }
}

// Connecting state to props
const mapStateToProps = (state) => {
  const { YTSearchReducer } = state;
  return {
    videos: YTSearchSelectors.getData(YTSearchReducer),
    selectedVideo: YTSearchSelectors.getState(YTSearchReducer).selectedVideo,
    nextPageToken: YTSearchSelectors.getState(YTSearchReducer).nextPageToken,
    searchTerm: YTSearchSelectors.getState(YTSearchReducer).searchTerm,
    loading: YTSearchSelectors.getState(YTSearchReducer).loading,
    etag: YTSearchSelectors.getState(YTSearchReducer).etag,
    totalResults: YTSearchSelectors.getState(YTSearchReducer).totalResults,
    rateVideoError: YTSearchSelectors.getState(YTSearchReducer).rating.error,
    rateVideoData: YTSearchSelectors.getState(YTSearchReducer).rating.data
  }
}

// Connecting dispatch actions to props
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchVideos: YTSearchActions.fetchVideos,
    rateVideoFetch: YTSearchActions.rateVideoFetch,
    loadMore: YTSearchActions.loadMore,
    selectVideo: YTSearchActions.selectVideo
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
