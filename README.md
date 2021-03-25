# DO-DyDns: Dynamic DNS with Digital Ocean

TODO: build status, code coverage

## Why

Dynamic DNS for free? Why not? Also, I wanted to try out the the [nx.dev](https://nx.dev) monorepo setup (you should too).

## How

### Prerequisites

1. Create an account on [Digital Ocean](https://digitalocean.com).
2. Have (or obtain) a domain with your favorite domain name provider.
3. [Register your domain to use Digital Ocean's nameservers.](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)
4. [Add your domain to your Digital Ocean account.](https://www.digitalocean.com/docs/networking/dns/how-to/add-domains/)
5. Have docker installed on the system you'd like to run `DO-DyDns` on.

### Running DO-DyDns

To get started with DO-DyDns, simply run:

```bash
docker -d -p 8080:8080 \
       -p 32333:32333 \
       --restart unless-stopped \
       --name do-dydns \
       sethlessard/do-dydns:latest
```

`DO-DyDns` will be accessible from port 8080. Navigate to http://localhost:8080 or `http://<your-private-ip>:8080`.

If you wish, you can change change the web service port that `DO-DyDns` uses (8080), but `-p 32333:32333` must remain for the web service to correctly communicate with `DO-DyDns`'s API. If you wish to change the web service port, you must also pass `-e WEB_PORT=<YOUR PORT HERE>`.

#### Creating your Digital Ocean API Key

You'll have to create an API key with Digital Ocean for `DO-DyDns` to use to access the domains in your Digital Ocean account. In the future, signing in via Digital Ocean's OAuth2.0 server will be supported.

Instructions to create your API key can be found [here](https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/). `DO-DyDns` requires both the `read` and `write` access scopes.

After you've created your Digital Ocean API key, register it on `DO-DyDns`'s Settings page.

That's it! You're ready to start anchoring your domains/subdomains to the public-facing IP Address of the network that `DO-DyDns` is running on.
