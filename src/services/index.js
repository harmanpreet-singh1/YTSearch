/**
 * These are the services using axios which we use to hit 3rd parth API's(async requests).
 * We can use any method(CRUD) as per the requirement.
 */

import axios from 'axios';

const SEARCH_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/search';
const RATE_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos/rate';

export const searchVideoApi = params => axios.get(SEARCH_VIDEO_URL, {
    params
  }).then(res => res.data);

export const rateVideoApi = params => axios.post(RATE_VIDEO_URL+'?id='+params.id+'&rating='+params.rating, params, {
  headers: { 'authorization': 'Bearer ' + localStorage.getItem('access_token') }
}).then(res => res.data);