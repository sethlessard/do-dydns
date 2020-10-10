#!/bin/bash
set -ex

# make sure the frontend container was created (do-dydns_frontend)
docker ps | grep do-dydns_frontend

# make sure the api container was created (do-dydns_api)
docker ps | grep do-dydns_api

# make sure the api was started and accessible
curl localhost:3080/

# make sure the frontend was started and accessible
curl localhost:9090/
