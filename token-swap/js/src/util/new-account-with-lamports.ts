import {Account, Connection, Keypair, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js';

import {sleep} from './sleep';

export async function newAccountWithLamports(
  connection: Connection,
  lamports: number = 1000000,
  fromKeypair: Keypair
): Promise<Account> {
  const account = new Account();

  const transferTransaction = new Transaction()
  .add(SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: account.publicKey,
    lamports,
  }))

  await sendAndConfirmTransaction(connection, transferTransaction, [fromKeypair]);
  console.log(account.secretKey.toString())
  return account;
}
