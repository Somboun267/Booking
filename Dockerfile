FROM node:22

WORKDIR /usr/src/app

# copy package.json ก่อน
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code  
COPY . .

# generate Prisma client sum lup Linux
RUN npx prisma generate

# expose port
EXPOSE 3000

# run server
CMD ["node", "server.js"]
