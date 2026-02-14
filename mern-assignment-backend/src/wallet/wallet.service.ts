import { Injectable, BadRequestException } from '@nestjs/common';

type Wallet = {
  userId: string;
  balance: number;
};



@Injectable()
export class WalletService {

  private wallets: Record<string, Wallet> = {
    u1: { userId: 'u1', balance: 100 },
  };

  //updated validation if no wallet found dont return 0 instead handle it properly 
  getBalance(userId: string) {
    const wallet = this.wallets[userId];
    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }
    return wallet.balance;
  }

  credit(userId: string, amount: number) {

    //nessassry validations on amount 
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }

    const wallet = this.wallets[userId];

    //if wallet exists
    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    wallet.balance += amount;
    return wallet.balance;
  }

  //removed await as we are using in memory db but if we were using realdb then we can do async await for db calls
  debit(userId: string, amount: number) {
    const wallet = this.wallets[userId];

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    //nessassry validation on amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }

    if (wallet.balance >= amount) {

      wallet.balance -= amount;

      //updated as readme format 
      return wallet.balance;
    }

    throw new BadRequestException('Insufficient balance');
  }


}
