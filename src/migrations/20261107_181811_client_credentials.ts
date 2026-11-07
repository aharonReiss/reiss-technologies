import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "client_profiles_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"system" varchar NOT NULL,
  	"url" varchar,
  	"username" varchar,
  	"password" varchar,
  	"notes" varchar
  );
  
  ALTER TABLE "client_profiles_credentials" ADD CONSTRAINT "client_profiles_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."client_profiles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "client_profiles_credentials_order_idx" ON "client_profiles_credentials" USING btree ("_order");
  CREATE INDEX "client_profiles_credentials_parent_id_idx" ON "client_profiles_credentials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "client_profiles_credentials" CASCADE;`)
}
