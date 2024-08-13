#!/bin/bash
# docker run is the command to start a container (and download it if it isn't cached locally)
# docker run \
# --rm makes Docker delete this container when it is stopped
# --rm \
# --name postgres-13 gives the container its name
# --name postgres-13 \
# -p 127.0.0.1:5013:5432 exposes port 5432 (Postgres standard port) from the container to our local interface (127.0.0.1) on port 5013
# -p 127.0.0.1:5013:5432 \
# -v $HOME/docker/volumes/postgres-13:/var/lib/postgresql/data mounts the data directory we created earlier into the correct place inside the Postgres Docker container
# -v $HOME/docker/volumes/postgres-13:/var/lib/postgresql/data \
# -e POSTGRES_PASSWORD=postgres sets the connection password for the postgres user to postgres
# -e POSTGRES_PASSWORD=postgres \
# -d makes the container run in detached mode (in the background)
# -d \
# postgres:13-alpine describes the Docker image we want to use
# postgres:13-alpine

docker run --rm --name postgres-13 -p 127.0.0.1:5013:5432 -v $HOME/docker/volumes/postgres-13:/var/lib/postgresql/data -e POSTGRES_PASSWORD=postgres -d postgres:13-alpine

#from: https://mannes.tech/postgres-mac-docker/