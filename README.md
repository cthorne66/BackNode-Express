# Node / Express / Backbone Web Application Boilerplate

## Description
Node/Backbone forms a powerful combination for building single page web applications that scale. Because of these two project's popularity, there are several great boilerplate projects out there, but all for either Node or Backbone seperately. This project aims to integrate these two worlds (Backend and Frontend) making it easy to start building next generation web applications.

The most prominent technologies are:

#### Backend: 
- Node.js
- Express.js
- Mongoose.js / MongoDB

#### Frontend: 
 - Backbone.js
 - Marionette.js
 - Require.js


## Getting started

1. Ensure you have installed the basic pre-requisits on your machine.  (git, node, npm, mongoDB)
        
        // on *unix systems
        sudo apt-get install git nodejs npm mongodb-server

        // mongoDB install instructions
        http://docs.mongodb.org/manual/installation/

2. Get the project source code from GitHub

        git clone git@github.com:skaapgif/webapp-boilerplate.git webapp
        cd webapp

3. Install node package dependencies

        npm install

4. Run the DB script to populate the DB
        
        cd /pathtomongo/bin
        mongo localhost:27017 /pathtoapp/app/config/db-scripts.js

5.  Start the server

        node app.js

6. Point your browser to localhost:3000

Optional step.  If you want, install nodemon (https://github.com/remy/nodemon) to listen for changes to files & redeploy automatically.  Then start the app: 

        nodemon app.js
