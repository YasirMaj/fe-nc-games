# Games Forum

This project was started with [Create React App](https://github.com/facebook/create-react-app).

## About

|                  |     |                                         |
| ---------------- | --- | --------------------------------------- |
| **Deployed URL** | :   | https://games-forum.netlify.app/        |
| **Backend API**  | :   | https://games.cyclic.app/api            |
| **Backend Repo** | :   | https://github.com/YasirMaj/be-nc-games |

This React website provides the frontend for the backend API I made previously (link above). It allows visitors to view Reviews listed by categories; to read individual Reviews and Comments; to up/down vote comments; and to submit/delete their own comments (subject to being logged in).

The site is designed along conventional lines, with a navbar at the top containing links to categories, as well as a login link. Reviews can be sorted according to various criteria. The URL updates on every new page, so that anything copied from the address bar will render correctly elsewhere.

## Running the website locally

### Cloning the repo

In the terminal, navigate to the directory into which you would like to clone the repo, and run:

```shell
$ git clone https://github.com/YasirMaj/fe-nc-games
```

### Installing dependencies

Once this is complete, install all dependencies using:

```shell
$ npm install
```

This may take some time, as React is a large module.

### Starting the local server

With all dependencies installed, the server can be started using:

```shell
$ npm start
```

The default port is 3000. To use a different one, modify the `start` script within `package.json` by prepending `PORT=<PORT NUMBER>`.

The locally hosted website should open automatically in the machine's default browser. If not, a link to the server will also be displayed in the terminal.

|**Minimum Node version**|:|19.0.0|
