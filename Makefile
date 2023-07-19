start:
	docker-compose -f ./docker-compose.yaml up -d

watch:
	docker-compose -f ./docker-compose.yaml up

shell-client:
	docker exec -it aiassist-client-service-container bash

shell-server:
	docker exec -it aiassist-server-service-container bash

shell-mongo:
	docker exec -it dkrcomp-mongo bash

stop:
	docker-compose -f ./docker-compose.yaml down

build:
	docker-compose -f ./docker-compose.yaml build

restart: stop start
restartw: stop watch

rebuild: stop build start
rebuildw: stop build watch

.PHONY: start stop build
