# Use bash sintaxe
SHELL := /bin/bash

export TZ=America/Sao_Paulo
export USER_ID=$(shell id -u)
export GROUP_ID=$(shell if [ `id -g` == 20 ]; then echo '1000'; else echo `id -g`; fi)

# Run all containers in detached mode
run:
	docker-compose up -d

clean:
	docker-compose down --rmi all

# Stop all containers related to the app
stop:
	docker-compose stop
