import {firebaseAuth, googleProvider} from "../config/constants";

/**
 * This is the super bonus point. If you want to make google signin open as a popup then use the signInWithPopup
 * method at line 9 other use signInWithRedirect method if you want to open google signin on the same page with redirect.
 */
export function loginWithGoogle() {
    // return firebaseAuth().signInWithRedirect(googleProvider);
    return firebaseAuth().signInWithPopup(googleProvider);
}

/**
 * Firing this function when user is hiting the sign out button on the page.
 */
export function logout() {
    return firebaseAuth().signOut();
}

