CONT_ID_FILE = scripts/.dev.cid
TAG = sethlessard/do-dydns

all: build-dev start-dev

.PHONY: build-dev
build-dev:
	docker build -t $(TAG) -f Dockerfile.dev .

.PHONY: clean
clean:
	./scripts/kill.sh

.PHONY: start-dev
start-dev: clean
	docker run -t -i -d --cidfile=$(CONT_ID_FILE) -p 9229:9229 -p 3000:3000 -p 3080:3080 $(TAG):latest

.PHONY: attach-dev
attach-dev:
	./scripts/attach-dev.sh

.PHONY: kill-dev
kill-dev:
	./scripts/kill.sh

.PHONY: build-prod
build-prod:
	docker build -t $(TAG) .

.PHONY: start-prod
start-prod:
	docker run -d -p 3000:3000 --restart=always $(TAG)
