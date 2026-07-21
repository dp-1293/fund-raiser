import { prisma, mockCategories, mockUsers, mockCampaigns, mockDonations, mockNGOs, mockVolunteers } from './services/store';

async function main() {
  console.log('🌱 Starting Prisma Database Seed Process...');

  try {
    // Seed Categories
    for (const cat of mockCategories) {
      await prisma.category.upsert({
        where: { id: cat.id },
        update: {},
        create: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
        },
      });
    }

    // Seed Users
    for (const user of mockUsers.slice(0, 10)) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          id: user.id,
          email: user.email,
          passwordHash: user.passwordHash,
          name: user.name,
          role: user.role as any,
          isVerified: user.isVerified,
          avatar: user.avatar,
        },
      });
    }

    console.log('✅ Prisma Database Seeded successfully!');
  } catch (error) {
    console.log('ℹ️ Database connection skip or seed notice:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
