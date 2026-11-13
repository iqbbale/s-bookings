#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/02ddd746825d389e8c370a911e43e59f4c605420bf4bfada7bcaf741cd04357e/contract';
import endContract from '../../snapshots/02ddd746825d389e8c370a911e43e59f4c605420bf4bfada7bcaf741cd04357e/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fe33fda51773c7c702a4d7372c8ff73bdefc099a6820c7b334cae2d329c47a48/contract';
import startContract from '../../snapshots/fe33fda51773c7c702a4d7372c8ff73bdefc099a6820c7b334cae2d329c47a48/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropNotNull({ schema: 'public', table: 'users', column: 'password_hash' }),
      this.dropNotNull({ schema: 'public', table: 'users', column: 'phone' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
