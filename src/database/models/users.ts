// src/models/user.ts

import prisma from '../prisma'

export class User {
  async findAll() {
    return await prisma.user.findMany()
  }

  async findById(id: number) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async createUser(data: any) {
    return await prisma.user.create({ data })
  }

  async updateUser(id: number, data: any) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } })
  }
}

export const user = new User()








