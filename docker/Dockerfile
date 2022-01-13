FROM node:14.5

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY ./dist /app
RUN npm install
CMD [ "npm", "start" ]