# Youtube Search Application (React, Redux, Saga)
------------

Introduction
------------

This is a complete youtube search application where user can search any keyword to get data from youtube API. This returns a collection of search results that match the query parameters specified in the API request. 
We have three sections in the application:
-- One is the search bar where user can write any keywords.
-- Second is the sidebar where complete fetched data will be shown in the form of list.
-- Third is the main content area where user can be able to see the selected video. By default first video will be selected.

Architecture Details
------------
- Created a optimised folder structure for simplicity. Please have a look below:
##### Directory Structure :-
![directory-structure](https://i.postimg.cc/25yhZMg0/Screen_Shot_2018-09-27_at_10.05.03_PM.png)

- As you can see in the above screenshot we have different folders for different components and every component have index.js file because this is the default file and when we run the application this file will automatically call when we import this folder in any other component.
- There are also seperate css files for easy maintainability.

Functionalities
------------

- User can search anything by typing in the search bar provided at the top of the page to get the desired results from the API. There will also be a beautiful CSS on the search bar when user make a focus on it.
- There is a sidebar on the right side which will contain individual results from the Youtube API. Each found item from the API is displayng the title of the video together with a small thumbnail of the video. The Video tiles are clickable and when clicked on, the main content area will update with the currently selected video.
- Main content area display's a Youtube embedded video player with video controls.
Underneath it is showing the title and the description of the video.
- Used Redux, for maintaining whole application state.
- Used Redux-saga, for making Async requests to the 3rd party.
- Used Firebase, for managing the google sign-in/sign-out. There will be two views for the sign-in. One is with popup and other is with redirect. By default popup view will be shown when user click on the sign-in button and if user want redirect view then they have to use "signInWithRedirect" instead of "signInWithPopup" from the auth.js file.
- Common code is written for loader and error message.
- Some other common functions were written in the util file using functional programming.

Installation
-------------

- Clone/Download the repository by using [Github Link](https://github.com/harman6666/YTSearch)
- After the 1st step _run __npm install___ in the project folder.
- After all the necessary packages got installed then _run __npm start___ the command prompt.
- We can also build the project for the production release by using __npm build__ command.
- Yeah, that's it. Enjoy the webapp.

Some Examples/Screenshots
-----------

**SignIn View**
![Sign-in-view](https://i.postimg.cc/BbKGL7Qk/sign_In_View.png)

**Popup View**
![Popup-view](https://i.postimg.cc/MTrWjj0M/popup_View.png)

**Redirect View**
![redirect-view](https://i.postimg.cc/D0HyRb8k/new_Page_View.png)

**SignOut View**
![Sign-out-view](https://i.postimg.cc/bJMhvf81/Sign_Out_View.png)

**Error Msg View**
![error-view](https://i.postimg.cc/85w7X5RN/error_Msg.png)

**Loader View**
![loader-view](https://i.postimg.cc/c12xxw4P/loader_View.png)


Some NPM commands for reference
---------------

- __npm start__ starts the development server and auto-reloads the page any time you make edits
- __npm run__ build bundles the app into static files for production
- __npm test__ starts the test runner and lets you test your app with Jest as you build it.

Enhacements which can be done
----------------

- We can also use getRating api to get rating for the video. 


### Thanks !




