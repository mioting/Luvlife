import { Knex } from "knex";

const userTableName = "users";
const folderTableName = "folders";
const purposeTableName = "purposes";
const milestoneTableName = "milestones";
const attachmentTableName = "attachments";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(userTableName, (table) => {
    table.increments();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("username").unique().notNullable();
    table.string("avatar");
    table.enu("gender", ["male", "female"]);
    table.date("date_of_birth");
    table.string("mobile");
    table.text("address");
    table.boolean("is_login").defaultTo(false);
    table.timestamp("last_login_at");
    table.timestamps(true, true, false);
  });

  await knex.schema.createTable(folderTableName, (table) => {
    table.increments();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references(`${userTableName}.id`);
    table.string("name").notNullable();
    table.string("cover_image");
    table.boolean("is_favourite").notNullable().defaultTo(false);
    table.timestamp("favourite_at");
    table.boolean("is_delete").notNullable();
    table.timestamps(true, true, false);
  });

  await knex.schema.createTable(purposeTableName, (table) => {
    table.increments();
    table.integer("folder_id").unsigned().notNullable();
    table.foreign("folder_id").references(`${folderTableName}.id`);
    table.enu("type", ["setGoal", "setTodo", "setRemainder"]).notNullable();
    table.string("title").notNullable();
    table.text("description");
    table.date("start_date");
    table.time("start_time");
    table.date("due_date");
    table.time("due_time");
    table.timestamp("finished_at");
    table.boolean("is_favourite").notNullable();
    table.timestamp("favourite_at");
    table.boolean("is_delete").notNullable();
    table.timestamps(true, true, false);
  });

  await knex.schema.createTable(milestoneTableName, (table) => {
    table.increments();
    table.integer("purpose_id").unsigned().notNullable();
    table.foreign("purpose_id").references(`${purposeTableName}.id`);
    table.string("title").notNullable();
    table.text("description");
    table.date("start_date");
    table.time("start_time");
    table.date("due_date");
    table.time("due_time");
    table.timestamp("finished_at");
    table.boolean("is_delete").notNullable();
    table.timestamps(true, true, false);
  });

  await knex.schema.createTable(attachmentTableName, (table) => {
    table.increments();
    table.integer("milestone_id").unsigned();
    table.foreign("milestone_id").references(`${milestoneTableName}.id`);
    table.integer("purpose_id").unsigned().notNullable();
    table.foreign("purpose_id").references(`${purposeTableName}.id`);
    table.enu("type", ["image", "weblink", "location", "voice"]);
    table.string("title").notNullable();
    table.string("voice_name");
    table.string("audioFile_name");
    table.text("location_address");
    table.string("image_name");
    table.string("imageFile_name");
    table.text("weblink_url");
    table.text("description");
    table.boolean("is_delete").notNullable();
    table.timestamps(true, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(attachmentTableName);
  await knex.schema.dropTableIfExists(milestoneTableName);
  await knex.schema.dropTableIfExists(purposeTableName);
  await knex.schema.dropTableIfExists(folderTableName);
  await knex.schema.dropTableIfExists(userTableName);
}
