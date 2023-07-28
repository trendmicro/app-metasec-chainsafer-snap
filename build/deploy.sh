#!/bin/bash
set -e

#1={NPMEMAIL} 2={NPMUSERNAME} 3={NPM_AUTH_TOKEN}

#add npm deploy key
NPM_EMAIL="${1}"
NPM_USERNAME="${2}"
NPM_AUTH_TOKEN="${3}"

echo "_authToken = ${NPM_AUTH_TOKEN}" >> ~/.npmrc
echo "username=${NPM_USERNAME}" >> ~/.npmrc
echo "email=${NPM_EMAIL}" >> ~/.npmrc


#jenkins docker issue
#postinstall can not work automatically
#https://stackoverflow.com/questions/18136746/npm-install-failed-with-cannot-run-in-wd
npm install --unsafe-perm

set +e 
#push to npm
npm publish --access public

#if npm package exist, will ignore error
exitcode=$?
echo "exitcode: $exitcode"
if [ "$exitcode" != "1" ]; then
    exit $exitcode
fi

set -e