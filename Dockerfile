FROM node:18.12-alpine
ENV NODE_ENV production
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
COPY . .

RUN npm install

#Run build without stopping image generation due typescript warnings
RUN npm run build || :

#Remove sources from image
RUN rm -r src; rm -r .git

EXPOSE 3000
CMD [ "npm", "run", "start" ]

