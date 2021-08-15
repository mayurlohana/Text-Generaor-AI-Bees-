Requires:
1. npm
2. nodejs
3. docker (for mongo)
4. docker-compose (for mongo)

1. extract the zip file.
2. open the terminal and navigate to the extracted folder
3. run ```npm install``` for installing the dependencies.
4. download the mongo.yml file from the ```https://raw.githubusercontent.com/mehrankamal/docker-compose-for-databases/master/mongo.yml``` to the working folder.
5. run ```docker-compose -f mongo.yml up``` to run the database.
6. run ```node index.js``` for running the server.
7. Now open postman or ThunderClient and send a GET request to "localhost:3000/comments" and if the response is success then the API is working.
8. The comment generation API is "POST localhost:3000/comments" with following JSON as input format for body:

{
    "tweet": "I love Javascript.",
    "category": "technology"
}
