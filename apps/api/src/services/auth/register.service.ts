import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const registerService = async (
  body: Pick<User, 'email' | 'fullName' | 'password'>,
) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });

    return {
      message: 'Sucess',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
