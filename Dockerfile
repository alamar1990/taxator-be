FROM node:18.12-alpine
ENV NODE_ENV production
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build || :
EXPOSE 3000
CMD [ "npm", "run", "start" ]

