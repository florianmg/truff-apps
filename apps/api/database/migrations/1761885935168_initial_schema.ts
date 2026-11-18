import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('organizations', table => {
      table.increments('id').notNullable()
      table.string('name').nullable()
      table.string('color').nullable()
      table.integer('logo_file_id').unsigned().nullable()
      table.index('logo_file_id')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('clients', table => {
      table.increments('id').notNullable()
      table
        .integer('organization_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table.index('organization_id')
      table.text('note').nullable()
      table.string('access_code', 32).nullable()
      table.string('floor', 255).nullable()
      table.boolean('social_media_consent').nullable()
      table.boolean('emergency_care_consent').nullable()
      table.integer('profile_file_id').unsigned().nullable()
      table.index('profile_file_id')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['id', 'organization_id'])
    })

    this.schema.createTable('contacts', table => {
      table.increments('id').notNullable()
      table
        .integer('organization_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table.index('organization_id')
      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
      table.index('client_id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email', 254).nullable()
      table.string('phone', 32).nullable()
      table.string('type').notNullable()
      table.boolean('is_primary').notNullable().defaultTo(false)
      table.boolean('prefers_whatsapp').notNullable().defaultTo(false)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table
        .foreign(['client_id', 'organization_id'])
        .references(['id', 'organization_id'])
        .inTable('clients')
        .onDelete('CASCADE')
    })

    const dialectName = this.db.dialect.name
    const primaryWhere =
      dialectName === 'better-sqlite3' || dialectName === 'sqlite3' || dialectName === 'libsql'
        ? 'is_primary = 1'
        : 'is_primary'

    this.schema.raw(
      `create unique index contacts_one_primary_per_client on contacts (client_id) where ${primaryWhere}`,
    )

    this.schema.createTable('addresses', table => {
      table.increments('id').notNullable()
      table
        .integer('organization_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table.index('organization_id')
      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
      table.text('formatted_address').notNullable()
      table.decimal('latitude', 10, 7).nullable()
      table.decimal('longitude', 11, 7).nullable()
      table.string('place_id', 255).nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table
        .foreign(['client_id', 'organization_id'])
        .references(['id', 'organization_id'])
        .inTable('clients')
        .onDelete('CASCADE')
    })

    this.schema.createTable('animals', table => {
      table.increments('id').notNullable()
      table
        .integer('organization_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table.index('organization_id')
      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
      table.index('client_id')
      table.string('name').notNullable()
      table.string('species').notNullable()
      table.string('breed').nullable()
      table.string('sex').nullable()
      table.boolean('sterilized').nullable()
      table.date('birth_date').nullable()
      table.date('adoption_date').nullable()
      table.string('weight').nullable()
      table.string('chip_number').nullable()
      table.string('tattoo').nullable()
      table.text('diet').nullable()
      table.text('food_instructions').nullable()
      table.integer('profile_file_id').unsigned().nullable()
      table.index('profile_file_id')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table
        .foreign(['client_id', 'organization_id'])
        .references(['id', 'organization_id'])
        .inTable('clients')
        .onDelete('CASCADE')
    })

    this.schema.createTable('users', table => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').nullable()
      table.string('google_id').nullable().unique()
      table
        .integer('organization_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table.index('organization_id')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('files', table => {
      table.increments('id').notNullable()
      table
        .integer('organization_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table.string('disk', 32).notNullable()
      table.string('key', 255).notNullable()
      table.string('original_name', 255).notNullable()
      table.string('extname', 16).notNullable()
      table.string('mime_type', 127).notNullable()
      table.integer('byte_size').unsigned().notNullable()
      table.string('visibility', 16).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['disk', 'key'])
      table.index('organization_id')
    })

    this.schema.alterTable('organizations', table => {
      table.foreign('logo_file_id').references('id').inTable('files').onDelete('SET NULL')
    })

    this.schema.alterTable('animals', table => {
      table.foreign('profile_file_id').references('id').inTable('files').onDelete('SET NULL')
    })

    this.schema.alterTable('clients', table => {
      table.foreign('profile_file_id').references('id').inTable('files').onDelete('SET NULL')
    })

    this.schema.createTable('animal_documents', table => {
      table.increments('id').notNullable()
      table
        .integer('animal_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('animals')
        .onDelete('CASCADE')
      table.index('animal_id')
      table
        .integer('file_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('files')
        .onDelete('CASCADE')
      table.index('file_id')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['animal_id', 'file_id'])
    })
  }

  async down() {
    this.schema.raw('drop index if exists contacts_one_primary_per_client')
    this.schema.dropTable('animal_documents')
    this.schema.alterTable('animals', table => {
      table.dropForeign('profile_file_id')
    })
    this.schema.alterTable('organizations', table => {
      table.dropForeign('logo_file_id')
    })
    this.schema.alterTable('clients', table => {
      table.dropForeign('profile_file_id')
    })
    this.schema.dropTable('files')
    this.schema.dropTable('animals')
    this.schema.dropTable('addresses')
    this.schema.dropTable('contacts')
    this.schema.dropTable('clients')
    this.schema.dropTable('users')
    this.schema.dropTable('organizations')
  }
}
