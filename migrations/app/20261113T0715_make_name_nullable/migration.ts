#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/02ddd746825d389e8c370a911e43e59f4c605420bf4bfada7bcaf741cd04357e/contract';
import startContract from '../../snapshots/02ddd746825d389e8c370a911e43e59f4c605420bf4bfada7bcaf741cd04357e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/cddd8463de5d760540d994d88692ad2f6c97037efc4e0bed000ac42a699c6469/contract';
import endContract from '../../snapshots/cddd8463de5d760540d994d88692ad2f6c97037efc4e0bed000ac42a699c6469/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropNotNull({ schema: 'public', table: 'users', column: 'name' })];
  }
}

MigrationCLI.run(import.meta.url, M);
