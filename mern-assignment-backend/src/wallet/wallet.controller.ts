import { Body, Controller, Get, Post, Query, BadRequestException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AmountDto } from './dto/amount.dto';


@Controller('wallet')
export class WalletController {


  constructor(private readonly walletService: WalletService) { }

  @Get('balance')
  getBalance(@Query('userId') userId: string) {

    //added another validation
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    return {
      balance: this.walletService.getBalance(userId),
    };
  }

  @Post('credit')
  credit(@Body() body: AmountDto) {
    return {
      balance: this.walletService.credit(body.userId, body.amount),
    };
  }
  //removed await as we are using in memory db but if we were using realdb then we can do async await for db calls
  @Post('debit')
  debit(@Body() body: AmountDto) {
    const wallet = this.walletService.debit(body.userId, body.amount);
    return {
      balance: wallet,
    };
  }
}
