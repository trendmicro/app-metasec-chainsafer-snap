#!/bin/bash 
set -e

#1={test,stag,prod} 2={major version} 3={minor version} 4={build number}

BUILD_ENV="${1}"
MAJOR_VERSION="${2}"
MINOR_VERSION="${3}"
BUILD_VERSION="${4}"

CURRENT_PATH=`pwd`

appVersions="${MAJOR_VERSION}.${MINOR_VERSION}.${BUILD_VERSION}"
echo "appVersions ${appVersions}"

npm run update:version ${appVersions}
npm run update-snap-version this.version=\"${appVersions}\"

echo "npm version"
npm -version

echo "ready to npm install"

#jenkins docker issue
#postinstall can not work automatically
#https://stackoverflow.com/questions/18136746/npm-install-failed-with-cannot-run-in-wd
npm install --unsafe-perm

echo "ready to run build"
if [ ${1} == "stag" ] 
then
  npm run build:stag
elif [ ${1} == "test" ]; then
  npm run build:test
else
  npm run build
fi

fileName="${CURRENT_PATH}/snap-${BUILD_ENV}.tar.gz"
cd "${CURRENT_PATH}"

set +e 
tar -czf "${fileName}" ./
exitcode=$?

echo "exitcode: $exitcode"
if [ "$exitcode" != "1" ] && [ "$exitcode" != "0" ]; then
    exit $exitcode
fi
set -e

echo "build success"