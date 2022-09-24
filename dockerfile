FROM node:18-alpine
WORKDIR /opt/ntflx/client
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
