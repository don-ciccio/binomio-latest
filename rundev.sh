#!/bin/bash
cd ./admin && yarn dev | 
sed -e 's/^/[admin] /' & 
cd ./client && yarn dev | 
sed -e 's/^/[client] /' & 
cd ./api && yarn dev |
sed -e 's/^/[api] /' &&
kill $!