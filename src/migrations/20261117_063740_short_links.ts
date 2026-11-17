import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "short_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"destination" varchar NOT NULL,
  	"active" boolean DEFAULT true,
  	"note" varchar,
  	"clicks" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "short_links_id" integer;
  CREATE UNIQUE INDEX "short_links_slug_idx" ON "short_links" USING btree ("slug");
  CREATE INDEX "short_links_updated_at_idx" ON "short_links" USING btree ("updated_at");
  CREATE INDEX "short_links_created_at_idx" ON "short_links" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_short_links_fk" FOREIGN KEY ("short_links_id") REFERENCES "public"."short_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_short_links_id_idx" ON "payload_locked_documents_rels" USING btree ("short_links_id");`)
  // The first links, ready on deploy. Existing slugs are left as they are.
  await db.execute(sql`
   INSERT INTO "short_links" ("slug", "destination", "active", "note", "clicks") VALUES
    ('ig', '/?utm_source=instagram&utm_medium=social&utm_campaign=bio', true, 'קישור בביו באינסטגרם', 0),
    ('wa', '/?utm_source=whatsapp&utm_medium=status&utm_campaign=status_share', true, 'שיתוף בסטטוס בוואטסאפ', 0),
    ('seaview', '/?utm_source=seaview&utm_medium=footer&utm_campaign=client_credit', true, 'קרדיט בפוטר של SEA VIEW', 0),
    ('hineni', '/?utm_source=hineni&utm_medium=footer&utm_campaign=client_credit', true, 'קרדיט בפוטר של הנני', 0),
    ('emuna', '/?utm_source=emuna-art&utm_medium=footer&utm_campaign=client_credit', true, 'קרדיט בפוטר של אמונה ארט', 0)
   ON CONFLICT ("slug") DO NOTHING;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "short_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "short_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_short_links_fk";
  
  DROP INDEX "payload_locked_documents_rels_short_links_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "short_links_id";`)
}
