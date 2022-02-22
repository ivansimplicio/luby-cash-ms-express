import { Kafka, Producer, Message } from 'kafkajs';
import Topics from './enums/Topics';

class ProducerService {
  private producer: Producer;

  constructor() {
    this.producer = new Kafka({
      clientId: 'luby-cash-ms-producer',
      brokers: ['kafka:29092'],
    }).producer();
  }

  private async send(topic: string, messages: Message[]) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages,
    });
    await this.producer.disconnect();
  }

  private async sendToTopic(topic: string, content: {}) {
    const message = { content };
    await this.send(topic.toString(), [{ value: JSON.stringify(message) }]);
  }

  public async produceTopicValuedClient(user: any) {
    this.sendToTopic(Topics.VALUED_CLIENT, { user });
  }
}

export default ProducerService;
