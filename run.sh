#!/bin/bash
npm i
docker-compose rm -f
docker-compose up -d --build
npm test # run unit test
echo "The graphql server is currently running on http://localhost:4000/graphql"