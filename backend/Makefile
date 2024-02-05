
DOCKE_COMPOSE_YAML = ./docker-compose.yml

all :
	echo "make build, make up, make down, make clean ..."

build :
	docker compose -f $(DOCKE_COMPOSE_YAML) build --no-cache

up :
	docker compose -f $(DOCKE_COMPOSE_YAML) up -d

down :
	docker compose -f $(DOCKE_COMPOSE_YAML) down

clean :
	docker image rm postgres:latest

env :
	cp .env.example .env

bash :
	docker exec -it backend /bin/bash

ps :
	docker container ls -a
	@echo "----------------------------------------"
	docker image ls -a
	@echo "----------------------------------------"
	docker volume ls
	@echo "----------------------------------------"
	docker network ls


.PHONY : all build up down clean env ps