import ClientRepository from '../../repository/ClientRepository';
import Mailer from '../nodemailer/Mailer';
import { convertToReal } from '../util/converter';

export default class TransferService {
  public async completeTransfer(content: any) {
    const transfer = JSON.parse(content).content.transfer;
    const clientOrigin = await ClientRepository.withdraw(
      transfer.cpfOrigin,
      transfer.value
    );
    const clientDestination = await ClientRepository.deposit(
      transfer.cpfDestination,
      transfer.value
    );
    await Mailer.sendEmail(
      'transfer_sent',
      'Luby Cash: Pix enviado!',
      clientOrigin,
      {
        cpfDestination: transfer.cpfDestination,
        value: convertToReal(transfer.value),
        currentBalance: convertToReal(clientOrigin.currentBalance),
      }
    );
    await Mailer.sendEmail(
      'received_transfer',
      'Luby Cash: Pix recebido!',
      clientDestination,
      {
        cpfOrigin: transfer.cpfOrigin,
        value: convertToReal(transfer.value),
        currentBalance: convertToReal(clientDestination.currentBalance),
      }
    );
  }
}
