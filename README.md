# Dynamic DNS with DigitalOcean

| Branch | Build Status |
| --- | --- |
| master | [![Build Status](https://jenkins.sethlessard.com/buildStatus/icon?job=do-dydns%2Fmaster)](https://jenkins.sethlessard.com/job/do-dydns/job/master/) |


## Starting the Docker Container

```
# pull the latest image
docker pull sethlessard/do-dydns:v0.0.3

# start the do-dydns container
docker run --env API_TOKEN=<API_TOKEN_HERE> `
    --env DOMAIN=example.com `
    --env SUBDOMAINS=subdomain1.example.com,subdomain2.example.com `
    --restart=always `
    -d `
    sethlessard/do-dydns:v0.0.3
```