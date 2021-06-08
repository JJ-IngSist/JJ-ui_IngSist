# build environment
FROM node:15-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn-lock.json ./
RUN yarn autoclean --init
#RUN npm install react-scripts@3.4.1 -g
COPY . ./
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
