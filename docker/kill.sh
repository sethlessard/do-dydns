#!/bin/bash

if [[ -f "docker/.dev.cid" ]]; then
  docker kill $(cat docker/.dev.cid)
  rm -f docker/.dev.cid
fi
