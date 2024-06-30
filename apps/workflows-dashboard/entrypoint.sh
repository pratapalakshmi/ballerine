#!/usr/bin/env bash

if [[ -z "$VITE_DOMAIN" ]]
then
    VITE_DOMAIN="localhost:3000"
fi

if [[ -z "$MODE" ]]
then
    MODE="development"
fi

cat << EOF > .env
VITE_API_URL=http://$VITE_DOMAIN/api/v1/
MODE=$MODE
VITE_IMAGE_LOGO_URL=
EOF

npm run dev --host
