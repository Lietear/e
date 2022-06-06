FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY build/ ./build/
WORKDIR ./build
EXPOSE 5000
USER node
CMD ["npm", "run","start:build"]
