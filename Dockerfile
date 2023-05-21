FROM node:16

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev", "--", "--port", "3000"]
