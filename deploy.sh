#!/bin/bash
set -e

echo "==============================="
echo "Deploy dimulai..."
echo "==============================="

cd /var/www/ceritakota

echo "Pull repository..."
git pull origin main

echo "Install Laravel dependency..."
cd backend
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "Migrate database..."
php artisan migrate --force

echo "Optimize Laravel..."
php artisan optimize

cd ..

echo "Install Node dependency..."
npm install

echo "Build Next.js..."
npm run build

echo "Restart PM2..."
pm2 restart all

echo "==============================="
echo "Deploy selesai!"
echo "==============================="
