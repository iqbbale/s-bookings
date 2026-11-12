#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/fe33fda51773c7c702a4d7372c8ff73bdefc099a6820c7b334cae2d329c47a48/contract';
import endContract from '../../snapshots/fe33fda51773c7c702a4d7372c8ff73bdefc099a6820c7b334cae2d329c47a48/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'amenities',
        columns: [
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'audit_logs',
        columns: [
          col('action', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('actor_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('entity_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('entity_type', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('ip_address', 'inet', { codecRef: { codecId: 'pg/inet@1' } }),
          col('metadata', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'auth_accounts',
        columns: [
          col('access_token', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('expires_at', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('provider', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('provider_account_id', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('refresh_token', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'booking_change_requests',
        columns: [
          col('booking_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('reason', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('request_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('requested_by_user_id', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('requested_end_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('requested_start_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('reviewed_by_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'booking_change_requests_request_type_check_68f5c7b8',
            sql`"request_type" IN ('CANCEL', 'RESCHEDULE')`,
          ),
          checkExpression(
            'booking_change_requests_status_check_56005a61',
            sql`"status" IN ('PENDING', 'APPROVED', 'REJECTED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'booking_status_histories',
        columns: [
          col('booking_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('changed_by_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('new_status', 'character varying(30)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('note', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('old_status', 'character varying(30)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'bookings',
        columns: [
          col('amount_due', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('amount_paid', 'int8', {
            notNull: true,
            default: lit('0'),
            codecRef: { codecId: 'pg/int8@1' },
          }),
          col('booking_code', 'character varying(30)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('confirmed_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('court_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('created_by_user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('currency', 'character varying(3)', {
            notNull: true,
            default: lit('IDR'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 3 } },
          }),
          col('customer_name', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('customer_phone', 'character varying(20)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 20 } },
          }),
          col('customer_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('end_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('expires_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('payment_received_by_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('price_snapshot', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('qr_token_hash', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('remaining_amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('source', 'text', {
            notNull: true,
            default: lit('ONLINE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('started_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('bookings_source_check_ea3a16e6', sql`"source" IN ('ONLINE', 'WALK_IN')`),
          checkExpression(
            'bookings_status_check_a7da2396',
            sql`"status" IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'commissions',
        columns: [
          col('amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('booking_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('commission_rate', 'numeric(5,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 5, scale: 2 } },
          }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('payment_transaction_id', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'commissions_status_check_3fb3b092',
            sql`"status" IN ('PENDING', 'SETTLED', 'REVERSED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'complaint_attachments',
        columns: [
          col('complaint_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('file_url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'complaints',
        columns: [
          col('booking_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('customer_user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('handle_by_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('resolution_note', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('OPEN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'complaints_status_check_04f93732',
            sql`"status" IN ('OPEN', 'IN_REVIEW', 'RESOLVED', 'REJECTED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'court_amenities',
        columns: [
          col('amenity_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('court_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['court_id', 'amenity_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'court_closures',
        columns: [
          col('court_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_by_user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('end_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('reason', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('start_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'court_images',
        columns: [
          col('court_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('image_url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('is_primary', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'court_sport_types',
        columns: [
          col('court_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('sport_types_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['court_id', 'sport_types_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'courts',
        columns: [
          col('capacity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('facility_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('price_per_hour', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('courts_status_check_ee520df2', sql`"status" IN ('ACTIVE', 'INACTIVE')`),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'facilities',
        columns: [
          col('address', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('latitude', 'numeric(10,7)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 7 } },
          }),
          col('longitude', 'numeric(10,7)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 7 } },
          }),
          col('name', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('owner_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'facilities_status_check_ee520df2',
            sql`"status" IN ('ACTIVE', 'INACTIVE')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'notifications',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('is_read', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('type', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'operating_hours',
        columns: [
          col('close_time', 'time', { notNull: true, codecRef: { codecId: 'pg/time-string@1' } }),
          col('court_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('day_of_week', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('is_closed', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('open_time', 'time', { notNull: true, codecRef: { codecId: 'pg/time-string@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'owner_profiles',
        columns: [
          col('business_address', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('business_name', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('latitude', 'numeric(10,7)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 7 } },
          }),
          col('longitude', 'numeric(10,7)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 7 } },
          }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('verification_status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'owner_profiles_verification_status_check_2b6b01db',
            sql`"verification_status" IN ('PENDING', 'VERIFIED', 'REJECTED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'owner_verification_documents',
        columns: [
          col('document_type', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('storage_key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('submission_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('uploaded_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'owner_verification_submissions',
        columns: [
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('owner_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('review_note', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('reviewed_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('reviewed_by_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('submitted_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'owner_verification_submissions_status_check_56005a61',
            sql`"status" IN ('PENDING', 'APPROVED', 'REJECTED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'payment_attempts',
        columns: [
          col('amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('booking_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('expires_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('gateway', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('gateway_reference', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'payment_attempts_status_check_a9b991f1',
            sql`"status" IN ('PENDING', 'PAID', 'FAILED', 'EXPIRED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'payment_transactions',
        columns: [
          col('amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('booking_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('channel', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('gateway_transaction_id', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('method', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('payment_attempt_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('received_by_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('verified_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'payment_transactions_channel_check_6bdfb67b',
            sql`"channel" IN ('ONLINE', 'ONSITE')`,
          ),
          checkExpression(
            'payment_transactions_method_check_e2fb6c97',
            sql`"method" IN ('TRANSFER', 'CASH', 'QRIS')`,
          ),
          checkExpression(
            'payment_transactions_status_check_c68c3ebe',
            sql`"status" IN ('SUCCESS', 'FAILED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'payout_allocations',
        columns: [
          col('amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('payment_transaction_id', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('payout_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'payouts',
        columns: [
          col('amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('owner_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('paid_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('reference', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'payouts_status_check_244899a6',
            sql`"status" IN ('PENDING', 'PROCESSING', 'PAID', 'FAILED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'refunds',
        columns: [
          col('amount', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('gateway_refund_id', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('payment_transaction_id', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('reason', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'refunds_status_check_f32a67f1',
            sql`"status" IN ('PENDING', 'SUCCESS', 'FAILED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'sessions',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('expires_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('ip_address', 'character varying(45)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 45 } },
          }),
          col('session_token', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('user_agent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'sport_types',
        columns: [
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'staff_assignment_permissions',
        columns: [
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('permission', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('staff_assignment_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'staff_assignment_permissions_permission_check_1aef4ef3',
            sql`"permission" IN ('MANAGE_BOOKING', 'CREATE_WALK_IN', 'RECEIVE_PAYMENT', 'MANAGE_CHECK_IN', 'VIEW_REPORTS')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'staff_assignments',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('ended_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('owner_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('staff_user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('started_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'staff_assignments_status_check_ee520df2',
            sql`"status" IN ('ACTIVE', 'INACTIVE')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'user_roles',
        columns: [
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'user_roles_role_check_94e364b1',
            sql`"role" IN ('CUSTOMER', 'OWNER', 'STAFF', 'ADMIN')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('avatar_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('email', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('email_verified_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('password_hash', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('phone', 'character varying(20)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 20 } },
          }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'webhook_events',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('event_type', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('payload', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
          col('processed_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('provider', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('provider_event_id', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'amenities',
        constraint: 'amenities_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'auth_accounts',
        constraint: 'auth_accounts_provider_provider_account_id_key',
        columns: ['provider', 'provider_account_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'bookings',
        constraint: 'bookings_booking_code_key',
        columns: ['booking_code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'operating_hours',
        constraint: 'operating_hours_court_id_day_of_week_key',
        columns: ['court_id', 'day_of_week'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'owner_profiles',
        constraint: 'owner_profiles_user_id_key',
        columns: ['user_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'sessions',
        constraint: 'sessions_session_token_key',
        columns: ['session_token'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'sport_types',
        constraint: 'sport_types_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'staff_assignment_permissions',
        constraint: 'staff_assignment_permissions_staff_assignment_id_permission_key',
        columns: ['staff_assignment_id', 'permission'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'staff_assignments',
        constraint: 'staff_assignments_owner_id_staff_user_id_key',
        columns: ['owner_id', 'staff_user_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user_roles',
        constraint: 'user_roles_user_id_role_key',
        columns: ['user_id', 'role'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'webhook_events',
        constraint: 'webhook_events_provider_provider_event_id_key',
        columns: ['provider', 'provider_event_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_action_entity_type_idx_41b555a3',
        columns: ['action', 'entity_type'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_actor_user_id_idx_c46ca325',
        columns: ['actor_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_entity_id_idx_5948f79a',
        columns: ['entity_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'auth_accounts',
        index: 'auth_accounts_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking_change_requests',
        index: 'booking_change_requests_booking_id_idx_aeea169b',
        columns: ['booking_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking_change_requests',
        index: 'booking_change_requests_requested_by_user_id_idx_6297d324',
        columns: ['requested_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking_change_requests',
        index: 'booking_change_requests_reviewed_by_user_id_idx_7ecf83d3',
        columns: ['reviewed_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking_status_histories',
        index: 'booking_status_histories_booking_id_idx_aeea169b',
        columns: ['booking_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking_status_histories',
        index: 'booking_status_histories_changed_by_user_id_idx_01d65e87',
        columns: ['changed_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookings',
        index: 'bookings_court_id_idx_54b872f1',
        columns: ['court_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookings',
        index: 'bookings_court_id_started_at_end_at_idx_962839a8',
        columns: ['court_id', 'started_at', 'end_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookings',
        index: 'bookings_created_by_user_id_idx_764eade2',
        columns: ['created_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookings',
        index: 'bookings_customer_user_id_idx_4403ea36',
        columns: ['customer_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookings',
        index: 'bookings_payment_received_by_user_id_idx_80b49e02',
        columns: ['payment_received_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'commissions',
        index: 'commissions_booking_id_idx_aeea169b',
        columns: ['booking_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'commissions',
        index: 'commissions_payment_transaction_id_idx_1ed9559f',
        columns: ['payment_transaction_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'complaint_attachments',
        index: 'complaint_attachments_complaint_id_idx_6698401d',
        columns: ['complaint_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'complaints',
        index: 'complaints_booking_id_idx_aeea169b',
        columns: ['booking_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'complaints',
        index: 'complaints_customer_user_id_idx_4403ea36',
        columns: ['customer_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'complaints',
        index: 'complaints_handle_by_user_id_idx_cd009d28',
        columns: ['handle_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_amenities',
        index: 'court_amenities_amenity_id_idx_dffbbf85',
        columns: ['amenity_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_amenities',
        index: 'court_amenities_court_id_idx_54b872f1',
        columns: ['court_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_closures',
        index: 'court_closures_court_id_idx_54b872f1',
        columns: ['court_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_closures',
        index: 'court_closures_created_by_user_id_idx_764eade2',
        columns: ['created_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_images',
        index: 'court_images_court_id_idx_54b872f1',
        columns: ['court_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_sport_types',
        index: 'court_sport_types_court_id_idx_54b872f1',
        columns: ['court_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'court_sport_types',
        index: 'court_sport_types_sport_types_id_idx_2150f830',
        columns: ['sport_types_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'courts',
        index: 'courts_facility_id_idx_b77b9551',
        columns: ['facility_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'courts',
        index: 'courts_name_facility_id_idx_0ac6bd41',
        columns: ['name', 'facility_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'facilities',
        index: 'facilities_name_owner_id_idx_633ed8a4',
        columns: ['name', 'owner_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'facilities',
        index: 'facilities_owner_id_idx_ade9f347',
        columns: ['owner_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'operating_hours',
        index: 'operating_hours_court_id_idx_54b872f1',
        columns: ['court_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'owner_profiles',
        index: 'owner_profiles_user_id_business_name_idx_d254e328',
        columns: ['user_id', 'business_name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'owner_verification_documents',
        index: 'owner_verification_documents_submission_id_idx_82020796',
        columns: ['submission_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'owner_verification_submissions',
        index: 'owner_verification_submissions_owner_id_idx_ade9f347',
        columns: ['owner_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'owner_verification_submissions',
        index: 'owner_verification_submissions_reviewed_by_user_id_idx_7ecf83d3',
        columns: ['reviewed_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_attempts',
        index: 'payment_attempts_booking_id_idx_aeea169b',
        columns: ['booking_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_attempts',
        index: 'payment_attempts_gateway_gateway_reference_idx_cc11efbe',
        columns: ['gateway', 'gateway_reference'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_transactions',
        index: 'payment_transactions_booking_id_idx_aeea169b',
        columns: ['booking_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_transactions',
        index: 'payment_transactions_payment_attempt_id_idx_d362ea02',
        columns: ['payment_attempt_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_transactions',
        index: 'payment_transactions_received_by_user_id_idx_ec2b0e43',
        columns: ['received_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payout_allocations',
        index: 'payout_allocations_payment_transaction_id_idx_1ed9559f',
        columns: ['payment_transaction_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payout_allocations',
        index: 'payout_allocations_payout_id_idx_66afae23',
        columns: ['payout_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payouts',
        index: 'payouts_owner_id_idx_ade9f347',
        columns: ['owner_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'refunds',
        index: 'refunds_payment_transaction_id_idx_1ed9559f',
        columns: ['payment_transaction_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sessions',
        index: 'sessions_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'staff_assignment_permissions',
        index: 'staff_assignment_permissions_staff_assignment_id_idx_ff523398',
        columns: ['staff_assignment_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'staff_assignments',
        index: 'staff_assignments_owner_id_idx_ade9f347',
        columns: ['owner_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'staff_assignments',
        index: 'staff_assignments_staff_user_id_idx_d5adc47f',
        columns: ['staff_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user_roles',
        index: 'user_roles_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_name_idx_ce87e6ba',
        columns: ['name'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'audit_logs',
        foreignKey: {
          name: 'audit_logs_actor_user_id_fkey',
          columns: ['actor_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'auth_accounts',
        foreignKey: {
          name: 'auth_accounts_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking_change_requests',
        foreignKey: {
          name: 'booking_change_requests_booking_id_fkey',
          columns: ['booking_id'],
          references: { schema: 'public', table: 'bookings', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking_change_requests',
        foreignKey: {
          name: 'booking_change_requests_requested_by_user_id_fkey',
          columns: ['requested_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking_change_requests',
        foreignKey: {
          name: 'booking_change_requests_reviewed_by_user_id_fkey',
          columns: ['reviewed_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking_status_histories',
        foreignKey: {
          name: 'booking_status_histories_booking_id_fkey',
          columns: ['booking_id'],
          references: { schema: 'public', table: 'bookings', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking_status_histories',
        foreignKey: {
          name: 'booking_status_histories_changed_by_user_id_fkey',
          columns: ['changed_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'bookings',
        foreignKey: {
          name: 'bookings_court_id_fkey',
          columns: ['court_id'],
          references: { schema: 'public', table: 'courts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'bookings',
        foreignKey: {
          name: 'bookings_customer_user_id_fkey',
          columns: ['customer_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'bookings',
        foreignKey: {
          name: 'bookings_created_by_user_id_fkey',
          columns: ['created_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'bookings',
        foreignKey: {
          name: 'bookings_payment_received_by_user_id_fkey',
          columns: ['payment_received_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'commissions',
        foreignKey: {
          name: 'commissions_booking_id_fkey',
          columns: ['booking_id'],
          references: { schema: 'public', table: 'bookings', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'commissions',
        foreignKey: {
          name: 'commissions_payment_transaction_id_fkey',
          columns: ['payment_transaction_id'],
          references: { schema: 'public', table: 'payment_transactions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'complaint_attachments',
        foreignKey: {
          name: 'complaint_attachments_complaint_id_fkey',
          columns: ['complaint_id'],
          references: { schema: 'public', table: 'complaints', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'complaints',
        foreignKey: {
          name: 'complaints_booking_id_fkey',
          columns: ['booking_id'],
          references: { schema: 'public', table: 'bookings', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'complaints',
        foreignKey: {
          name: 'complaints_customer_user_id_fkey',
          columns: ['customer_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'complaints',
        foreignKey: {
          name: 'complaints_handle_by_user_id_fkey',
          columns: ['handle_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_amenities',
        foreignKey: {
          name: 'court_amenities_court_id_fkey',
          columns: ['court_id'],
          references: { schema: 'public', table: 'courts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_amenities',
        foreignKey: {
          name: 'court_amenities_amenity_id_fkey',
          columns: ['amenity_id'],
          references: { schema: 'public', table: 'amenities', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_closures',
        foreignKey: {
          name: 'court_closures_court_id_fkey',
          columns: ['court_id'],
          references: { schema: 'public', table: 'courts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_closures',
        foreignKey: {
          name: 'court_closures_created_by_user_id_fkey',
          columns: ['created_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_images',
        foreignKey: {
          name: 'court_images_court_id_fkey',
          columns: ['court_id'],
          references: { schema: 'public', table: 'courts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_sport_types',
        foreignKey: {
          name: 'court_sport_types_court_id_fkey',
          columns: ['court_id'],
          references: { schema: 'public', table: 'courts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'court_sport_types',
        foreignKey: {
          name: 'court_sport_types_sport_types_id_fkey',
          columns: ['sport_types_id'],
          references: { schema: 'public', table: 'sport_types', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'courts',
        foreignKey: {
          name: 'courts_facility_id_fkey',
          columns: ['facility_id'],
          references: { schema: 'public', table: 'facilities', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'facilities',
        foreignKey: {
          name: 'facilities_owner_id_fkey',
          columns: ['owner_id'],
          references: { schema: 'public', table: 'owner_profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'notifications',
        foreignKey: {
          name: 'notifications_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'operating_hours',
        foreignKey: {
          name: 'operating_hours_court_id_fkey',
          columns: ['court_id'],
          references: { schema: 'public', table: 'courts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'owner_profiles',
        foreignKey: {
          name: 'owner_profiles_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'owner_verification_documents',
        foreignKey: {
          name: 'owner_verification_documents_submission_id_fkey',
          columns: ['submission_id'],
          references: {
            schema: 'public',
            table: 'owner_verification_submissions',
            columns: ['id'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'owner_verification_submissions',
        foreignKey: {
          name: 'owner_verification_submissions_owner_id_fkey',
          columns: ['owner_id'],
          references: { schema: 'public', table: 'owner_profiles', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'owner_verification_submissions',
        foreignKey: {
          name: 'owner_verification_submissions_reviewed_by_user_id_fkey',
          columns: ['reviewed_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment_attempts',
        foreignKey: {
          name: 'payment_attempts_booking_id_fkey',
          columns: ['booking_id'],
          references: { schema: 'public', table: 'bookings', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment_transactions',
        foreignKey: {
          name: 'payment_transactions_booking_id_fkey',
          columns: ['booking_id'],
          references: { schema: 'public', table: 'bookings', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment_transactions',
        foreignKey: {
          name: 'payment_transactions_payment_attempt_id_fkey',
          columns: ['payment_attempt_id'],
          references: { schema: 'public', table: 'payment_attempts', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment_transactions',
        foreignKey: {
          name: 'payment_transactions_received_by_user_id_fkey',
          columns: ['received_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payout_allocations',
        foreignKey: {
          name: 'payout_allocations_payout_id_fkey',
          columns: ['payout_id'],
          references: { schema: 'public', table: 'payouts', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payout_allocations',
        foreignKey: {
          name: 'payout_allocations_payment_transaction_id_fkey',
          columns: ['payment_transaction_id'],
          references: { schema: 'public', table: 'payment_transactions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payouts',
        foreignKey: {
          name: 'payouts_owner_id_fkey',
          columns: ['owner_id'],
          references: { schema: 'public', table: 'owner_profiles', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'refunds',
        foreignKey: {
          name: 'refunds_payment_transaction_id_fkey',
          columns: ['payment_transaction_id'],
          references: { schema: 'public', table: 'payment_transactions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'sessions',
        foreignKey: {
          name: 'sessions_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'staff_assignment_permissions',
        foreignKey: {
          name: 'staff_assignment_permissions_staff_assignment_id_fkey',
          columns: ['staff_assignment_id'],
          references: { schema: 'public', table: 'staff_assignments', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'staff_assignments',
        foreignKey: {
          name: 'staff_assignments_owner_id_fkey',
          columns: ['owner_id'],
          references: { schema: 'public', table: 'owner_profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'staff_assignments',
        foreignKey: {
          name: 'staff_assignments_staff_user_id_fkey',
          columns: ['staff_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'user_roles',
        foreignKey: {
          name: 'user_roles_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
