# From https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the out directory
rm -rf www || exit 0;

# run our compile script, discussed above
./build.sh

# go to the out directory and create a *new* Git repo
cd www
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "cavaccaro@hugeinc.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy from Travis CI".
git add --all
git commit -a -m "Automatic Deploy from Travis CI"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages