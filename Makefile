CONT_ID_FILE = scripts/.dev.cid
TAG = sethlessard/do-dydns

all: build-prod

.PHONY: build-dev
build-dev:
	docker-compose -f docker-compose-dev.yml build

.PHONY: dev
dev: build-dev
	docker-compose -f docker-compose-dev.yml up --remove-orphans

.PHONY: build-prod
build-prod:
	docker-compose -f docker-compose-prod.yml build

.PHONY: prod
prod:
	docker-compose -f docker-compose-prod.yml up --remove-orphans
