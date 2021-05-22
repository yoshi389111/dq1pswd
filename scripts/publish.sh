#!/bin/bash

cd $(dirname $0)/..
( cd docs ; rm -rf static asset-manifest.json index.html robots.txt )
cp -rp build/* docs/
