FROM node:12
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend
COPY package.json /usr/src/app/frontend
RUN npm install
COPY . /usr/src/app/frontend
EXPOSE 4200
CMD ["npm","start"]