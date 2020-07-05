#!/bin/bash

# start the frontend 
pushd "frontend/"
npm start &
popd

# start the api
pushd "api/"
node --inspect-brk=0.0.0.0:9229 index.js &
popd

fg %1
