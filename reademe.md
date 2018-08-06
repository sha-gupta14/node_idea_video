# Start with server/server.js

#Heroku

(1) heroku login - for login
(2) heroku create <app name> - create as app
(3) ADD database
      heroku addons:create mongolab:sandbox (MONGODB)
      Heroku config
(4)git push heroku master - deploy
(5)heroku open - launch app

#body-parser

Node.js body parsing middleware.
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
Get as string from body and parse into JSON

#MONGODB

cd D:\MongoDB\Server\3.6\bin
mongod.exe --dbpath "D:\mongo_db"
