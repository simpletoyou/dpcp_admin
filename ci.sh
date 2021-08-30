#!/usr/bin/env bash

git status
git add --all
git commit -m $1

if [ -z $2 ]
then
    git push
else
    git push origin $2
fi
