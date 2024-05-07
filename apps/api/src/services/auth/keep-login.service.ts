import prisma from "../../prisma";

export const keepLoginService = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error("Invalid user id");
    }

    return {
      message: "Keep login sucess",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
