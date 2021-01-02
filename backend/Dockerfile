FROM node:12
RUN mkdir -p /usr/src/app/backend
WORKDIR /usr/src/app/backend
COPY package.json /usr/src/app/backend
RUN npm install
COPY . /usr/src/app/backend
EXPOSE 3000
CMD ["npm","start"]