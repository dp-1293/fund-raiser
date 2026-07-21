#!/bin/bash
set -e

echo "🚀 Setting up FundRaise Pro environment..."

if [ ! -f .env ]; then
  echo "📋 Copying .env.example to .env..."
  cp .env.example .env
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install
npx prisma generate
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ FundRaise Pro setup completed successfully!"
