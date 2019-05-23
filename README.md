# 13.3 - Hot Restaurant
## Overview
This is a new and improved version of the Hot Restaurant activity from lesson 13.3, complete with:

- Vue.js frontend
- Express API
- MySQL database
- Auth0 login
- Tests using Mocha and Chai, plus sinon mocks
- Server runs on Docker
- ESLint and Prettier setup
- Code Coverage reports with nyc/istanbul

## Running locally
### Server
The obvious:
```shell
npm install
```
Run the tests like so:
```shell
make test
```
Modify the `Makefile` to connect to your local instance of mysql to run the server locally:
```shell
make dev
```

### Vue app
```shell
cd client
npm install
```
Ensure that the server is running before running the Vue app, even better if you can seed the database a bit.
```shell
npm run serve
```
The Vue application will open on `localhost:8081`.  I've configured CORS on the express server (running on `localhost:5000`) for now, so that shouldn't be an issue.

## Contributing
There's still plenty to do here, such as --
- Tests on the client!
- Building out the componentry on the client - making the Vue app a little simpler to step into.
- Adding some routes to allow for more specific queries
- Adding Vuex to the project to pass data from the database around a little easier
- Integrating Auth0 better or even building out a new auth client
- I'm sure there's much more

All that said, I'm probably going to stop after I add the Dockerfile and set up the CI/CD builds.  If you're a student of mine, it could be a fun challenge to fork this repo and try to do some of the things listed above, or whatever you want to do with the app!

