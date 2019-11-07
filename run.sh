#!/bin/bash
npm i
docker-compose rm -f
docker-compose up -d --build
npm test
echo "The graphql server is currently running on http://localhost:4000/graphql"