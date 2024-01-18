const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Seed the User table
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "John Doe",
      image: "http://example.com/image.jpg",
      role: "USER", // or 'ADMIN'
      // Add other fields as necessary
    },
  });

  console.log(`User created: ${user.email}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
