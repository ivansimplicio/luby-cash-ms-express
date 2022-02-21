import { Consumer, Kafka } from 'kafkajs';
import ClientService from '../client/ClientService';
import TransferService from '../transfer/TranferService';

class ConsumerService {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'luby-cash-ms-consumer',
      brokers: ['kafka:29092'],
    });
    this.consumer = kafka.consumer({ groupId: 'luby-cash-ms' });
  }

  public async consume(topic: string) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (topic === 'transfer_made') {
          new TransferService().completeTransfer(message.value.toString());
        }
        if (topic === 'customer_registration') {
          new ClientService().processClientRegistration(
            message.value.toString()
          );
        }
        if (topic === 'forgot_password') {
          new ClientService().sendEmailForgotPassword(message.value.toString());
        }
      },
    });
  }
}

export default ConsumerService;
