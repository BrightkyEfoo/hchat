
import prisma from '../prisma'

export class Message {
  async findAll() {
    return await prisma.message.findMany()
  }

  async findById(id: number) {
    return await prisma.message.findUnique({ where: { id } })
  }

  async createMessage(data: any) {
    return await prisma.message.create({ data })
  }

  async updateMessage(id: number, data: any) {
    return await prisma.message.update({
      where: { id },
      data,
    })
  }

  async deleteMessage(id: number) {
    return await prisma.user.delete({ where: { id } })
  }
}

export const message = new Message()