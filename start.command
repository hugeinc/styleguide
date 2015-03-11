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
	cd "$PROJECT_PATH" && cd styleguide/structure
	type grunt >/dev/null 2>&1
	if [ $? -eq 1 ]
	then
	    sudo npm install -g grunt-cli
	    sudo npm install
	    sudo gem install sass
	else
	    sudo npm install
	    sudo gem install sass
	fi
}

increaseUlimit() {
	cd ~ &&
	touch .bash_profile &&
	echo "ulimit -n 2048" >> .bash_profile &&
	source ~/.bash_profile &&
	cd "$PROJECT_PATH" && cd styleguide/structure
}

createLockFile() {
	cd "$PROJECT_PATH" &&
	touch .install.lock
}

run() {
	printf "\nLet's start this thing...\n"
	cd "$PROJECT_PATH" && cd styleguide/structure &&
	grunt serve
}

cd "$PROJECT_PATH" &&
if [ ! -f .install.lock ]; then
	type node >/dev/null 2>&1
	if [ $? -eq 1 ]
	then
	    type brew >/dev/null 2>&1
	    if [ $? -eq 1 ]
	    then
	        installHomebrew
	        installNode
	        installDependencies
	        increaseUlimit
	        createLockFile
	        run
	    else
	        installNode
	        installDependencies
	        increaseUlimit
	        createLockFile
	        run
	    fi
	else
	    installDependencies
	    increaseUlimit
	    createLockFile
	    run
	fi
else
	run
fi

