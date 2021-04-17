# TheatreTicketServer Web Application

APIs for Theatre Ticket Management & Its analytics

1. Go to /config/dev.json and change any dev information need to be added

2. Go to /server/datasource.dev.json and change any mongodb related configuration need to be added

    	pm2 start ecosystem.config --env dev


Run Server Locally --> NODE_ENV=local node .  
Run Server in dev Mode --> NODE_ENV=dev node .


# Unit Testing 

1. Run the below commands to check unit test cases coverage 

    npm run test

    npm run coverage 

2. Go to Coverage/lcov-report/index.html to check for the unit test cases coverage   



# API Documentation

1. Go to /production-docs/api-doc/html folder, double click on ticket.html file to see the API Documentation & its usage


# Swagger Document

1. Go to /production-docs/swagger.json to see swagger document

