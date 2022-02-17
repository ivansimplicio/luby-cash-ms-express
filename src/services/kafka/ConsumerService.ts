import { Consumer, Kafka } from 'kafkajs';
import ClientService from '../client/ClientService';

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
        new ClientService().processClientRegistration(message.value.toString());
      },
    });
  }
}

export default ConsumerService;