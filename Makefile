
all: build-dev start-dev

.PHONY: build-dev
build-dev:
	docker build -t sethlessard/do-dydns - < Dockerfile.dev

.PHONY: start-dev
start-dev:
	rm -f .dev.cid
	docker run -t -i -d --cidfile=.dev.cid -p 9229:9229 sethlessard/do-dydns

.PHONY: attach-dev
attach-dev:
	./run-dev.sh

.PHONY: kill-dev
kill-dev:
	./kill.sh

.PHONY: build-prod
build-prod:
	docker build -t sethlessard/do-dydns .

.PHONY: start-prod
start-prod:
	docker run -d --restart=always sethlessard/do-dydns
