import React from 'react';
import _ from 'lodash';
import { loginWithGoogle, logout } from "../../helpers/auth";
import { firebaseAuth } from "../../config/constants";
import { showError } from '../../helpers/utils';

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const accessToken = 'access_token';

class SearchBar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         term: '',
         authBtn: 'Sign In'
      };
   }

   componentWillMount() {
      firebaseAuth().onAuthStateChanged(user => {
         if (user) {
            firebaseAuth().getRedirectResult().then(function(result) {
               if(!_.isEmpty(result.user)) {
                  const token = result.credential.accessToken;
                  localStorage.setItem(accessToken, token);
               }
            });
            localStorage.removeItem(firebaseAuthKey);
            localStorage.setItem(appTokenKey, user.uid);
            this.props.history.push("/");
         }
      });
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         term: nextProps.searchTerm
      });
   }

   onInputChange = (evt) => {
      this.setState({
         term: evt.target.value
      });
   }

   onKeyEnter = (evt) => {
      localStorage.removeItem('rateTarget');
      const { onSearchTermChange } = this.props;
      const { target: { value }, keyCode } = evt;
      if (keyCode === 13 && value !== '') {
         onSearchTermChange(value);
      }
   }

   handleGoogleLogin = () => {
      loginWithGoogle()
         .then(function (result) {
            const token = result.credential.accessToken;
            localStorage.setItem(accessToken, token);
         }).catch(function (error) {
            console.error(error);
            showError('Network Error. Please try again.')
            localStorage.removeItem(firebaseAuthKey);
         });
      localStorage.setItem(firebaseAuthKey, "1");
   }

   handleLogout = () => {
      logout().then(function () {
         localStorage.removeItem(accessToken);
         localStorage.removeItem(appTokenKey);
         this.props.history.push("/");
      }.bind(this));
   }

   render() {
      let authBtn;
      if (firebaseAuth().currentUser) {
         authBtn = <button className="sign-out" onClick={this.handleLogout}> Sign out </button>;
      } else {
         authBtn = <button className="sign-in" onClick={this.handleGoogleLogin}> Sign In </button>;
      }
      return ( 
         <div className="search-bar">
            <div className="search-term col-xs-8 col-sm-9 col-md-8">
               <label htmlFor="YT-search" className="YT-search">
                  <input type="text" id="YT-search" value={this.state.term} 
                    onChange={this.onInputChange} onKeyDown={this.onKeyEnter} placeholder="&nbsp;" 
                  />
                  <span className="label">Enter Keyword</span>
                  <span className="border"></span>
               </label>
            </div>
            <div className="col-md-4 col-xs-4 col-sm-3 auth-btn">{authBtn}</div>
         </div>
      );
   }

}

export default SearchBar;