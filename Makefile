all: prod

.PHONY: dev
dev: 
	docker-compose --project-name 'do-dydns-dev' -f docker-compose-dev.yml up --remove-orphans --build

.PHONY: prod
prod:
	docker-compose --project-name 'do-dydns' -f docker-compose-prod.yml up --remove-orphans -d --build