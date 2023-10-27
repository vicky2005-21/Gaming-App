#!/bin/bash
echo What should the version be?
read VERSION

if [[ -z $VERSION ]];
then
    echo "building with version:latest"
    echo "removing any previous latest version:latest"
    docker rmi cece_app
    docker build -t cece_app:latest .
else
    echo "building with version:"$VERSION
    docker build -t cece_app:$VERSION .
fi