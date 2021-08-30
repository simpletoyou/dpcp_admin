#!/bin/bash
# 使用这个脚步进行测试环境和线上环境的部署即可, 暂时不需要md5

git status
git add --all
git commit -m $1
git pull origin master
git push origin master;
gulp scp:dev

