CONT_ID_FILE = docker/.dev.cid
TAG = sethlessard/do-dydns

all: build-dev start-dev

.PHONY: build-dev
build-dev:
	docker build -t $(TAG) - < Dockerfile.dev

.PHONY: clean
clean:
	rm -f $(CONT_ID_FILE)

.PHONY: start-dev
start-dev: clean
	docker run -t -i -d --cidfile=$(CONT_ID_FILE) -p 9229:9229 -p 3000:3000 -p 3080:3080 $(TAG):latest

.PHONY: attach-dev
attach-dev:
	./docker/attach-dev.sh

.PHONY: kill-dev
kill-dev:
	./docker/kill.sh

.PHONY: build-prod
build-prod:
	docker build -t $(TAG) .

.PHONY: start-prod
start-prod:
	docker run -d -p 3000:3000 --restart=always $(TAG)
