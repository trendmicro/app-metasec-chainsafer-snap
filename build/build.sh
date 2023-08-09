#!/bin/bash 
set -e

#1={beta,prod} 2={major version} 3={minor version} 4={build number}

BUILD_ENV="${1}"
MAJOR_VERSION="${2}"
MINOR_VERSION="${3}"
BUILD_VERSION="${4}"

CURRENT_PATH=`pwd`

SCRIPT_PATH=$(dirname $0)
BASE_PATH="${CURRENT_PATH}/${SCRIPT_PATH}"

appVersion="${BASE_PATH}/version/prod/version.ts"
appVersionBak="${BASE_PATH}/version/prod/version.ts.bak"
cp "${appVersion}" "${appVersionBak}"
rm "${appVersion}"

sed s/{MAJOR_VERSION}/${MAJOR_VERSION}/g ${appVersionBak} \
  | sed s/{MINOR_VERSION}/${MINOR_VERSION}/g \
  | sed s/{BUILD_VERSION}/${BUILD_VERSION}/g \
  > ${appVersion}

echo "appVersion ${MAJOR_VERSION}.${MINOR_VERSION}.${BUILD_VERSION}"

echo "npm version"
npm -version

echo "ready to npm install"

#jenkins docker issue
#postinstall can not work automatically
#https://stackoverflow.com/questions/18136746/npm-install-failed-with-cannot-run-in-wd
npm install --unsafe-perm

echo "ready to run build"
if [ ${1} == "beta" ] 
then
  npm version ${MAJOR_VERSION}.${MINOR_VERSION}.${BUILD_VERSION} --no-git-tag-version
  npm run build:stag
else
  npm version ${MAJOR_VERSION}.${MINOR_VERSION}.${BUILD_VERSION} --no-git-tag-version
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

cp "${appVersionBak}" "${appVersion}"
rm "${appVersionBak}"
rm -rf node_modules

echo "build success"