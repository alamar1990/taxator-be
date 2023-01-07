FROM mhart/alpine-node:16.4.2
ENV NODE_ENV production
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "build/index.js"]
