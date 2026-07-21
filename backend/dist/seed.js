"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./services/store");
async function main() {
    console.log('🌱 Starting Prisma Database Seed Process...');
    try {
        // Seed Categories
        for (const cat of store_1.mockCategories) {
            await store_1.prisma.category.upsert({
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
        for (const user of store_1.mockUsers.slice(0, 10)) {
            await store_1.prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    id: user.id,
                    email: user.email,
                    passwordHash: user.passwordHash,
                    name: user.name,
                    role: user.role,
                    isVerified: user.isVerified,
                    avatar: user.avatar,
                },
            });
        }
        console.log('✅ Prisma Database Seeded successfully!');
    }
    catch (error) {
        console.log('ℹ️ Database connection skip or seed notice:', error);
    }
    finally {
        await store_1.prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed.js.map