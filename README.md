Install
=======

Install node.js (brew install node)

Run following commands from root of project:

```
npm install
./start.sh
```
The app was written using a functional style, this made it easier to test and easier to read.
State within the app is kept to one array of the game positions. This means the app is easier
to maintain as state and mutations are kept to a minimum.

To run the unit tests run the following command:
```
mocha
```
