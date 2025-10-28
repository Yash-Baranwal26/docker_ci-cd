#Official node base Image
FROM node:22-alpine

#Set working directory for our container
WORKDIR /app

#Copy dependecy files
COPY package*.json ./

#Install dependecy
RUN npm install --production

#Copy all other project code (Expect those in .dockerignore)
COPY . .

#PORT app runs on 
EXPOSE 5000

# Run the app
ENTRYPOINT ["node", "index.js"]
