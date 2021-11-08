<div id="top"> </div>

# 🐓 POLLO 🐓

Pollo is a simple application. Pollo doesn't want to change the world. Pollo only want's to provide an easy way to create a simple poll and share it with friends, so you can decide where you'll go for dinner or what film will you watch.

## Try out Pollo

[Click here](https://pollo.cloud) to access the application.

## About The Project

The app is a serverless React application utilizing Firebase as an auth provider and Firestore as a database and deployed on [Render.com](https://render.com). When a user logs in the credentials are stored in local storage, meaning when you access the site from another device, your auth data is lost. State is managed three different way. Firebase itself for user authentication, redux-toolkit for the userdata and react queries for the polls.

### Why don't we use an authprovider?

The main driver of this project was simplicity, so setting up user - password authentication wasn't on the table. Using for eg. Google's auth provider would solve the issue with login persistence across browsers but Google doesn't let it's Oauth service work in webviews (FB messenger's inapp browser) where this app makes the most sense. So anonymous login it is.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React.js](https://reactjs.org/)
-   [React Query](https://react-query.tanstack.com/)
-   [React Router](https://reactrouter.com/)
-   [Reducx Toolkit](https://redux-toolkit.js.org/)
-   [Firebase](https://firebase.com)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Installing pollo is fairly easy. Follow these instructions to do so.

### Prerequisites

-   Node  
     You can install node from [here](https://nodejs.org/en/download/), or you can use a package manager like [homebrew](https://brew.sh/)
-   NPM or Yarn  
     run either

        npm install npm@latest -g

    or

        npm install --global yarn

    depending on your preference. This instruction uses the yarn syntax.

### Installation

1.  Create a fiebase account and create a project [here](https://console.firebase.google.com/).  
    And a web app.  
    You will need the firebase config object looking like this
    ```sh
    {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    }
    ```
2.  Clone the repo
    ```sh
    git clone https://github.com/kovacs-peter/pollo.git
    ```
3.  Install the packages
    ```sh
    yarn
    ```
4.  Create a `.env` file in your root directory and fill out with your firebase credentials.

    ```
    REACT_APP_API_KEY=
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_PROJECT_ID=
    REACT_APP_STORAGE_BUCKET=
    REACT_APP_MESSAGING_SENDER_ID=
    REACT_APP_APP_ID=
    ```

5.  Run development server with:
    ```sh
        yarn run
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Peter Kovacs  
[LinkedIn](https://linkedin.com/in/the-real-peter-kovacs)  
koovacspeter@gamil.com
