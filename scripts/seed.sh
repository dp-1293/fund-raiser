#!/bin/bash
set -e

echo "🌱 Running FundRaise Pro Database Seeder..."

cd backend
npx prisma db push --skip-generate
npx ts-node src/seed.ts
cd ..

echo "🎉 Database seeded with 50 users, 20 campaigns, 1000+ donations, 20 volunteers, 10 NGOs!"
