import { actionCreator, apiTypeCreator, typeCreator } from '../helpers/utils';

const PREFIX = 'YOUTUBE';
const RATE_PREFIX = 'RATING';

const types = {
      // Creating the 4 default types by using apiTypeCreator function written in the util file. 
   ...apiTypeCreator(PREFIX),
   ...apiTypeCreator(RATE_PREFIX),
   ...typeCreator(PREFIX, [
      'LOAD_MORE',
      'RATE_VIDEO',
      'SELECTED_VIDEO'
   ])
};

const INITIAL_STATE = {
   data: [],
   selectedVideo: null,
   nextPageToken: null,
   searchTerm: '',
   totalResults: 0,
   etag: null,
   loading: false,
   error: null,
   rating: {
      loading: false,
      error: null
   }
};

// This is merging data of the sidebar with the new values.
const mergeVideoList = (state, payload) => {
   const { data } = state;
   const newData =  [ ...data, ...payload.items ];
   return { 
      ...state, 
      data: newData,
      nextPageToken: payload.nextPageToken,
      loading: false
   };
};

export default (state = INITIAL_STATE, {
   type,
   payload
}) => {
   switch (type) {

      case types[PREFIX].FETCH:
         return {
            ...state,
            error: '',
            loading: true,
            searchTerm: payload.searchTerm
         };

      case types[PREFIX].SUCCESS:
         return {
            ...state,
            error: '',
            loading: false,
            data: payload.items,
            selectedVideo: payload.items[0],
            nextPageToken: payload.nextPageToken,
            etag: payload.etag,
            totalResults: payload.pageInfo.totalResults
         };

      case types[PREFIX].ERROR:
         return {
            ...state,
            loading: false,
            data: [],
            error: payload
         };

      case types.RESET:
         return { ...INITIAL_STATE
         };

      case types.LOAD_MORE:
         return mergeVideoList(state, payload);
      
      case types[RATE_PREFIX].FETCH:
         return {
            ...state,
            rating: {
               loading: true,
               data: null,
               error: null
            }
         }

      case types[RATE_PREFIX].SUCCESS:
         return {
            ...state,
            rating: {
               data: true,
               error: null,
               loading: false
            }
         }

      case types[RATE_PREFIX].ERROR:
         return {
            ...state,
            rating : {
               error: payload,
               data: null,
               loading: false
            }
         }

      case types.SELECTED_VIDEO:
         return {
            ...state,
            selectedVideo: payload
         }

      default:
         return state;
   }
};


const reset = actionCreator(types.RESET);
const loadMore = actionCreator(types.LOAD_MORE);
const rateVideoFetch = actionCreator(types[RATE_PREFIX].FETCH);
const rateVideoSuccess = actionCreator(types[RATE_PREFIX].SUCCESS);
const rateVideoError = actionCreator(types[RATE_PREFIX].ERROR);
const selectVideo = actionCreator(types.SELECTED_VIDEO);
const fetchVideos = actionCreator(types[PREFIX].FETCH);
const fetchSuccess = actionCreator(types[PREFIX].SUCCESS);
const fetchError = actionCreator(types[PREFIX].ERROR);

const getData = (state) => state.data;
const getState = (state) => state;
const getError = (state) => state.error;
const isLoading = (state) => state.loading;

const actions = {
   reset,
   loadMore,
   rateVideoFetch,
   rateVideoSuccess,
   rateVideoError,
   selectVideo,
   fetchVideos,
   fetchSuccess,
   fetchError
};
const selectors = {
   getData,
   getState,
   getError,
   isLoading
};

export { selectors, actions, types };