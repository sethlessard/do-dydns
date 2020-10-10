#!/bin/bash
set -ex

# make sure the frontend container was created (do-dydns_frontend)
docker ps | grep do-dydns_frontend
docker logs do-dydns_frontend_1 > frontend.log
cat frontend.log

# make sure the api container was created (do-dydns_api)
docker ps | grep do-dydns_api
docker logs do-dydns_api_1 > api.log
cat api.log

$apiLog = cat api.log
if [[ "$apiLog" != "Api listening at: 0.0.0.0:3080" ]]; then exit 1;

# make sure the api was started and accessible
curl localhost:3080/

# make sure the frontend was started and accessible
curl localhost:9090/