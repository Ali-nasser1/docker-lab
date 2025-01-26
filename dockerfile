FROM node:20 as base

FROM base as development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]

FROM base as production
WORKDIR /app
COPY package.json .
run npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]

# another way but don't forget to pass args
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi 