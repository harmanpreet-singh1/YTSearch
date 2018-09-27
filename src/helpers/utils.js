/**
 * This is the common util file for whole application.
 * All the common function for redux, loader as well as error are written here.
 */

import fp from 'lodash/fp';

const LOADER_ID = 'loader';
const LOADER_OPEN_CLASS = 'open';
const errorStrip = document.querySelector(".error-strip");

// Action creator for dispatching actions.
export const actionCreator = type => payload => ({ type, payload });

// Automatic type creator for reducer which will create 4 types as per the requirement.
export const apiTypeCreator = type => ({
    [type]: {
        FETCH: `${type}_FETCH`,
        SUCCESS: `${type}_SUCCESS`,
        ERROR: `${type}_ERROR`,
        RESET: `${type}_RESET`
    }
});

// Custom type creator for reducer by using functional programming.
export const typeCreator = (prefix, types) => fp.compose(
    fp.mapValues(v => `${prefix}_${v}`),
    arr => fp.zipObject(arr, arr),
)(types);

// Common function for showing loader on the page.
export const showLoader = () => {
  const loader = document.getElementById(LOADER_ID);
  if (loader) {
    loader.className = LOADER_OPEN_CLASS;
  }
  return true;
};

// Common function for hide loader on the page.
export const hideLoader = () => {
  const loader = document.getElementById(LOADER_ID);
  if (loader) {
    loader.className = '';
  }
  return true;
};

// Common function for showing error on the page. The error will automatically hides after 3 seconds.
export const showError = errorText => {
  errorStrip.innerHTML = errorText;
  errorStrip.classList.add("error");
  setTimeout(() => {
      errorStrip.classList.remove("error");
      errorStrip.innerHTML = "";
  }, 3000);
};