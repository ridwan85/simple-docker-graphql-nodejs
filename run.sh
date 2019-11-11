#!/bin/bash
npm i
docker-compose rm -f
docker-compose up -d --build
sleep 10 # wait until server is up ( wait for 10 seconds atleast)
npm test # run unit test
echo "The graphql server is currently running on http://localhost:4000/graphql"