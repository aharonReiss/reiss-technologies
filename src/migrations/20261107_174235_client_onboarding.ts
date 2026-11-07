import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_client_profiles_status" AS ENUM('not-started', 'in-progress', 'completed');
  CREATE TYPE "public"."enum_questionnaire_sections_questions_type" AS ENUM('text', 'textarea', 'radio', 'checkbox', 'select', 'yesno', 'url', 'file', 'image');
  CREATE TYPE "public"."enum_questionnaire_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__questionnaire_v_version_sections_questions_type" AS ENUM('text', 'textarea', 'radio', 'checkbox', 'select', 'yesno', 'url', 'file', 'image');
  CREATE TYPE "public"."enum__questionnaire_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "client_profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"business_name" varchar,
  	"project_name" varchar,
  	"notes" varchar,
  	"status" "enum_client_profiles_status" DEFAULT 'not-started' NOT NULL,
  	"last_activity_at" timestamp(3) with time zone,
  	"submitted_at" timestamp(3) with time zone,
  	"link_active" boolean DEFAULT true,
  	"archived" boolean DEFAULT false,
  	"full_name" varchar,
  	"token" varchar,
  	"questionnaire" jsonb,
  	"answers" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "client_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_id" integer NOT NULL,
  	"original_name" varchar,
  	"question_id" varchar,
  	"question_label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "questionnaire_sections_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "questionnaire_sections_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_questionnaire_sections_questions_type" DEFAULT 'text',
  	"required" boolean,
  	"help" varchar,
  	"placeholder" varchar,
  	"multiple" boolean DEFAULT true
  );
  
  CREATE TABLE "questionnaire_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "questionnaire" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar,
  	"closing_title" varchar DEFAULT 'תודה, קיבלנו הכול',
  	"closing_text" varchar,
  	"max_file_size_m_b" numeric DEFAULT 25,
  	"_status" "enum_questionnaire_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_questionnaire_v_version_sections_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_questionnaire_v_version_sections_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__questionnaire_v_version_sections_questions_type" DEFAULT 'text',
  	"required" boolean,
  	"help" varchar,
  	"placeholder" varchar,
  	"multiple" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_questionnaire_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_questionnaire_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_intro" varchar,
  	"version_closing_title" varchar DEFAULT 'תודה, קיבלנו הכול',
  	"version_closing_text" varchar,
  	"version_max_file_size_m_b" numeric DEFAULT 25,
  	"version__status" "enum__questionnaire_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "client_profiles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "client_files_id" integer;
  ALTER TABLE "client_files" ADD CONSTRAINT "client_files_client_id_client_profiles_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client_profiles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "questionnaire_sections_questions_options" ADD CONSTRAINT "questionnaire_sections_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaire_sections_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questionnaire_sections_questions" ADD CONSTRAINT "questionnaire_sections_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaire_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questionnaire_sections" ADD CONSTRAINT "questionnaire_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questionnaire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_questionnaire_v_version_sections_questions_options" ADD CONSTRAINT "_questionnaire_v_version_sections_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_questionnaire_v_version_sections_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_questionnaire_v_version_sections_questions" ADD CONSTRAINT "_questionnaire_v_version_sections_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_questionnaire_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_questionnaire_v_version_sections" ADD CONSTRAINT "_questionnaire_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_questionnaire_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "client_profiles_archived_idx" ON "client_profiles" USING btree ("archived");
  CREATE INDEX "client_profiles_full_name_idx" ON "client_profiles" USING btree ("full_name");
  CREATE UNIQUE INDEX "client_profiles_token_idx" ON "client_profiles" USING btree ("token");
  CREATE INDEX "client_profiles_updated_at_idx" ON "client_profiles" USING btree ("updated_at");
  CREATE INDEX "client_profiles_created_at_idx" ON "client_profiles" USING btree ("created_at");
  CREATE INDEX "client_files_client_idx" ON "client_files" USING btree ("client_id");
  CREATE INDEX "client_files_question_id_idx" ON "client_files" USING btree ("question_id");
  CREATE INDEX "client_files_updated_at_idx" ON "client_files" USING btree ("updated_at");
  CREATE INDEX "client_files_created_at_idx" ON "client_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "client_files_filename_idx" ON "client_files" USING btree ("filename");
  CREATE INDEX "client_files_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "client_files" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "questionnaire_sections_questions_options_order_idx" ON "questionnaire_sections_questions_options" USING btree ("_order");
  CREATE INDEX "questionnaire_sections_questions_options_parent_id_idx" ON "questionnaire_sections_questions_options" USING btree ("_parent_id");
  CREATE INDEX "questionnaire_sections_questions_order_idx" ON "questionnaire_sections_questions" USING btree ("_order");
  CREATE INDEX "questionnaire_sections_questions_parent_id_idx" ON "questionnaire_sections_questions" USING btree ("_parent_id");
  CREATE INDEX "questionnaire_sections_order_idx" ON "questionnaire_sections" USING btree ("_order");
  CREATE INDEX "questionnaire_sections_parent_id_idx" ON "questionnaire_sections" USING btree ("_parent_id");
  CREATE INDEX "questionnaire__status_idx" ON "questionnaire" USING btree ("_status");
  CREATE INDEX "_questionnaire_v_version_sections_questions_options_order_idx" ON "_questionnaire_v_version_sections_questions_options" USING btree ("_order");
  CREATE INDEX "_questionnaire_v_version_sections_questions_options_parent_id_idx" ON "_questionnaire_v_version_sections_questions_options" USING btree ("_parent_id");
  CREATE INDEX "_questionnaire_v_version_sections_questions_order_idx" ON "_questionnaire_v_version_sections_questions" USING btree ("_order");
  CREATE INDEX "_questionnaire_v_version_sections_questions_parent_id_idx" ON "_questionnaire_v_version_sections_questions" USING btree ("_parent_id");
  CREATE INDEX "_questionnaire_v_version_sections_order_idx" ON "_questionnaire_v_version_sections" USING btree ("_order");
  CREATE INDEX "_questionnaire_v_version_sections_parent_id_idx" ON "_questionnaire_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_questionnaire_v_version_version__status_idx" ON "_questionnaire_v" USING btree ("version__status");
  CREATE INDEX "_questionnaire_v_created_at_idx" ON "_questionnaire_v" USING btree ("created_at");
  CREATE INDEX "_questionnaire_v_updated_at_idx" ON "_questionnaire_v" USING btree ("updated_at");
  CREATE INDEX "_questionnaire_v_latest_idx" ON "_questionnaire_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_client_profiles_fk" FOREIGN KEY ("client_profiles_id") REFERENCES "public"."client_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_client_files_fk" FOREIGN KEY ("client_files_id") REFERENCES "public"."client_files"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_client_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("client_profiles_id");
  CREATE INDEX "payload_locked_documents_rels_client_files_id_idx" ON "payload_locked_documents_rels" USING btree ("client_files_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "client_profiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "client_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaire_sections_questions_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaire_sections_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaire_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questionnaire" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_questionnaire_v_version_sections_questions_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_questionnaire_v_version_sections_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_questionnaire_v_version_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_questionnaire_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "client_profiles" CASCADE;
  DROP TABLE "client_files" CASCADE;
  DROP TABLE "questionnaire_sections_questions_options" CASCADE;
  DROP TABLE "questionnaire_sections_questions" CASCADE;
  DROP TABLE "questionnaire_sections" CASCADE;
  DROP TABLE "questionnaire" CASCADE;
  DROP TABLE "_questionnaire_v_version_sections_questions_options" CASCADE;
  DROP TABLE "_questionnaire_v_version_sections_questions" CASCADE;
  DROP TABLE "_questionnaire_v_version_sections" CASCADE;
  DROP TABLE "_questionnaire_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_client_profiles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_client_files_fk";
  
  DROP INDEX "payload_locked_documents_rels_client_profiles_id_idx";
  DROP INDEX "payload_locked_documents_rels_client_files_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "client_profiles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "client_files_id";
  DROP TYPE "public"."enum_client_profiles_status";
  DROP TYPE "public"."enum_questionnaire_sections_questions_type";
  DROP TYPE "public"."enum_questionnaire_status";
  DROP TYPE "public"."enum__questionnaire_v_version_sections_questions_type";
  DROP TYPE "public"."enum__questionnaire_v_version_status";`)
}
