/**
 * Main file for Sagas. Created this file just for maintaining scalibility of the application.
 * No matter how much big application is, we can create new sagas and add in the yeild all function
 * for accessing all the properties from one common saga.
 */
import { all } from 'redux-saga/effects';

import { YTSearchSaga } from './youtube_search_saga';

export default function* rootSaga() {
  yield all([
    YTSearchSaga()
  ]);
}
