const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordUser = await hash("user12345", 12);
  // Seed normal User
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "John Doe",
      image: "http://example.com/image.jpg",
      role: "USER",
      password: passwordUser,
    },
  });

  const passwordAdmin = await hash("admin12345", 12);
  // Seed admin User
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Jane Doe",
      image: "http://example.com/image.jpg",
      role: "ADMIN",
      password: passwordAdmin,
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
