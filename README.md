# Dynamic DNS with DigitalOcean

## Prerequisites

* [Make](https://www.gnu.org/software/make/)
* [Docker](https://www.docker.com/) 
* [Docker Compose](https://docs.docker.com/compose/install/)

## Building & Running from Source

Get the source:

```bash
git clone https://github.com/sethlessard/do-dydns.git
cd do-dydns/
```

### Building the Development Docker containers

```bash
make build-dev
```

### Running the Development Docker containers

```bash
make dev
```

This command also builds the containers before launch running.

### Building the Production Docker containers
```bash
make build-prod
```

### Running the Production Docker containers

```bash
make prod
```
