#!/bin/bash

PWD=`pwd`

SOURCE="/Users/Max/Developer/GitHub/RiverStatusBoard"
TARGET="/Users/Max/Developer/GitHub/maxgarber.github.io/projects/web/riverstatusboard/"

ls -1 $SOURCE | grep -Ev '(old|deploy\.sh)' | xargs -n1 -I{} cp -R {} $TARGET

# EOF
