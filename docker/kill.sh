#!/bin/bash

if [[ -f ".dev.cid" ]]; then
  docker kill $(cat .dev.cid)
  rm -f .dev.cid
fi
