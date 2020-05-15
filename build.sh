#!/usr/bin/env bash
#Builds the package
docker build --tag osselbot .
#pushes to github
docker tag osselbot:latest docker.pkg.github.com/techniclor-creamsicle/osselbot/osselbot:$0
docker push docker.pkg.github.com/techniclor-creamsicle/osselbot/osselbot:$0

echo 'build must have passed using version $0'
