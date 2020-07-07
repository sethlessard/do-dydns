#!/bin/bash

# start the api
pushd "api/" > /dev/null 2>&1
node --inspect-brk=0.0.0.0:9229 index.js &
popd > /dev/null 2>&1


# start the frontend 
pushd "frontend/" > /dev/null 2>&1
npm start
popd > /dev/null 2>&1
