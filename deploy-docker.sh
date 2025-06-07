#!/bin/bash

# Aller dans le dossier deployment
cd "$(dirname "$0")/deployment"

# Construire et démarrer les conteneurs
# docker-compose down -v
docker compose -f docker-compose.yml up -d --build --force-recreate
