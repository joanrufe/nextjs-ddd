const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const { testUser, testAdmin } = require("../testData");

const prisma = new PrismaClient();

const cleanUp = async () => {
  await prisma.user.deleteMany();
};

async function main() {
  await cleanUp();
  // console.log(testUser.password);
  const passwordUser = await hash(testUser.password, 12);
  // Seed normal User
  const user = await prisma.user.create({
    data: {
      ...testUser,
      password: passwordUser,
    },
  });

  const passwordAdmin = await hash(testAdmin.password, 12);
  // Seed admin User
  const admin = await prisma.user.create({
    data: {
      ...testAdmin,
      password: passwordAdmin,
    },
  });

  console.log(`User created: ${user.email}`);
  console.log(`Admin created: ${admin.email}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
