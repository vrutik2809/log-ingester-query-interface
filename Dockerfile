FROM node:16-alpine

ENV NODE_ENV=production

ENV PORT=3456

WORKDIR /home/app

COPY ["package.json", "package-lock.json", "./"]

# --omit=dev means that it will not install dev dependencies
RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "start"]