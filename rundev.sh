#!/bin/bash
cd ./admin && yarn dev | 
sed -e 's/^/[admin] /' & 
cd ./api && yarn dev |
sed -e 's/^/[api] /' &&
kill $!