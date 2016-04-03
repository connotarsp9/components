#!/usr/bin/env bash
set -e

echo "=======  Starting build-and-test.sh  ========================================"

# Go to project dir
cd $(dirname $0)/../..

# Include sources.
source scripts/ci/sources/mode.sh
source scripts/ci/sources/tunnel.sh

# Setup environment.
if is_dart; then
  ./scripts/ci/install_dart.sh
  source scripts/ci/sources/env_dart.sh
fi

start_tunnel
npm run build
npm run inline-resources
echo
is_dart && pub install

wait_for_tunnel
if is_lint; then
  npm run tslint
  npm run ci:forbidden-identifiers
elif is_dart; then
  npm run dartanalyzer
elif is_e2e; then
  ng serve &
  sleep 20
  npm run e2e
else
  karma start test/karma.conf.js --single-run --no-auto-watch --reporters='dots'
fi
teardown_tunnel
