
all: build-dev start-dev

.PHONY: build-dev
build-dev:
	docker build -t sethlessard/do-dydns - < Dockerfile.dev

.PHONY: start-dev
start-dev:
	docker run sethlessard/do-dydns

.PHONY: build-prod
build-prod:
	docker build -t sethlessard/do-dydns Dockerfile
