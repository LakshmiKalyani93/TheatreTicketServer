FROM node:12

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 4300

RUN npm install -g nodemon

CMD npm start