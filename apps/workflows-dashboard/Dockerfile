FROM node:18.17.1-bullseye-slim

WORKDIR /app

COPY ./package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

ENV PATH="$PATH:./node_modules/.bin"

EXPOSE 5200

RUN rm -rf /root/.cache /root/.npm /usr/local/share/doc /usr/share/doc /usr/share/man /var/lib/apt/lists/* /tmp/*

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
