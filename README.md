# Aero Code - Code review platform

## To run locally without docker:

add `LOCAL=true` in .env.local

## For docker: run all containers

```bash
docker-compose up -d
```

## run all containers in production build

```bash
docker-compose -f docker-compose.yml -f production.yml up -d
```

## rebuild and start all containers

```bash
docker-compose up -d --build
```

## show all running containers

```bash
docker ps
```

## show logs of our app

get id/name from `docker ps`

```bash
docker logs --follow [container id / name]
```

## close all containers

```bash
docker-compose down
```

## go inside a container

ash for alpine-linux

```bash
docker exec -it [container id / name] [bash / ash / any command]
```

## show all dockes images

```bash
docker images
```

## show all volumes

```bash
docker volume ls
```

## clean all unused volumes

```bash
docker volume prune
```
