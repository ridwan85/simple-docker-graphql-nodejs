#!/bin/bash
npm i
docker-compose down
docker-compose rm -f
docker-compose up -d --build
docker-compose logs app
sleep 5 # wait until server is up ( wait for 5 seconds atleast)
npm test # run unit test
export $(xargs <.env)
echo "The graphql server is currently running on http://localhost:${PORT}/graphql"