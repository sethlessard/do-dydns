CONT_ID_FILE = scripts/.dev.cid
TAG = sethlessard/do-dydns

all: build-dev start-dev

.PHONY: build-dev
build-dev:
	docker-compose -f docker-compose-dev.yml build

.PHONY: start-dev
start-dev:
	docker-compose -f docker-compose-dev.yml up

.PHONY: build-prod
build-prod:
	docker build -t $(TAG) .

.PHONY: start-prod
start-prod:
	docker run -d -p 3080:3080 --restart=always $(TAG)
