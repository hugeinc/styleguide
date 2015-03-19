#!/bin/bash
PROJECT_PATH=$(dirname "$0")

installHomebrew() {
	printf "\nInstalling Homebrew...\n"
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" &&
	brew update
}

installNode() {
	printf "\nInstalling Node.js...\n"
	brew install node
}

run() {
	cd "$PROJECT_PATH"
	printf "\nChecking dependencies...\n\n"
	type harp >/dev/null 2>&1
	if [ $? -eq 1 ]
	then
		npm install harp -g
	fi
	cd ../../../styleguide/structure/node-files
	npm install
	echo "PROGRESS:80"
	printf "\nLet's start this thing...\n"
	node watch.js
	echo "PROGRESS:100"
}

createLockFile() {
	cd "$PROJECT_PATH"
	cd ../../..
	touch .install.lock
}
echo "Huge Styleguide. Welcome!"
cd ../../..                      
if [ ! -f .install.lock ]; then
	echo "PROGRESS:0"
	type node >/dev/null 2>&1
	if [ $? -eq 1 ]
	then
	    type brew >/dev/null 2>&1
	    if [ $? -eq 1 ]
	    then
	        installHomebrew
	        echo "PROGRESS:20"
	        installNode
	        echo "PROGRESS:50"
	        run
	        createLockFile
	    else
	        installNode
	        echo "PROGRESS:50"
	        run
	        createLockFile
	    fi
	else
			echo "PROGRESS:50"
	    run
	    createLockFile
	fi
else
	echo "PROGRESS:50"
	run
fi