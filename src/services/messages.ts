import { io } from '../app';
import { Messages } from '../database/models/message';
import { User } from '../database/models/users';

export default class MessageService {
  async sendMessage(
    senderId: string,
    recieverId: string,
    type: 'MEDIA' | 'DOCUMENT' | 'TEXT',
    text?: string,
    mediaObj?: any,
    document?: any
  ) {
    const sender = await User.findByPk(senderId);
    const reciever = await User.findByPk(recieverId);
    if(!sender || !reciever) return

    if (type === 'DOCUMENT') {
    } else if (type === 'MEDIA') {
    } else {
        // charger les donnes des users
        const message = await Messages.create({
            senderId,
            recieverId,
            text,
            sentAt : new Date,
            status : 'SENT'
        })
        // cas du texte
        io.to(reciever.socketId).emit('message', message)
    }
  }

  async getMessages(userId: string) {

    const messages 

    // retourner tous les messages dont le user est reciever du message et que le recievedAt soit null
    
  }
}
