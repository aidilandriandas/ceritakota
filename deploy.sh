#!/bin/bash
set -e

echo "================================="
echo "Deploy dimulai..."
echo "================================="

cd /var/www/ceritakota

git fetch origin
git reset --hard origin/main

npm ci

npm run build

pm2 restart ceritakota --update-env

echo "================================="
echo "Deploy selesai!"
echo "================================="