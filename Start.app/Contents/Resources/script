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

installDependencies() {
	printf "\nChecking dependencies...\n\n"
	printf "You might need to type your password\n"
	printf "don't be afraid!\n"
	type harp >/dev/null 2>&1
	if [ $? -eq 1 ]
	then
	    sudo npm install -g harp
	fi
}

increaseUlimit() {
	cd ~ &&
	touch .bash_profile &&
	echo "ulimit -n 2048" >> .bash_profile &&
	source ~/.bash_profile
}

createLockFile() {
	cd "$PROJECT_PATH"
	cd ../../..
	touch .install.lock
}

run() {
	cd "$PROJECT_PATH"
	printf "\nLet's start this thing...\n"
	cd ../../..
	echo "PROGRESS:100"
	open "http://localhost:9000"
	harp server
}
echo ""
echo "|  |  |  |  |   __|   __|"
echo "|     |  |  |  |  |   __|"
echo "|__|__|_____|_____|_____|"
echo ""
echo ""
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
	        installDependencies
	        echo "PROGRESS:80"
	        increaseUlimit
	        createLockFile
	        echo "PROGRESS:90"
	        run
	    else
	        installNode
	        echo "PROGRESS:50"
	        installDependencies
	        echo "PROGRESS:80"
	        increaseUlimit
	        createLockFile
	        echo "PROGRESS:90"
	        run
	    fi
	else
	    installDependencies
	    increaseUlimit
	    createLockFile
	    run
	fi
else
	echo "PROGRESS:90"
	run
fi

