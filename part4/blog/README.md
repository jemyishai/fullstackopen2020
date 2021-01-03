This is a blog from part 4 of fullstackopen.
https://fullstackopen.com/en/part4/token_authentication#exercises-4-15-4-22

Beginning notes - probably best not to use create-react-app for backend

1) ```npx create-react-app blog```
  -Feel free to delete create-react-app scaffolding & node_modules if the package.json looks good
2) ```rm -rf .git```
create-react-app will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your projects to be a separate repository, so simply run the rm -rf .git command at the root of your application.
3) npm install --save-dev nodemon
 - script for running nodemon in ```package.json: "dev": "nodemon index.js",```
4) Etiher update package.json and ```npm install`` or run the following
  ```npm install http```
  ```npm install express```
  ```npm install cors```
  ```npm install mongoose```
  ```npm install dotenv```
  - add the .env fil to the gitignore
5) Set up database, lolz
  - add the proper port and URI's for db to enviroment files
6) Refactor with sane directories
