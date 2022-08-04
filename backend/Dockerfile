# Dockerfile adapted from
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:18

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
