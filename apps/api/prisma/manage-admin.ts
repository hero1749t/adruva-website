import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@adruvasolution.com';
  const name = 'Adruva Owner';
  const plainPassword = 'Admin@Adruva2026!';
  const role = 'owner';

  console.log(`Setting up admin user with email: ${email}...`);

  // Hash the password using bcryptjs
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

  // Check if user already exists
  const existingUser = await prisma.websiteAdminUser.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User already exists. Updating credentials and setting role to: ${role}...`);
    const updatedUser = await prisma.websiteAdminUser.update({
      where: { email },
      data: {
        name,
        passwordHash,
        role,
        isActive: true,
      },
    });
    console.log(`Success! Admin user updated. ID: ${updatedUser.id}`);
  } else {
    console.log(`User does not exist. Creating new admin user with role: ${role}...`);
    const newUser = await prisma.websiteAdminUser.create({
      data: {
        name,
        email,
        passwordHash,
        role,
        isActive: true,
      },
    });
    console.log(`Success! Admin user created. ID: ${newUser.id}`);
  }
}

main()
  .catch((e) => {
    console.error('Error running admin setup script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
