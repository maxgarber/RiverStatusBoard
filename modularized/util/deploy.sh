#!/bin/bash

#	Deploy RiverStatusBoard to maxgarber.github.io
#	- currently just copies over files
#	- goals for future versions:
#		+ perform git commit to actually deploy
#		+ track versions?
#		+ replace more of deploy commands with variables

PWD=`pwd`

SOURCE="/Users/Max/Developer/GitHub/RiverStatusBoard"
TARGET="/Users/Max/Developer/GitHub/maxgarber.github.io/projects/web/riverstatusboard/"

ls -1 $SOURCE | grep -Ev '(old|deploy\.sh)' | xargs -n1 -I{} cp -R {} $TARGET

# EOF
