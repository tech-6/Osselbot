#!/usr/bin/env bash
#logs in as Alex
cat ~/.GHTOKEN | docker login https://docker.pkg.github.com -u technicolor-creamsicle --password-stdin
#Builds the package
docker build --tag osselbot .
#pushes to github
docker tag osselbot:latest docker.pkg.github.com/techniclor-creamsicle/osselbot/osselbot:$1
docker push docker.pkg.github.com/techniclor-creamsicle/osselbot/osselbot:$1

echo build may have passed using version: $1
