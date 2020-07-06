#!/bin/bash

if [[ -f "scripts/.dev.cid" ]]; then
  docker kill $(cat scripts/.dev.cid)
  rm -f scripts/.dev.cid
fi
