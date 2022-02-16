import { Consumer, Kafka } from 'kafkajs';
import ClientService from '../client/service';

class KafkaConsumer {
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
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`consuming topic: ${topic}`);
        new ClientService().saveClient(message.value.toString());
      },
    });
  }
}

export default KafkaConsumer;
