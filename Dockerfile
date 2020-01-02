
FROM node:10-alpine

#Establecer directorio de trabajo
WORKDIR /app

#Instala los paquetes existentes en el package.json

COPY . /app

RUN npm install --quiet

EXPOSE 3000
CMD ["npm", "start"]