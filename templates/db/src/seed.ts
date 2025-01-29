import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding data...');

  // Create 10 users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const id = faker.string.uuid().slice(0, 12); // 12-char ID
      return prisma.user.create({
        data: {
          id,
          username: faker.internet.username(),
          name: faker.person.fullName(),
          createdAt: faker.date.past({ years: 2 }),
          updatedAt: faker.date.recent(),
        },
      });
    }),
  );

  console.log('✅ Users seeded:', users.length);

  // Create 20 posts
  const posts = await Promise.all(
    Array.from({ length: 20 }).map(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      return prisma.post.create({
        data: {
          id: faker.string.uuid().slice(0, 12), // 12-char ID
          userId: randomUser.id,
          content: faker.lorem.sentence(),
          createdAt: faker.date.past({ years: 1 }),
          updatedAt: faker.date.recent(),
        },
      });
    }),
  );

  console.log('✅ Posts seeded:', posts.length);

  console.log('🌱 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
