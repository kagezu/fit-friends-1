FROM node:18.17-alpine
WORKDIR /opt/app
COPY ./dist/apps/app/package.json .
RUN npm install -omit=dev
COPY ./dist/apps/app .
CMD ["node", "./main.js"]
