start:
	docker-compose -f ./docker/docker-compose.yaml up -d

watch:
	docker-compose -f ./docker/docker-compose.yaml up

shell-client:
	docker exec -it aiassist-client-service-container bash

shell-server:
	docker exec -it aiassist-server-service-container bash

shell-mongo:
	docker exec -it dkrcomp-mongo bash

stop:
	docker-compose -f ./docker/docker-compose.yaml down

build:
	docker-compose -f ./docker/docker-compose.yaml build

restart: stop start

rebuild: stop build start

.PHONY: start stop build
