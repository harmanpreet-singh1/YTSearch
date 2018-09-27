import { takeLatest, put, call } from 'redux-saga/effects';
import { YTSearchTypes, YTSearchActions } from '../reducer';
import { searchVideoApi, rateVideoApi } from '../services';
import { config } from '../config/constants';

const PREFIX = 'YOUTUBE';
const RATE_PREFIX = 'RATING';
const API_KEY = config.apiKey;

function* fetchVideosActionWorker({payload}) {
    const params = {
      part: 'snippet',
      key: API_KEY,
      q: payload.searchTerm,
      maxResults: 5,
      type: 'video',
      pageToken: payload.nextPageToken
    }
    try {
      const summary = yield call(searchVideoApi, params);
      if(payload.loadMore) {
        yield put(YTSearchActions.loadMore(summary));
      } else {
        yield put(YTSearchActions.fetchSuccess(summary));
      }
    } catch (err) {
      yield put(YTSearchActions.fetchError(err));
    }
}

function* rateVideoFetchWorker ({payload}) {
    try {
      const summary = yield call(rateVideoApi, payload);
      yield put(YTSearchActions.rateVideoSuccess(summary));
    } catch (err) {
      yield put(YTSearchActions.rateVideoError(err));
    }
}

// Hiting this function when loading app so whenever this saga will get the defined type, it will automatically
// fires the corresponded function.
export function* YTSearchSaga() {
   yield takeLatest(YTSearchTypes[PREFIX].FETCH, fetchVideosActionWorker);
   yield takeLatest(YTSearchTypes[RATE_PREFIX].FETCH, rateVideoFetchWorker);
}
