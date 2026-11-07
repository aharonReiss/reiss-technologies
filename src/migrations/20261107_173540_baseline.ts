import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // The schema as it was before migrations were introduced. Databases created back
  // then (production) already have it, so this only builds an empty database.
  const existing = await db.execute(sql`SELECT to_regclass('public.pages') AS t`)
  if (existing.rows[0]?.t) return

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('home', 'personal', 'page');
  CREATE TYPE "public"."enum_pages_blocks_manifesto_index_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_about_closing_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_about_closing_primary_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_about_closing_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_about_closing_secondary_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_work_rail_closing_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_stack_cards_theme" AS ENUM('white', 'light', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_service_stack_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_menu_proof_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_menu_proof_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_statement_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_statement_cta_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_project_stories_stories_layout" AS ENUM('browser', 'phones');
  CREATE TYPE "public"."enum_pages_blocks_capabilities_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_pages_blocks_image_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_founder_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_founder_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_founder_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_device_showcase_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_device_showcase_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_device_showcase_source" AS ENUM('project', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_device_showcase_devices_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_pages_blocks_device_showcase_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_pricing_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_items_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_projects_grid_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_projects_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_projects_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_variant" AS ENUM('grid', 'timeline', 'row');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_stats_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_faq_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_blog_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_blog_teaser_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_cta_background" AS ENUM('light', 'muted', 'dark', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('home', 'personal', 'page');
  CREATE TYPE "public"."enum__pages_v_blocks_manifesto_index_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__about_v_closing_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__about_v_closing_primary_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__about_v_closing_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__about_v_closing_secondary_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_work_rail_closing_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_stack_cards_theme" AS ENUM('white', 'light', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_service_stack_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_menu_proof_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_menu_proof_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_cta_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_project_stories_stories_layout" AS ENUM('browser', 'phones');
  CREATE TYPE "public"."enum__pages_v_blocks_capabilities_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_device_showcase_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_device_showcase_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_device_showcase_source" AS ENUM('project', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_device_showcase_devices_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__pages_v_blocks_device_showcase_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_items_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_grid_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_variant" AS ENUM('grid', 'timeline', 'row');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_teaser_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background" AS ENUM('light', 'muted', 'dark', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('home', 'personal', 'page');
  CREATE TYPE "public"."enum_services_blocks_manifesto_index_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_work_rail_closing_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_service_stack_cards_theme" AS ENUM('white', 'light', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_service_stack_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_service_menu_proof_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_service_menu_proof_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_statement_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_statement_cta_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_project_stories_stories_layout" AS ENUM('browser', 'phones');
  CREATE TYPE "public"."enum_services_blocks_capabilities_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_services_blocks_rich_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_services_blocks_image_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_founder_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_founder_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_founder_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_device_showcase_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_device_showcase_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_device_showcase_source" AS ENUM('project', 'custom');
  CREATE TYPE "public"."enum_services_blocks_device_showcase_devices_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_services_blocks_device_showcase_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_services_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_pricing_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_items_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_projects_grid_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_projects_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_projects_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_process_steps_variant" AS ENUM('grid', 'timeline', 'row');
  CREATE TYPE "public"."enum_services_blocks_process_steps_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_stats_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_testimonials_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_faq_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_logo_cloud_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_blog_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_blog_teaser_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_cta_background" AS ENUM('light', 'muted', 'dark', 'brand');
  CREATE TYPE "public"."enum_services_blocks_contact_form_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('home', 'personal', 'page');
  CREATE TYPE "public"."enum__services_v_blocks_manifesto_index_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_work_rail_closing_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_service_stack_cards_theme" AS ENUM('white', 'light', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_service_stack_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_service_menu_proof_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_service_menu_proof_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_statement_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_statement_cta_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_project_stories_stories_layout" AS ENUM('browser', 'phones');
  CREATE TYPE "public"."enum__services_v_blocks_capabilities_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_founder_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_founder_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_founder_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_device_showcase_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_device_showcase_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_device_showcase_source" AS ENUM('project', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_device_showcase_devices_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__services_v_blocks_device_showcase_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_feature_grid_items_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum__services_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__services_v_blocks_feature_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_projects_grid_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_projects_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_projects_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_variant" AS ENUM('grid', 'timeline', 'row');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_stats_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_faq_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_logo_cloud_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_blog_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_blog_teaser_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_cta_background" AS ENUM('light', 'muted', 'dark', 'brand');
  CREATE TYPE "public"."enum__services_v_blocks_contact_form_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_details_kind" AS ENUM('desktop', 'mobile');
  CREATE TYPE "public"."enum_projects_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_hero_variant" AS ENUM('home', 'personal', 'page');
  CREATE TYPE "public"."enum_projects_blocks_manifesto_index_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_work_rail_closing_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_service_stack_cards_theme" AS ENUM('white', 'light', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_service_stack_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_service_menu_proof_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_service_menu_proof_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_statement_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_statement_cta_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_project_stories_stories_layout" AS ENUM('browser', 'phones');
  CREATE TYPE "public"."enum_projects_blocks_capabilities_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_projects_blocks_image_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_founder_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_founder_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_founder_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_device_showcase_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_device_showcase_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_device_showcase_source" AS ENUM('project', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_device_showcase_devices_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_projects_blocks_device_showcase_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_services_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_pricing_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_items_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_projects_grid_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_projects_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_projects_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_process_steps_variant" AS ENUM('grid', 'timeline', 'row');
  CREATE TYPE "public"."enum_projects_blocks_process_steps_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_stats_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_testimonials_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_faq_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_logo_cloud_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_blog_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_blog_teaser_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_cta_background" AS ENUM('light', 'muted', 'dark', 'brand');
  CREATE TYPE "public"."enum_projects_blocks_contact_form_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_details_kind" AS ENUM('desktop', 'mobile');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_variant" AS ENUM('home', 'personal', 'page');
  CREATE TYPE "public"."enum__projects_v_blocks_manifesto_index_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_work_rail_closing_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_service_stack_cards_theme" AS ENUM('white', 'light', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_service_stack_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_service_menu_proof_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_service_menu_proof_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_statement_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_statement_cta_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_project_stories_stories_layout" AS ENUM('browser', 'phones');
  CREATE TYPE "public"."enum__projects_v_blocks_capabilities_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__projects_v_blocks_image_text_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_founder_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_founder_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_founder_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_device_showcase_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_device_showcase_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_device_showcase_source" AS ENUM('project', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_device_showcase_devices_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__projects_v_blocks_device_showcase_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_services_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_pricing_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_feature_grid_items_icon" AS ENUM('code', 'design', 'cart', 'rocket', 'search', 'mobile', 'wrench', 'megaphone', 'layers', 'building', 'school', 'refresh', 'briefcase', 'users');
  CREATE TYPE "public"."enum__projects_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__projects_v_blocks_feature_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_grid_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_grid_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_process_steps_variant" AS ENUM('grid', 'timeline', 'row');
  CREATE TYPE "public"."enum__projects_v_blocks_process_steps_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_testimonials_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_faq_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_logo_cloud_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_blog_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_blog_teaser_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_background" AS ENUM('light', 'muted', 'dark', 'brand');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_form_background" AS ENUM('light', 'muted', 'dark');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'in-progress', 'won', 'lost');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_bottom_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_contact_social_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube', 'x');
  CREATE TYPE "public"."enum_site_settings_seo_organization_type" AS ENUM('ProfessionalService', 'Organization', 'LocalBusiness');
  CREATE TYPE "public"."enum_site_settings_integrations_accessibility_position" AS ENUM('left', 'right');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_bubbles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"portrait_id" integer,
  	"grow_word" varchar,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"floating_testimonial_id" integer,
  	"proof_value" varchar,
  	"proof_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_manifesto_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_manifesto_index_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"approach" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_text" varchar,
  	"person_portrait_id" integer,
  	"person_portrait_smile_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "about_experience_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_proof_screens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"desktop_id" integer,
  	"phone_id" integer
  );
  
  CREATE TABLE "about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_text" varchar,
  	"experience_eyebrow" varchar,
  	"experience_years" numeric,
  	"experience_label" varchar,
  	"experience_text" varchar,
  	"founder_eyebrow" varchar,
  	"founder_headline" varchar,
  	"founder_name" varchar,
  	"founder_role" varchar,
  	"founder_text" varchar,
  	"founder_portrait_id" integer,
  	"proof_eyebrow" varchar,
  	"proof_heading" varchar,
  	"proof_text" varchar,
  	"proof_project_id" integer,
  	"proof_link_label" varchar DEFAULT 'לסיפור הפרויקט המלא',
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"closing_primary_type" "enum_about_closing_primary_type" DEFAULT 'reference',
  	"closing_primary_new_tab" boolean,
  	"closing_primary_url" varchar,
  	"closing_primary_label" varchar,
  	"closing_primary_appearance" "enum_about_closing_primary_appearance" DEFAULT 'primary',
  	"closing_secondary_type" "enum_about_closing_secondary_type" DEFAULT 'reference',
  	"closing_secondary_new_tab" boolean,
  	"closing_secondary_url" varchar,
  	"closing_secondary_label" varchar,
  	"closing_secondary_appearance" "enum_about_closing_secondary_appearance" DEFAULT 'primary',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_work_rail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"tone" varchar
  );
  
  CREATE TABLE "pages_blocks_work_rail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'עבודות',
  	"closing_title" varchar DEFAULT 'הפרויקט הבא יכול להיות שלכם',
  	"closing_link_type" "enum_pages_blocks_work_rail_closing_link_type" DEFAULT 'reference',
  	"closing_link_new_tab" boolean,
  	"closing_link_url" varchar,
  	"closing_link_label" varchar,
  	"anchor" varchar DEFAULT 'work',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_service_stack_cards_theme" DEFAULT 'white',
  	"link_type" "enum_pages_blocks_service_stack_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_service_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו יודעים לעשות.',
  	"anchor" varchar DEFAULT 'services',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו מציעים.',
  	"intro" varchar,
  	"note" varchar DEFAULT 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
  	"proof_lead" varchar DEFAULT 'רוצים לראות איך זה נראה בפועל?',
  	"proof_type" "enum_pages_blocks_service_menu_proof_type" DEFAULT 'reference',
  	"proof_new_tab" boolean,
  	"proof_url" varchar,
  	"proof_label" varchar,
  	"proof_appearance" "enum_pages_blocks_service_menu_proof_appearance" DEFAULT 'primary',
  	"contact_page_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum_pages_blocks_statement_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_statement_cta_appearance" DEFAULT 'primary',
  	"cta_note" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote_rotator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'מילים של לקוחות.',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_stories_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"layout" "enum_pages_blocks_project_stories_stories_layout" DEFAULT 'browser',
  	"desktop_id" integer,
  	"desktop_poster_id" integer,
  	"phone_id" integer,
  	"phone_poster_id" integer,
  	"phone2_id" integer,
  	"link_label" varchar DEFAULT 'לסיפור הפרויקט המלא'
  );
  
  CREATE TABLE "pages_blocks_project_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'BEHIND THE WORK',
  	"heading" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"statement" varchar DEFAULT 'אסטרטגיה. עיצוב. פיתוח.',
  	"note" varchar,
  	"closing" varchar,
  	"link_type" "enum_pages_blocks_capabilities_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'narrow',
  	"background" "enum_pages_blocks_rich_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_image_text_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum_pages_blocks_image_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_founder_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_founder_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'האני מאמין שלי',
  	"quote" varchar,
  	"text" varchar,
  	"portrait_id" integer,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"background" "enum_pages_blocks_founder_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'about',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_device_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_device_showcase_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_device_showcase_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_device_showcase_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_device_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_device_showcase_source" DEFAULT 'project',
  	"project_id" integer,
  	"desktop_id" integer,
  	"mobile_id" integer,
  	"url" varchar,
  	"badge" varchar DEFAULT 'מהמערכת האמיתית',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"devices_position" "enum_pages_blocks_device_showcase_devices_position" DEFAULT 'end',
  	"background" "enum_pages_blocks_device_showcase_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_pages_blocks_services_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"contact_page_id" integer,
  	"cta_label" varchar DEFAULT 'לקבלת הצעה',
  	"note" varchar DEFAULT 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
  	"background" "enum_pages_blocks_pricing_background" DEFAULT 'muted',
  	"anchor" varchar DEFAULT 'pricing',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_grid_items_icon" DEFAULT 'code',
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '4',
  	"background" "enum_pages_blocks_feature_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'הפרויקטים שלנו.',
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum_pages_blocks_projects_grid_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_link" boolean,
  	"link_type" "enum_pages_blocks_projects_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum_pages_blocks_projects_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_process_steps_variant" DEFAULT 'grid',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"outro_question" varchar,
  	"outro_words" varchar,
  	"outro_note" varchar,
  	"background" "enum_pages_blocks_process_steps_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_pages_blocks_stats_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_pages_blocks_testimonials_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_pages_blocks_faq_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'faq',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'לקוחות שבחרו בנו',
  	"background" "enum_pages_blocks_logo_cloud_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"show_link" boolean,
  	"link_type" "enum_pages_blocks_blog_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum_pages_blocks_blog_teaser_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"background" "enum_pages_blocks_cta_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_start_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_start_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'בואו נדבר על הפרויקט שלכם.',
  	"intro" varchar,
  	"greeting" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
  	"signoff" varchar DEFAULT 'אשמח שנדבר!',
  	"direct_message" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
  	"faq_heading" varchar DEFAULT 'עוד כמה דברים שאולי רציתם לדעת.',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"service_options" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'שלחו ונחזור אליכם',
  	"success_message" varchar DEFAULT 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
  	"background" "enum_pages_blocks_contact_form_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_no_index" boolean,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_bubbles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"portrait_id" integer,
  	"grow_word" varchar,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"floating_testimonial_id" integer,
  	"proof_value" varchar,
  	"proof_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_manifesto_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_manifesto_index_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"approach" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_text" varchar,
  	"person_portrait_id" integer,
  	"person_portrait_smile_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_about_v_experience_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_proof_screens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"desktop_id" integer,
  	"phone_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_text" varchar,
  	"experience_eyebrow" varchar,
  	"experience_years" numeric,
  	"experience_label" varchar,
  	"experience_text" varchar,
  	"founder_eyebrow" varchar,
  	"founder_headline" varchar,
  	"founder_name" varchar,
  	"founder_role" varchar,
  	"founder_text" varchar,
  	"founder_portrait_id" integer,
  	"proof_eyebrow" varchar,
  	"proof_heading" varchar,
  	"proof_text" varchar,
  	"proof_project_id" integer,
  	"proof_link_label" varchar DEFAULT 'לסיפור הפרויקט המלא',
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"closing_primary_type" "enum__about_v_closing_primary_type" DEFAULT 'reference',
  	"closing_primary_new_tab" boolean,
  	"closing_primary_url" varchar,
  	"closing_primary_label" varchar,
  	"closing_primary_appearance" "enum__about_v_closing_primary_appearance" DEFAULT 'primary',
  	"closing_secondary_type" "enum__about_v_closing_secondary_type" DEFAULT 'reference',
  	"closing_secondary_new_tab" boolean,
  	"closing_secondary_url" varchar,
  	"closing_secondary_label" varchar,
  	"closing_secondary_appearance" "enum__about_v_closing_secondary_appearance" DEFAULT 'primary',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_work_rail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"tone" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_work_rail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'עבודות',
  	"closing_title" varchar DEFAULT 'הפרויקט הבא יכול להיות שלכם',
  	"closing_link_type" "enum__pages_v_blocks_work_rail_closing_link_type" DEFAULT 'reference',
  	"closing_link_new_tab" boolean,
  	"closing_link_url" varchar,
  	"closing_link_label" varchar,
  	"anchor" varchar DEFAULT 'work',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_service_stack_cards_theme" DEFAULT 'white',
  	"link_type" "enum__pages_v_blocks_service_stack_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו יודעים לעשות.',
  	"anchor" varchar DEFAULT 'services',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו מציעים.',
  	"intro" varchar,
  	"note" varchar DEFAULT 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
  	"proof_lead" varchar DEFAULT 'רוצים לראות איך זה נראה בפועל?',
  	"proof_type" "enum__pages_v_blocks_service_menu_proof_type" DEFAULT 'reference',
  	"proof_new_tab" boolean,
  	"proof_url" varchar,
  	"proof_label" varchar,
  	"proof_appearance" "enum__pages_v_blocks_service_menu_proof_appearance" DEFAULT 'primary',
  	"contact_page_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum__pages_v_blocks_statement_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_statement_cta_appearance" DEFAULT 'primary',
  	"cta_note" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote_rotator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'מילים של לקוחות.',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_stories_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"layout" "enum__pages_v_blocks_project_stories_stories_layout" DEFAULT 'browser',
  	"desktop_id" integer,
  	"desktop_poster_id" integer,
  	"phone_id" integer,
  	"phone_poster_id" integer,
  	"phone2_id" integer,
  	"link_label" varchar DEFAULT 'לסיפור הפרויקט המלא',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'BEHIND THE WORK',
  	"heading" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement" varchar DEFAULT 'אסטרטגיה. עיצוב. פיתוח.',
  	"note" varchar,
  	"closing" varchar,
  	"link_type" "enum__pages_v_blocks_capabilities_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"background" "enum__pages_v_blocks_rich_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_image_text_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum__pages_v_blocks_image_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_founder_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_founder_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'האני מאמין שלי',
  	"quote" varchar,
  	"text" varchar,
  	"portrait_id" integer,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"background" "enum__pages_v_blocks_founder_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'about',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_device_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_device_showcase_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_device_showcase_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_device_showcase_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_device_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_device_showcase_source" DEFAULT 'project',
  	"project_id" integer,
  	"desktop_id" integer,
  	"mobile_id" integer,
  	"url" varchar,
  	"badge" varchar DEFAULT 'מהמערכת האמיתית',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"devices_position" "enum__pages_v_blocks_device_showcase_devices_position" DEFAULT 'end',
  	"background" "enum__pages_v_blocks_device_showcase_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__pages_v_blocks_services_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"contact_page_id" integer,
  	"cta_label" varchar DEFAULT 'לקבלת הצעה',
  	"note" varchar DEFAULT 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
  	"background" "enum__pages_v_blocks_pricing_background" DEFAULT 'muted',
  	"anchor" varchar DEFAULT 'pricing',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_grid_items_icon" DEFAULT 'code',
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '4',
  	"background" "enum__pages_v_blocks_feature_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'הפרויקטים שלנו.',
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum__pages_v_blocks_projects_grid_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_link" boolean,
  	"link_type" "enum__pages_v_blocks_projects_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum__pages_v_blocks_projects_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_process_steps_variant" DEFAULT 'grid',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"outro_question" varchar,
  	"outro_words" varchar,
  	"outro_note" varchar,
  	"background" "enum__pages_v_blocks_process_steps_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__pages_v_blocks_stats_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__pages_v_blocks_testimonials_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__pages_v_blocks_faq_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'faq',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'לקוחות שבחרו בנו',
  	"background" "enum__pages_v_blocks_logo_cloud_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"show_link" boolean,
  	"link_type" "enum__pages_v_blocks_blog_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum__pages_v_blocks_blog_teaser_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"background" "enum__pages_v_blocks_cta_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_start_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_start_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'בואו נדבר על הפרויקט שלכם.',
  	"intro" varchar,
  	"greeting" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
  	"signoff" varchar DEFAULT 'אשמח שנדבר!',
  	"direct_message" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
  	"faq_heading" varchar DEFAULT 'עוד כמה דברים שאולי רציתם לדעת.',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"service_options" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'שלחו ונחזור אליכם',
  	"success_message" varchar DEFAULT 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
  	"background" "enum__pages_v_blocks_contact_form_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_no_index" boolean,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer
  );
  
  CREATE TABLE "services_pricing_niches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_pricing_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_pricing_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_menu_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_hero_bubbles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"portrait_id" integer,
  	"grow_word" varchar,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"floating_testimonial_id" integer,
  	"proof_value" varchar,
  	"proof_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_manifesto_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_manifesto_index_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "services_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"approach" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_text" varchar,
  	"person_portrait_id" integer,
  	"person_portrait_smile_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_work_rail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"tone" varchar
  );
  
  CREATE TABLE "services_blocks_work_rail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'עבודות',
  	"closing_title" varchar DEFAULT 'הפרויקט הבא יכול להיות שלכם',
  	"closing_link_type" "enum_services_blocks_work_rail_closing_link_type" DEFAULT 'reference',
  	"closing_link_new_tab" boolean,
  	"closing_link_url" varchar,
  	"closing_link_label" varchar,
  	"anchor" varchar DEFAULT 'work',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_service_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_service_stack_cards_theme" DEFAULT 'white',
  	"link_type" "enum_services_blocks_service_stack_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "services_blocks_service_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו יודעים לעשות.',
  	"anchor" varchar DEFAULT 'services',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_service_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו מציעים.',
  	"intro" varchar,
  	"note" varchar DEFAULT 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
  	"proof_lead" varchar DEFAULT 'רוצים לראות איך זה נראה בפועל?',
  	"proof_type" "enum_services_blocks_service_menu_proof_type" DEFAULT 'reference',
  	"proof_new_tab" boolean,
  	"proof_url" varchar,
  	"proof_label" varchar,
  	"proof_appearance" "enum_services_blocks_service_menu_proof_appearance" DEFAULT 'primary',
  	"contact_page_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum_services_blocks_statement_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_statement_cta_appearance" DEFAULT 'primary',
  	"cta_note" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_quote_rotator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'מילים של לקוחות.',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_project_stories_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"layout" "enum_services_blocks_project_stories_stories_layout" DEFAULT 'browser',
  	"desktop_id" integer,
  	"desktop_poster_id" integer,
  	"phone_id" integer,
  	"phone_poster_id" integer,
  	"phone2_id" integer,
  	"link_label" varchar DEFAULT 'לסיפור הפרויקט המלא'
  );
  
  CREATE TABLE "services_blocks_project_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'BEHIND THE WORK',
  	"heading" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"statement" varchar DEFAULT 'אסטרטגיה. עיצוב. פיתוח.',
  	"note" varchar,
  	"closing" varchar,
  	"link_type" "enum_services_blocks_capabilities_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_services_blocks_rich_text_width" DEFAULT 'narrow',
  	"background" "enum_services_blocks_rich_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_blocks_image_text_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_services_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum_services_blocks_image_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_founder_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_founder_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_blocks_founder_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'האני מאמין שלי',
  	"quote" varchar,
  	"text" varchar,
  	"portrait_id" integer,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"background" "enum_services_blocks_founder_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'about',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_device_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_device_showcase_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_device_showcase_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_blocks_device_showcase_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_device_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_services_blocks_device_showcase_source" DEFAULT 'project',
  	"project_id" integer,
  	"desktop_id" integer,
  	"mobile_id" integer,
  	"url" varchar,
  	"badge" varchar DEFAULT 'מהמערכת האמיתית',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"devices_position" "enum_services_blocks_device_showcase_devices_position" DEFAULT 'end',
  	"background" "enum_services_blocks_device_showcase_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_services_blocks_services_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"contact_page_id" integer,
  	"cta_label" varchar DEFAULT 'לקבלת הצעה',
  	"note" varchar DEFAULT 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
  	"background" "enum_services_blocks_pricing_background" DEFAULT 'muted',
  	"anchor" varchar DEFAULT 'pricing',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_blocks_feature_grid_items_icon" DEFAULT 'code',
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_services_blocks_feature_grid_columns" DEFAULT '4',
  	"background" "enum_services_blocks_feature_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'הפרויקטים שלנו.',
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum_services_blocks_projects_grid_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_link" boolean,
  	"link_type" "enum_services_blocks_projects_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum_services_blocks_projects_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_process_steps_variant" DEFAULT 'grid',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"outro_question" varchar,
  	"outro_words" varchar,
  	"outro_note" varchar,
  	"background" "enum_services_blocks_process_steps_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_services_blocks_stats_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_services_blocks_testimonials_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_services_blocks_faq_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'faq',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'לקוחות שבחרו בנו',
  	"background" "enum_services_blocks_logo_cloud_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"show_link" boolean,
  	"link_type" "enum_services_blocks_blog_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum_services_blocks_blog_teaser_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"background" "enum_services_blocks_cta_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_start_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_contact_start_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "services_blocks_contact_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'בואו נדבר על הפרויקט שלכם.',
  	"intro" varchar,
  	"greeting" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
  	"signoff" varchar DEFAULT 'אשמח שנדבר!',
  	"direct_message" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
  	"faq_heading" varchar DEFAULT 'עוד כמה דברים שאולי רציתם לדעת.',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"service_options" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'שלחו ונחזור אליכם',
  	"success_message" varchar DEFAULT 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
  	"background" "enum_services_blocks_contact_form_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"icon" "enum_services_icon" DEFAULT 'code',
  	"image_id" integer,
  	"pricing_price" numeric,
  	"pricing_show_price" boolean DEFAULT true,
  	"pricing_price_note" varchar DEFAULT 'לפני מע״מ',
  	"pricing_badge" varchar,
  	"pricing_purpose" varchar,
  	"pricing_ideal_for" varchar,
  	"pricing_highlighted" boolean,
  	"menu_heading" varchar,
  	"menu_text" varchar,
  	"menu_cta_label" varchar,
  	"menu_contact_type" varchar,
  	"menu_example_project_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_no_index" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer
  );
  
  CREATE TABLE "_services_v_version_pricing_niches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_pricing_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_pricing_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_menu_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_bubbles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"portrait_id" integer,
  	"grow_word" varchar,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"floating_testimonial_id" integer,
  	"proof_value" varchar,
  	"proof_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_manifesto_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_manifesto_index_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"approach" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_text" varchar,
  	"person_portrait_id" integer,
  	"person_portrait_smile_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_work_rail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"tone" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_work_rail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'עבודות',
  	"closing_title" varchar DEFAULT 'הפרויקט הבא יכול להיות שלכם',
  	"closing_link_type" "enum__services_v_blocks_work_rail_closing_link_type" DEFAULT 'reference',
  	"closing_link_new_tab" boolean,
  	"closing_link_url" varchar,
  	"closing_link_label" varchar,
  	"anchor" varchar DEFAULT 'work',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_service_stack_cards_theme" DEFAULT 'white',
  	"link_type" "enum__services_v_blocks_service_stack_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו יודעים לעשות.',
  	"anchor" varchar DEFAULT 'services',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו מציעים.',
  	"intro" varchar,
  	"note" varchar DEFAULT 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
  	"proof_lead" varchar DEFAULT 'רוצים לראות איך זה נראה בפועל?',
  	"proof_type" "enum__services_v_blocks_service_menu_proof_type" DEFAULT 'reference',
  	"proof_new_tab" boolean,
  	"proof_url" varchar,
  	"proof_label" varchar,
  	"proof_appearance" "enum__services_v_blocks_service_menu_proof_appearance" DEFAULT 'primary',
  	"contact_page_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum__services_v_blocks_statement_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_statement_cta_appearance" DEFAULT 'primary',
  	"cta_note" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_quote_rotator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'מילים של לקוחות.',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_project_stories_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"layout" "enum__services_v_blocks_project_stories_stories_layout" DEFAULT 'browser',
  	"desktop_id" integer,
  	"desktop_poster_id" integer,
  	"phone_id" integer,
  	"phone_poster_id" integer,
  	"phone2_id" integer,
  	"link_label" varchar DEFAULT 'לסיפור הפרויקט המלא',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_project_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'BEHIND THE WORK',
  	"heading" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement" varchar DEFAULT 'אסטרטגיה. עיצוב. פיתוח.',
  	"note" varchar,
  	"closing" varchar,
  	"link_type" "enum__services_v_blocks_capabilities_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__services_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"background" "enum__services_v_blocks_rich_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_blocks_image_text_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__services_v_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum__services_v_blocks_image_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_founder_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_founder_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_blocks_founder_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'האני מאמין שלי',
  	"quote" varchar,
  	"text" varchar,
  	"portrait_id" integer,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"background" "enum__services_v_blocks_founder_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'about',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_device_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_device_showcase_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_device_showcase_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_blocks_device_showcase_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_device_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__services_v_blocks_device_showcase_source" DEFAULT 'project',
  	"project_id" integer,
  	"desktop_id" integer,
  	"mobile_id" integer,
  	"url" varchar,
  	"badge" varchar DEFAULT 'מהמערכת האמיתית',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"devices_position" "enum__services_v_blocks_device_showcase_devices_position" DEFAULT 'end',
  	"background" "enum__services_v_blocks_device_showcase_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__services_v_blocks_services_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"contact_page_id" integer,
  	"cta_label" varchar DEFAULT 'לקבלת הצעה',
  	"note" varchar DEFAULT 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
  	"background" "enum__services_v_blocks_pricing_background" DEFAULT 'muted',
  	"anchor" varchar DEFAULT 'pricing',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__services_v_blocks_feature_grid_items_icon" DEFAULT 'code',
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum__services_v_blocks_feature_grid_columns" DEFAULT '4',
  	"background" "enum__services_v_blocks_feature_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'הפרויקטים שלנו.',
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum__services_v_blocks_projects_grid_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_link" boolean,
  	"link_type" "enum__services_v_blocks_projects_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum__services_v_blocks_projects_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_process_steps_variant" DEFAULT 'grid',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"outro_question" varchar,
  	"outro_words" varchar,
  	"outro_note" varchar,
  	"background" "enum__services_v_blocks_process_steps_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__services_v_blocks_stats_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__services_v_blocks_testimonials_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__services_v_blocks_faq_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'faq',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'לקוחות שבחרו בנו',
  	"background" "enum__services_v_blocks_logo_cloud_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"show_link" boolean,
  	"link_type" "enum__services_v_blocks_blog_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum__services_v_blocks_blog_teaser_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"background" "enum__services_v_blocks_cta_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_start_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_start_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'בואו נדבר על הפרויקט שלכם.',
  	"intro" varchar,
  	"greeting" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
  	"signoff" varchar DEFAULT 'אשמח שנדבר!',
  	"direct_message" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
  	"faq_heading" varchar DEFAULT 'עוד כמה דברים שאולי רציתם לדעת.',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"service_options" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'שלחו ונחזור אליכם',
  	"success_message" varchar DEFAULT 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
  	"background" "enum__services_v_blocks_contact_form_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_icon" "enum__services_v_version_icon" DEFAULT 'code',
  	"version_image_id" integer,
  	"version_pricing_price" numeric,
  	"version_pricing_show_price" boolean DEFAULT true,
  	"version_pricing_price_note" varchar DEFAULT 'לפני מע״מ',
  	"version_pricing_badge" varchar,
  	"version_pricing_purpose" varchar,
  	"version_pricing_ideal_for" varchar,
  	"version_pricing_highlighted" boolean,
  	"version_menu_heading" varchar,
  	"version_menu_text" varchar,
  	"version_menu_cta_label" varchar,
  	"version_menu_contact_type" varchar,
  	"version_menu_example_project_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_no_index" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer
  );
  
  CREATE TABLE "projects_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"kind" "enum_projects_details_kind" DEFAULT 'desktop'
  );
  
  CREATE TABLE "projects_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_hero_bubbles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"portrait_id" integer,
  	"grow_word" varchar,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"floating_testimonial_id" integer,
  	"proof_value" varchar,
  	"proof_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_manifesto_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_manifesto_index_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "projects_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"approach" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_text" varchar,
  	"person_portrait_id" integer,
  	"person_portrait_smile_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_work_rail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"tone" varchar
  );
  
  CREATE TABLE "projects_blocks_work_rail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'עבודות',
  	"closing_title" varchar DEFAULT 'הפרויקט הבא יכול להיות שלכם',
  	"closing_link_type" "enum_projects_blocks_work_rail_closing_link_type" DEFAULT 'reference',
  	"closing_link_new_tab" boolean,
  	"closing_link_url" varchar,
  	"closing_link_label" varchar,
  	"anchor" varchar DEFAULT 'work',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_service_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_service_stack_cards_theme" DEFAULT 'white',
  	"link_type" "enum_projects_blocks_service_stack_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "projects_blocks_service_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו יודעים לעשות.',
  	"anchor" varchar DEFAULT 'services',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_service_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו מציעים.',
  	"intro" varchar,
  	"note" varchar DEFAULT 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
  	"proof_lead" varchar DEFAULT 'רוצים לראות איך זה נראה בפועל?',
  	"proof_type" "enum_projects_blocks_service_menu_proof_type" DEFAULT 'reference',
  	"proof_new_tab" boolean,
  	"proof_url" varchar,
  	"proof_label" varchar,
  	"proof_appearance" "enum_projects_blocks_service_menu_proof_appearance" DEFAULT 'primary',
  	"contact_page_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum_projects_blocks_statement_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_projects_blocks_statement_cta_appearance" DEFAULT 'primary',
  	"cta_note" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_quote_rotator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'מילים של לקוחות.',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_project_stories_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"layout" "enum_projects_blocks_project_stories_stories_layout" DEFAULT 'browser',
  	"desktop_id" integer,
  	"desktop_poster_id" integer,
  	"phone_id" integer,
  	"phone_poster_id" integer,
  	"phone2_id" integer,
  	"link_label" varchar DEFAULT 'לסיפור הפרויקט המלא'
  );
  
  CREATE TABLE "projects_blocks_project_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'BEHIND THE WORK',
  	"heading" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"statement" varchar DEFAULT 'אסטרטגיה. עיצוב. פיתוח.',
  	"note" varchar,
  	"closing" varchar,
  	"link_type" "enum_projects_blocks_capabilities_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_projects_blocks_rich_text_width" DEFAULT 'narrow',
  	"background" "enum_projects_blocks_rich_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_image_text_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_projects_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum_projects_blocks_image_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_founder_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_founder_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_founder_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'האני מאמין שלי',
  	"quote" varchar,
  	"text" varchar,
  	"portrait_id" integer,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"background" "enum_projects_blocks_founder_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'about',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_device_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_device_showcase_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_device_showcase_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_device_showcase_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_device_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_projects_blocks_device_showcase_source" DEFAULT 'project',
  	"project_id" integer,
  	"desktop_id" integer,
  	"mobile_id" integer,
  	"url" varchar,
  	"badge" varchar DEFAULT 'מהמערכת האמיתית',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"devices_position" "enum_projects_blocks_device_showcase_devices_position" DEFAULT 'end',
  	"background" "enum_projects_blocks_device_showcase_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_projects_blocks_services_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"contact_page_id" integer,
  	"cta_label" varchar DEFAULT 'לקבלת הצעה',
  	"note" varchar DEFAULT 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
  	"background" "enum_projects_blocks_pricing_background" DEFAULT 'muted',
  	"anchor" varchar DEFAULT 'pricing',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_projects_blocks_feature_grid_items_icon" DEFAULT 'code',
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_projects_blocks_feature_grid_columns" DEFAULT '4',
  	"background" "enum_projects_blocks_feature_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'הפרויקטים שלנו.',
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum_projects_blocks_projects_grid_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_link" boolean,
  	"link_type" "enum_projects_blocks_projects_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum_projects_blocks_projects_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_process_steps_variant" DEFAULT 'grid',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"outro_question" varchar,
  	"outro_words" varchar,
  	"outro_note" varchar,
  	"background" "enum_projects_blocks_process_steps_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_projects_blocks_stats_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_projects_blocks_testimonials_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum_projects_blocks_faq_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'faq',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'לקוחות שבחרו בנו',
  	"background" "enum_projects_blocks_logo_cloud_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"show_link" boolean,
  	"link_type" "enum_projects_blocks_blog_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum_projects_blocks_blog_teaser_background" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"background" "enum_projects_blocks_cta_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_start_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_start_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'בואו נדבר על הפרויקט שלכם.',
  	"intro" varchar,
  	"greeting" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
  	"signoff" varchar DEFAULT 'אשמח שנדבר!',
  	"direct_message" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
  	"faq_heading" varchar DEFAULT 'עוד כמה דברים שאולי רציתם לדעת.',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"service_options" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'שלחו ונחזור אליכם',
  	"success_message" varchar DEFAULT 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
  	"background" "enum_projects_blocks_contact_form_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"client" varchar,
  	"year" numeric,
  	"excerpt" varchar,
  	"need" varchar,
  	"answer" varchar,
  	"cover_image_id" integer,
  	"gallery_wide_id" integer,
  	"gallery_tall_id" integer,
  	"website_url" varchar,
  	"desktop_screenshot_id" integer,
  	"mobile_screenshot_id" integer,
  	"hero_image_id" integer,
  	"desktop_scroll_id" integer,
  	"mobile_preview_id" integer,
  	"mobile_note" varchar,
  	"challenge" jsonb,
  	"solution" jsonb,
  	"testimonial_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_no_index" boolean,
  	"featured" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"services_id" integer,
  	"pages_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer
  );
  
  CREATE TABLE "_projects_v_version_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"kind" "enum__projects_v_version_details_kind" DEFAULT 'desktop',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_bubbles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__projects_v_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"portrait_id" integer,
  	"grow_word" varchar,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"floating_testimonial_id" integer,
  	"proof_value" varchar,
  	"proof_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_manifesto_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_manifesto_index_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"approach" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_text" varchar,
  	"person_portrait_id" integer,
  	"person_portrait_smile_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_work_rail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"tone" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_work_rail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'עבודות',
  	"closing_title" varchar DEFAULT 'הפרויקט הבא יכול להיות שלכם',
  	"closing_link_type" "enum__projects_v_blocks_work_rail_closing_link_type" DEFAULT 'reference',
  	"closing_link_new_tab" boolean,
  	"closing_link_url" varchar,
  	"closing_link_label" varchar,
  	"anchor" varchar DEFAULT 'work',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_service_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_service_stack_cards_theme" DEFAULT 'white',
  	"link_type" "enum__projects_v_blocks_service_stack_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_service_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו יודעים לעשות.',
  	"anchor" varchar DEFAULT 'services',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_service_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'מה אנחנו מציעים.',
  	"intro" varchar,
  	"note" varchar DEFAULT 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
  	"proof_lead" varchar DEFAULT 'רוצים לראות איך זה נראה בפועל?',
  	"proof_type" "enum__projects_v_blocks_service_menu_proof_type" DEFAULT 'reference',
  	"proof_new_tab" boolean,
  	"proof_url" varchar,
  	"proof_label" varchar,
  	"proof_appearance" "enum__projects_v_blocks_service_menu_proof_appearance" DEFAULT 'primary',
  	"contact_page_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum__projects_v_blocks_statement_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__projects_v_blocks_statement_cta_appearance" DEFAULT 'primary',
  	"cta_note" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_quote_rotator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'מילים של לקוחות.',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_project_stories_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"layout" "enum__projects_v_blocks_project_stories_stories_layout" DEFAULT 'browser',
  	"desktop_id" integer,
  	"desktop_poster_id" integer,
  	"phone_id" integer,
  	"phone_poster_id" integer,
  	"phone2_id" integer,
  	"link_label" varchar DEFAULT 'לסיפור הפרויקט המלא',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_project_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'BEHIND THE WORK',
  	"heading" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement" varchar DEFAULT 'אסטרטגיה. עיצוב. פיתוח.',
  	"note" varchar,
  	"closing" varchar,
  	"link_type" "enum__projects_v_blocks_capabilities_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__projects_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"background" "enum__projects_v_blocks_rich_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_image_text_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__projects_v_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum__projects_v_blocks_image_text_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_founder_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_founder_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_founder_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'האני מאמין שלי',
  	"quote" varchar,
  	"text" varchar,
  	"portrait_id" integer,
  	"signature_text" varchar,
  	"signature_image_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"background" "enum__projects_v_blocks_founder_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'about',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_device_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_device_showcase_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_device_showcase_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_device_showcase_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_device_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__projects_v_blocks_device_showcase_source" DEFAULT 'project',
  	"project_id" integer,
  	"desktop_id" integer,
  	"mobile_id" integer,
  	"url" varchar,
  	"badge" varchar DEFAULT 'מהמערכת האמיתית',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"devices_position" "enum__projects_v_blocks_device_showcase_devices_position" DEFAULT 'end',
  	"background" "enum__projects_v_blocks_device_showcase_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__projects_v_blocks_services_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"contact_page_id" integer,
  	"cta_label" varchar DEFAULT 'לקבלת הצעה',
  	"note" varchar DEFAULT 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
  	"background" "enum__projects_v_blocks_pricing_background" DEFAULT 'muted',
  	"anchor" varchar DEFAULT 'pricing',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__projects_v_blocks_feature_grid_items_icon" DEFAULT 'code',
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum__projects_v_blocks_feature_grid_columns" DEFAULT '4',
  	"background" "enum__projects_v_blocks_feature_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'הפרויקטים שלנו.',
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_projects_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum__projects_v_blocks_projects_grid_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_link" boolean,
  	"link_type" "enum__projects_v_blocks_projects_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum__projects_v_blocks_projects_grid_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__projects_v_blocks_process_steps_variant" DEFAULT 'grid',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"outro_question" varchar,
  	"outro_words" varchar,
  	"outro_note" varchar,
  	"background" "enum__projects_v_blocks_process_steps_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__projects_v_blocks_stats_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__projects_v_blocks_testimonials_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"background" "enum__projects_v_blocks_faq_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'faq',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'לקוחות שבחרו בנו',
  	"background" "enum__projects_v_blocks_logo_cloud_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"show_link" boolean,
  	"link_type" "enum__projects_v_blocks_blog_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"background" "enum__projects_v_blocks_blog_teaser_background" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"background" "enum__projects_v_blocks_cta_background" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_start_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_start_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'בואו נדבר על הפרויקט שלכם.',
  	"intro" varchar,
  	"greeting" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
  	"signoff" varchar DEFAULT 'אשמח שנדבר!',
  	"direct_message" varchar DEFAULT 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
  	"faq_heading" varchar DEFAULT 'עוד כמה דברים שאולי רציתם לדעת.',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"service_options" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'שלחו ונחזור אליכם',
  	"success_message" varchar DEFAULT 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
  	"background" "enum__projects_v_blocks_contact_form_background" DEFAULT 'light',
  	"anchor" varchar DEFAULT 'contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_client" varchar,
  	"version_year" numeric,
  	"version_excerpt" varchar,
  	"version_need" varchar,
  	"version_answer" varchar,
  	"version_cover_image_id" integer,
  	"version_gallery_wide_id" integer,
  	"version_gallery_tall_id" integer,
  	"version_website_url" varchar,
  	"version_desktop_screenshot_id" integer,
  	"version_mobile_screenshot_id" integer,
  	"version_hero_image_id" integer,
  	"version_desktop_scroll_id" integer,
  	"version_mobile_preview_id" integer,
  	"version_mobile_note" varchar,
  	"version_challenge" jsonb,
  	"version_solution" jsonb,
  	"version_testimonial_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_no_index" boolean,
  	"version_featured" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"services_id" integer,
  	"pages_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_no_index" boolean,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_no_index" boolean,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric DEFAULT 5,
  	"project_id" integer,
  	"placeholder" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
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
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"company" varchar,
  	"service" varchar,
  	"message" varchar,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"notes" varchar,
  	"source_page" varchar,
  	"source_utm_source" varchar,
  	"source_utm_medium" varchar,
  	"source_utm_campaign" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer,
  	"media_id" integer,
  	"leads_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum_header_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_bottom_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about" varchar,
  	"copyright" varchar DEFAULT '© {year} REISS DIGITAL. כל הזכויות שמורות.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "site_settings_contact_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_contact_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "lead_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'REISS DIGITAL',
  	"tagline" varchar,
  	"logo_id" integer,
  	"logo_light_id" integer,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_whatsapp" varchar,
  	"contact_whatsapp_message" varchar DEFAULT 'היי, אשמח לשמוע פרטים על בניית אתר',
  	"contact_address" varchar,
  	"contact_hours" varchar,
  	"seo_title_template" varchar DEFAULT '%s | REISS DIGITAL',
  	"seo_default_description" varchar,
  	"seo_default_image_id" integer,
  	"seo_organization_type" "enum_site_settings_seo_organization_type" DEFAULT 'ProfessionalService',
  	"integrations_ga4_id" varchar,
  	"integrations_gsc_verification" varchar,
  	"integrations_accessibility_enabled" boolean DEFAULT true,
  	"integrations_accessibility_position" "enum_site_settings_integrations_accessibility_position" DEFAULT 'left',
  	"integrations_accessibility_email" varchar,
  	"integrations_accessibility_statement_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_bubbles" ADD CONSTRAINT "pages_blocks_hero_bubbles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_highlights" ADD CONSTRAINT "pages_blocks_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_floating_testimonial_id_testimonials_id_fk" FOREIGN KEY ("floating_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto_lines" ADD CONSTRAINT "pages_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto_index" ADD CONSTRAINT "pages_blocks_manifesto_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto" ADD CONSTRAINT "pages_blocks_manifesto_person_portrait_id_media_id_fk" FOREIGN KEY ("person_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto" ADD CONSTRAINT "pages_blocks_manifesto_person_portrait_smile_id_media_id_fk" FOREIGN KEY ("person_portrait_smile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto" ADD CONSTRAINT "pages_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_experience_points" ADD CONSTRAINT "about_experience_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_proof_screens" ADD CONSTRAINT "about_proof_screens_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_proof_screens" ADD CONSTRAINT "about_proof_screens_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_proof_screens" ADD CONSTRAINT "about_proof_screens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_founder_portrait_id_media_id_fk" FOREIGN KEY ("founder_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_proof_project_id_projects_id_fk" FOREIGN KEY ("proof_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_work_rail_items" ADD CONSTRAINT "pages_blocks_work_rail_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_work_rail_items" ADD CONSTRAINT "pages_blocks_work_rail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_work_rail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_work_rail" ADD CONSTRAINT "pages_blocks_work_rail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_stack_cards" ADD CONSTRAINT "pages_blocks_service_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_stack" ADD CONSTRAINT "pages_blocks_service_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_menu" ADD CONSTRAINT "pages_blocks_service_menu_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_menu" ADD CONSTRAINT "pages_blocks_service_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote_rotator" ADD CONSTRAINT "pages_blocks_quote_rotator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_desktop_poster_id_media_id_fk" FOREIGN KEY ("desktop_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_phone_poster_id_media_id_fk" FOREIGN KEY ("phone_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_phone2_id_media_id_fk" FOREIGN KEY ("phone2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories_stories" ADD CONSTRAINT "pages_blocks_project_stories_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_stories" ADD CONSTRAINT "pages_blocks_project_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_items" ADD CONSTRAINT "pages_blocks_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities" ADD CONSTRAINT "pages_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_links" ADD CONSTRAINT "pages_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_links" ADD CONSTRAINT "pages_blocks_founder_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_device_showcase_bullets" ADD CONSTRAINT "pages_blocks_device_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_device_showcase_links" ADD CONSTRAINT "pages_blocks_device_showcase_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_device_showcase" ADD CONSTRAINT "pages_blocks_device_showcase_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_device_showcase" ADD CONSTRAINT "pages_blocks_device_showcase_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_device_showcase" ADD CONSTRAINT "pages_blocks_device_showcase_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_device_showcase" ADD CONSTRAINT "pages_blocks_device_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_gallery" ADD CONSTRAINT "pages_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_grid" ADD CONSTRAINT "pages_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_teaser" ADD CONSTRAINT "pages_blocks_blog_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_teaser" ADD CONSTRAINT "pages_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_start_project_types" ADD CONSTRAINT "pages_blocks_contact_start_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_start_faqs" ADD CONSTRAINT "pages_blocks_contact_start_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_start" ADD CONSTRAINT "pages_blocks_contact_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_bubbles" ADD CONSTRAINT "_pages_v_blocks_hero_bubbles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_highlights" ADD CONSTRAINT "_pages_v_blocks_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_floating_testimonial_id_testimonials_id_fk" FOREIGN KEY ("floating_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto_lines" ADD CONSTRAINT "_pages_v_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto_index" ADD CONSTRAINT "_pages_v_blocks_manifesto_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto" ADD CONSTRAINT "_pages_v_blocks_manifesto_person_portrait_id_media_id_fk" FOREIGN KEY ("person_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto" ADD CONSTRAINT "_pages_v_blocks_manifesto_person_portrait_smile_id_media_id_fk" FOREIGN KEY ("person_portrait_smile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto" ADD CONSTRAINT "_pages_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_experience_points" ADD CONSTRAINT "_about_v_experience_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_proof_screens" ADD CONSTRAINT "_about_v_proof_screens_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_proof_screens" ADD CONSTRAINT "_about_v_proof_screens_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_proof_screens" ADD CONSTRAINT "_about_v_proof_screens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_founder_portrait_id_media_id_fk" FOREIGN KEY ("founder_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_proof_project_id_projects_id_fk" FOREIGN KEY ("proof_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_work_rail_items" ADD CONSTRAINT "_pages_v_blocks_work_rail_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_work_rail_items" ADD CONSTRAINT "_pages_v_blocks_work_rail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_work_rail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_work_rail" ADD CONSTRAINT "_pages_v_blocks_work_rail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_stack_cards" ADD CONSTRAINT "_pages_v_blocks_service_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_stack" ADD CONSTRAINT "_pages_v_blocks_service_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_menu" ADD CONSTRAINT "_pages_v_blocks_service_menu_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_menu" ADD CONSTRAINT "_pages_v_blocks_service_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote_rotator" ADD CONSTRAINT "_pages_v_blocks_quote_rotator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_desktop_poster_id_media_id_fk" FOREIGN KEY ("desktop_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_phone_poster_id_media_id_fk" FOREIGN KEY ("phone_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_phone2_id_media_id_fk" FOREIGN KEY ("phone2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_stories" ADD CONSTRAINT "_pages_v_blocks_project_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capabilities_items" ADD CONSTRAINT "_pages_v_blocks_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capabilities" ADD CONSTRAINT "_pages_v_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_links" ADD CONSTRAINT "_pages_v_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_links" ADD CONSTRAINT "_pages_v_blocks_founder_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_device_showcase_bullets" ADD CONSTRAINT "_pages_v_blocks_device_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_device_showcase_links" ADD CONSTRAINT "_pages_v_blocks_device_showcase_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_device_showcase" ADD CONSTRAINT "_pages_v_blocks_device_showcase_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_device_showcase" ADD CONSTRAINT "_pages_v_blocks_device_showcase_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_device_showcase" ADD CONSTRAINT "_pages_v_blocks_device_showcase_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_device_showcase" ADD CONSTRAINT "_pages_v_blocks_device_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_gallery" ADD CONSTRAINT "_pages_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_grid" ADD CONSTRAINT "_pages_v_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_teaser" ADD CONSTRAINT "_pages_v_blocks_blog_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_teaser" ADD CONSTRAINT "_pages_v_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_start_project_types" ADD CONSTRAINT "_pages_v_blocks_contact_start_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_start_faqs" ADD CONSTRAINT "_pages_v_blocks_contact_start_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_start" ADD CONSTRAINT "_pages_v_blocks_contact_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_pricing_niches" ADD CONSTRAINT "services_pricing_niches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_pricing_process" ADD CONSTRAINT "services_pricing_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_pricing_included" ADD CONSTRAINT "services_pricing_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_menu_capabilities" ADD CONSTRAINT "services_menu_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_links" ADD CONSTRAINT "services_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_bubbles" ADD CONSTRAINT "services_blocks_hero_bubbles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_highlights" ADD CONSTRAINT "services_blocks_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_floating_testimonial_id_testimonials_id_fk" FOREIGN KEY ("floating_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_manifesto_lines" ADD CONSTRAINT "services_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_manifesto_index" ADD CONSTRAINT "services_blocks_manifesto_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_manifesto" ADD CONSTRAINT "services_blocks_manifesto_person_portrait_id_media_id_fk" FOREIGN KEY ("person_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_manifesto" ADD CONSTRAINT "services_blocks_manifesto_person_portrait_smile_id_media_id_fk" FOREIGN KEY ("person_portrait_smile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_manifesto" ADD CONSTRAINT "services_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_work_rail_items" ADD CONSTRAINT "services_blocks_work_rail_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_work_rail_items" ADD CONSTRAINT "services_blocks_work_rail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_work_rail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_work_rail" ADD CONSTRAINT "services_blocks_work_rail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_stack_cards" ADD CONSTRAINT "services_blocks_service_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_stack" ADD CONSTRAINT "services_blocks_service_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_menu" ADD CONSTRAINT "services_blocks_service_menu_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_service_menu" ADD CONSTRAINT "services_blocks_service_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_statement" ADD CONSTRAINT "services_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_quote_rotator" ADD CONSTRAINT "services_blocks_quote_rotator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_desktop_poster_id_media_id_fk" FOREIGN KEY ("desktop_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_phone_poster_id_media_id_fk" FOREIGN KEY ("phone_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_phone2_id_media_id_fk" FOREIGN KEY ("phone2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories_stories" ADD CONSTRAINT "services_blocks_project_stories_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_project_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_stories" ADD CONSTRAINT "services_blocks_project_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_capabilities_items" ADD CONSTRAINT "services_blocks_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_capabilities" ADD CONSTRAINT "services_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_text_links" ADD CONSTRAINT "services_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_text" ADD CONSTRAINT "services_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_image_text" ADD CONSTRAINT "services_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_founder_links" ADD CONSTRAINT "services_blocks_founder_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_founder" ADD CONSTRAINT "services_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_founder" ADD CONSTRAINT "services_blocks_founder_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_founder" ADD CONSTRAINT "services_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_device_showcase_bullets" ADD CONSTRAINT "services_blocks_device_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_device_showcase_links" ADD CONSTRAINT "services_blocks_device_showcase_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_device_showcase" ADD CONSTRAINT "services_blocks_device_showcase_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_device_showcase" ADD CONSTRAINT "services_blocks_device_showcase_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_device_showcase" ADD CONSTRAINT "services_blocks_device_showcase_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_device_showcase" ADD CONSTRAINT "services_blocks_device_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid" ADD CONSTRAINT "services_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing" ADD CONSTRAINT "services_blocks_pricing_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing" ADD CONSTRAINT "services_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid" ADD CONSTRAINT "services_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_gallery" ADD CONSTRAINT "services_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_projects_grid" ADD CONSTRAINT "services_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps_steps" ADD CONSTRAINT "services_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps" ADD CONSTRAINT "services_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_cloud" ADD CONSTRAINT "services_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_blog_teaser" ADD CONSTRAINT "services_blocks_blog_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_blog_teaser" ADD CONSTRAINT "services_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_start_project_types" ADD CONSTRAINT "services_blocks_contact_start_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_start_faqs" ADD CONSTRAINT "services_blocks_contact_start_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_start" ADD CONSTRAINT "services_blocks_contact_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_form" ADD CONSTRAINT "services_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_menu_example_project_id_projects_id_fk" FOREIGN KEY ("menu_example_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_pricing_niches" ADD CONSTRAINT "_services_v_version_pricing_niches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_pricing_process" ADD CONSTRAINT "_services_v_version_pricing_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_pricing_included" ADD CONSTRAINT "_services_v_version_pricing_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_menu_capabilities" ADD CONSTRAINT "_services_v_version_menu_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_links" ADD CONSTRAINT "_services_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_bubbles" ADD CONSTRAINT "_services_v_blocks_hero_bubbles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_highlights" ADD CONSTRAINT "_services_v_blocks_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_floating_testimonial_id_testimonials_id_fk" FOREIGN KEY ("floating_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_manifesto_lines" ADD CONSTRAINT "_services_v_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_manifesto_index" ADD CONSTRAINT "_services_v_blocks_manifesto_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_manifesto" ADD CONSTRAINT "_services_v_blocks_manifesto_person_portrait_id_media_id_fk" FOREIGN KEY ("person_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_manifesto" ADD CONSTRAINT "_services_v_blocks_manifesto_person_portrait_smile_id_media_id_fk" FOREIGN KEY ("person_portrait_smile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_manifesto" ADD CONSTRAINT "_services_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_work_rail_items" ADD CONSTRAINT "_services_v_blocks_work_rail_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_work_rail_items" ADD CONSTRAINT "_services_v_blocks_work_rail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_work_rail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_work_rail" ADD CONSTRAINT "_services_v_blocks_work_rail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_stack_cards" ADD CONSTRAINT "_services_v_blocks_service_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_service_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_stack" ADD CONSTRAINT "_services_v_blocks_service_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_menu" ADD CONSTRAINT "_services_v_blocks_service_menu_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_menu" ADD CONSTRAINT "_services_v_blocks_service_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_statement" ADD CONSTRAINT "_services_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_quote_rotator" ADD CONSTRAINT "_services_v_blocks_quote_rotator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_desktop_poster_id_media_id_fk" FOREIGN KEY ("desktop_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_phone_poster_id_media_id_fk" FOREIGN KEY ("phone_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_phone2_id_media_id_fk" FOREIGN KEY ("phone2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_project_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_stories" ADD CONSTRAINT "_services_v_blocks_project_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_capabilities_items" ADD CONSTRAINT "_services_v_blocks_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_capabilities" ADD CONSTRAINT "_services_v_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_text_links" ADD CONSTRAINT "_services_v_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_text" ADD CONSTRAINT "_services_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_text" ADD CONSTRAINT "_services_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_founder_links" ADD CONSTRAINT "_services_v_blocks_founder_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_founder" ADD CONSTRAINT "_services_v_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_founder" ADD CONSTRAINT "_services_v_blocks_founder_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_founder" ADD CONSTRAINT "_services_v_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_device_showcase_bullets" ADD CONSTRAINT "_services_v_blocks_device_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_device_showcase_links" ADD CONSTRAINT "_services_v_blocks_device_showcase_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_device_showcase" ADD CONSTRAINT "_services_v_blocks_device_showcase_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_device_showcase" ADD CONSTRAINT "_services_v_blocks_device_showcase_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_device_showcase" ADD CONSTRAINT "_services_v_blocks_device_showcase_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_device_showcase" ADD CONSTRAINT "_services_v_blocks_device_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_grid" ADD CONSTRAINT "_services_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pricing" ADD CONSTRAINT "_services_v_blocks_pricing_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pricing" ADD CONSTRAINT "_services_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_grid_items" ADD CONSTRAINT "_services_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_grid" ADD CONSTRAINT "_services_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_gallery" ADD CONSTRAINT "_services_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_projects_grid" ADD CONSTRAINT "_services_v_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_cloud" ADD CONSTRAINT "_services_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_blog_teaser" ADD CONSTRAINT "_services_v_blocks_blog_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_blog_teaser" ADD CONSTRAINT "_services_v_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_links" ADD CONSTRAINT "_services_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_start_project_types" ADD CONSTRAINT "_services_v_blocks_contact_start_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_start_faqs" ADD CONSTRAINT "_services_v_blocks_contact_start_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_start" ADD CONSTRAINT "_services_v_blocks_contact_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_form" ADD CONSTRAINT "_services_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_menu_example_project_id_projects_id_fk" FOREIGN KEY ("version_menu_example_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_details" ADD CONSTRAINT "projects_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_results" ADD CONSTRAINT "projects_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_bubbles" ADD CONSTRAINT "projects_blocks_hero_bubbles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_highlights" ADD CONSTRAINT "projects_blocks_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_floating_testimonial_id_testimonials_id_fk" FOREIGN KEY ("floating_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_manifesto_lines" ADD CONSTRAINT "projects_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_manifesto_index" ADD CONSTRAINT "projects_blocks_manifesto_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_manifesto" ADD CONSTRAINT "projects_blocks_manifesto_person_portrait_id_media_id_fk" FOREIGN KEY ("person_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_manifesto" ADD CONSTRAINT "projects_blocks_manifesto_person_portrait_smile_id_media_id_fk" FOREIGN KEY ("person_portrait_smile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_manifesto" ADD CONSTRAINT "projects_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_work_rail_items" ADD CONSTRAINT "projects_blocks_work_rail_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_work_rail_items" ADD CONSTRAINT "projects_blocks_work_rail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_work_rail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_work_rail" ADD CONSTRAINT "projects_blocks_work_rail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_service_stack_cards" ADD CONSTRAINT "projects_blocks_service_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_service_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_service_stack" ADD CONSTRAINT "projects_blocks_service_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_service_menu" ADD CONSTRAINT "projects_blocks_service_menu_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_service_menu" ADD CONSTRAINT "projects_blocks_service_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_statement" ADD CONSTRAINT "projects_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_quote_rotator" ADD CONSTRAINT "projects_blocks_quote_rotator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_desktop_poster_id_media_id_fk" FOREIGN KEY ("desktop_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_phone_poster_id_media_id_fk" FOREIGN KEY ("phone_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_phone2_id_media_id_fk" FOREIGN KEY ("phone2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories_stories" ADD CONSTRAINT "projects_blocks_project_stories_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_project_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_stories" ADD CONSTRAINT "projects_blocks_project_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_capabilities_items" ADD CONSTRAINT "projects_blocks_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_capabilities" ADD CONSTRAINT "projects_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text_links" ADD CONSTRAINT "projects_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text" ADD CONSTRAINT "projects_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text" ADD CONSTRAINT "projects_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_founder_links" ADD CONSTRAINT "projects_blocks_founder_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_founder" ADD CONSTRAINT "projects_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_founder" ADD CONSTRAINT "projects_blocks_founder_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_founder" ADD CONSTRAINT "projects_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_device_showcase_bullets" ADD CONSTRAINT "projects_blocks_device_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_device_showcase_links" ADD CONSTRAINT "projects_blocks_device_showcase_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_device_showcase" ADD CONSTRAINT "projects_blocks_device_showcase_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_device_showcase" ADD CONSTRAINT "projects_blocks_device_showcase_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_device_showcase" ADD CONSTRAINT "projects_blocks_device_showcase_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_device_showcase" ADD CONSTRAINT "projects_blocks_device_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_services_grid" ADD CONSTRAINT "projects_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_pricing" ADD CONSTRAINT "projects_blocks_pricing_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_pricing" ADD CONSTRAINT "projects_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid" ADD CONSTRAINT "projects_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_gallery" ADD CONSTRAINT "projects_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_projects_grid" ADD CONSTRAINT "projects_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process_steps_steps" ADD CONSTRAINT "projects_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process_steps" ADD CONSTRAINT "projects_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials" ADD CONSTRAINT "projects_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq" ADD CONSTRAINT "projects_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_logo_cloud" ADD CONSTRAINT "projects_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_blog_teaser" ADD CONSTRAINT "projects_blocks_blog_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_blog_teaser" ADD CONSTRAINT "projects_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_links" ADD CONSTRAINT "projects_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_start_project_types" ADD CONSTRAINT "projects_blocks_contact_start_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_start_faqs" ADD CONSTRAINT "projects_blocks_contact_start_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_start" ADD CONSTRAINT "projects_blocks_contact_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_form" ADD CONSTRAINT "projects_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_gallery_wide_id_media_id_fk" FOREIGN KEY ("gallery_wide_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_gallery_tall_id_media_id_fk" FOREIGN KEY ("gallery_tall_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_desktop_screenshot_id_media_id_fk" FOREIGN KEY ("desktop_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_mobile_screenshot_id_media_id_fk" FOREIGN KEY ("mobile_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_desktop_scroll_id_media_id_fk" FOREIGN KEY ("desktop_scroll_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_mobile_preview_id_media_id_fk" FOREIGN KEY ("mobile_preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_texts" ADD CONSTRAINT "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_details" ADD CONSTRAINT "_projects_v_version_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_results" ADD CONSTRAINT "_projects_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_links" ADD CONSTRAINT "_projects_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_bubbles" ADD CONSTRAINT "_projects_v_blocks_hero_bubbles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_highlights" ADD CONSTRAINT "_projects_v_blocks_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_floating_testimonial_id_testimonials_id_fk" FOREIGN KEY ("floating_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_manifesto_lines" ADD CONSTRAINT "_projects_v_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_manifesto_index" ADD CONSTRAINT "_projects_v_blocks_manifesto_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_manifesto" ADD CONSTRAINT "_projects_v_blocks_manifesto_person_portrait_id_media_id_fk" FOREIGN KEY ("person_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_manifesto" ADD CONSTRAINT "_projects_v_blocks_manifesto_person_portrait_smile_id_media_id_fk" FOREIGN KEY ("person_portrait_smile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_manifesto" ADD CONSTRAINT "_projects_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_work_rail_items" ADD CONSTRAINT "_projects_v_blocks_work_rail_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_work_rail_items" ADD CONSTRAINT "_projects_v_blocks_work_rail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_work_rail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_work_rail" ADD CONSTRAINT "_projects_v_blocks_work_rail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_service_stack_cards" ADD CONSTRAINT "_projects_v_blocks_service_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_service_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_service_stack" ADD CONSTRAINT "_projects_v_blocks_service_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_service_menu" ADD CONSTRAINT "_projects_v_blocks_service_menu_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_service_menu" ADD CONSTRAINT "_projects_v_blocks_service_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_statement" ADD CONSTRAINT "_projects_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_quote_rotator" ADD CONSTRAINT "_projects_v_blocks_quote_rotator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_desktop_poster_id_media_id_fk" FOREIGN KEY ("desktop_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_phone_id_media_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_phone_poster_id_media_id_fk" FOREIGN KEY ("phone_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_phone2_id_media_id_fk" FOREIGN KEY ("phone2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_project_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_stories" ADD CONSTRAINT "_projects_v_blocks_project_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_capabilities_items" ADD CONSTRAINT "_projects_v_blocks_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_capabilities" ADD CONSTRAINT "_projects_v_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text_links" ADD CONSTRAINT "_projects_v_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text" ADD CONSTRAINT "_projects_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text" ADD CONSTRAINT "_projects_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_founder_links" ADD CONSTRAINT "_projects_v_blocks_founder_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_founder" ADD CONSTRAINT "_projects_v_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_founder" ADD CONSTRAINT "_projects_v_blocks_founder_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_founder" ADD CONSTRAINT "_projects_v_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_device_showcase_bullets" ADD CONSTRAINT "_projects_v_blocks_device_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_device_showcase_links" ADD CONSTRAINT "_projects_v_blocks_device_showcase_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_device_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_device_showcase" ADD CONSTRAINT "_projects_v_blocks_device_showcase_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_device_showcase" ADD CONSTRAINT "_projects_v_blocks_device_showcase_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_device_showcase" ADD CONSTRAINT "_projects_v_blocks_device_showcase_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_device_showcase" ADD CONSTRAINT "_projects_v_blocks_device_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_services_grid" ADD CONSTRAINT "_projects_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_pricing" ADD CONSTRAINT "_projects_v_blocks_pricing_contact_page_id_pages_id_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_pricing" ADD CONSTRAINT "_projects_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_items" ADD CONSTRAINT "_projects_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid" ADD CONSTRAINT "_projects_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_gallery" ADD CONSTRAINT "_projects_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_projects_grid" ADD CONSTRAINT "_projects_v_blocks_projects_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process_steps_steps" ADD CONSTRAINT "_projects_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process_steps" ADD CONSTRAINT "_projects_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials" ADD CONSTRAINT "_projects_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq" ADD CONSTRAINT "_projects_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_logo_cloud" ADD CONSTRAINT "_projects_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_blog_teaser" ADD CONSTRAINT "_projects_v_blocks_blog_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_blog_teaser" ADD CONSTRAINT "_projects_v_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta_links" ADD CONSTRAINT "_projects_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta" ADD CONSTRAINT "_projects_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_start_project_types" ADD CONSTRAINT "_projects_v_blocks_contact_start_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_start_faqs" ADD CONSTRAINT "_projects_v_blocks_contact_start_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_contact_start"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_start" ADD CONSTRAINT "_projects_v_blocks_contact_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_form" ADD CONSTRAINT "_projects_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_gallery_wide_id_media_id_fk" FOREIGN KEY ("version_gallery_wide_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_gallery_tall_id_media_id_fk" FOREIGN KEY ("version_gallery_tall_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_desktop_screenshot_id_media_id_fk" FOREIGN KEY ("version_desktop_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_mobile_screenshot_id_media_id_fk" FOREIGN KEY ("version_mobile_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_desktop_scroll_id_media_id_fk" FOREIGN KEY ("version_desktop_scroll_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_mobile_preview_id_media_id_fk" FOREIGN KEY ("version_mobile_preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_texts" ADD CONSTRAINT "_projects_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_social" ADD CONSTRAINT "site_settings_contact_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_emails" ADD CONSTRAINT "lead_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_default_image_id_media_id_fk" FOREIGN KEY ("seo_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_bubbles_order_idx" ON "pages_blocks_hero_bubbles" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_bubbles_parent_id_idx" ON "pages_blocks_hero_bubbles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_highlights_order_idx" ON "pages_blocks_hero_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_highlights_parent_id_idx" ON "pages_blocks_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_portrait_idx" ON "pages_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_hero_signature_image_idx" ON "pages_blocks_hero" USING btree ("signature_image_id");
  CREATE INDEX "pages_blocks_hero_floating_testimonial_idx" ON "pages_blocks_hero" USING btree ("floating_testimonial_id");
  CREATE INDEX "pages_blocks_manifesto_lines_order_idx" ON "pages_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_lines_parent_id_idx" ON "pages_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_index_order_idx" ON "pages_blocks_manifesto_index" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_index_parent_id_idx" ON "pages_blocks_manifesto_index" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_order_idx" ON "pages_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_parent_id_idx" ON "pages_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_path_idx" ON "pages_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "pages_blocks_manifesto_person_person_portrait_idx" ON "pages_blocks_manifesto" USING btree ("person_portrait_id");
  CREATE INDEX "pages_blocks_manifesto_person_person_portrait_smile_idx" ON "pages_blocks_manifesto" USING btree ("person_portrait_smile_id");
  CREATE INDEX "about_experience_points_order_idx" ON "about_experience_points" USING btree ("_order");
  CREATE INDEX "about_experience_points_parent_id_idx" ON "about_experience_points" USING btree ("_parent_id");
  CREATE INDEX "about_proof_screens_order_idx" ON "about_proof_screens" USING btree ("_order");
  CREATE INDEX "about_proof_screens_parent_id_idx" ON "about_proof_screens" USING btree ("_parent_id");
  CREATE INDEX "about_proof_screens_desktop_idx" ON "about_proof_screens" USING btree ("desktop_id");
  CREATE INDEX "about_proof_screens_phone_idx" ON "about_proof_screens" USING btree ("phone_id");
  CREATE INDEX "about_order_idx" ON "about" USING btree ("_order");
  CREATE INDEX "about_parent_id_idx" ON "about" USING btree ("_parent_id");
  CREATE INDEX "about_path_idx" ON "about" USING btree ("_path");
  CREATE INDEX "about_founder_founder_portrait_idx" ON "about" USING btree ("founder_portrait_id");
  CREATE INDEX "about_proof_proof_project_idx" ON "about" USING btree ("proof_project_id");
  CREATE INDEX "pages_blocks_work_rail_items_order_idx" ON "pages_blocks_work_rail_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_work_rail_items_parent_id_idx" ON "pages_blocks_work_rail_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_work_rail_items_project_idx" ON "pages_blocks_work_rail_items" USING btree ("project_id");
  CREATE INDEX "pages_blocks_work_rail_order_idx" ON "pages_blocks_work_rail" USING btree ("_order");
  CREATE INDEX "pages_blocks_work_rail_parent_id_idx" ON "pages_blocks_work_rail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_work_rail_path_idx" ON "pages_blocks_work_rail" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_stack_cards_order_idx" ON "pages_blocks_service_stack_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_stack_cards_parent_id_idx" ON "pages_blocks_service_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_stack_order_idx" ON "pages_blocks_service_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_stack_parent_id_idx" ON "pages_blocks_service_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_stack_path_idx" ON "pages_blocks_service_stack" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_menu_order_idx" ON "pages_blocks_service_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_menu_parent_id_idx" ON "pages_blocks_service_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_menu_path_idx" ON "pages_blocks_service_menu" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_menu_contact_page_idx" ON "pages_blocks_service_menu" USING btree ("contact_page_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_rotator_order_idx" ON "pages_blocks_quote_rotator" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_rotator_parent_id_idx" ON "pages_blocks_quote_rotator" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_rotator_path_idx" ON "pages_blocks_quote_rotator" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_stories_stories_order_idx" ON "pages_blocks_project_stories_stories" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_stories_stories_parent_id_idx" ON "pages_blocks_project_stories_stories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_stories_stories_project_idx" ON "pages_blocks_project_stories_stories" USING btree ("project_id");
  CREATE INDEX "pages_blocks_project_stories_stories_desktop_idx" ON "pages_blocks_project_stories_stories" USING btree ("desktop_id");
  CREATE INDEX "pages_blocks_project_stories_stories_desktop_poster_idx" ON "pages_blocks_project_stories_stories" USING btree ("desktop_poster_id");
  CREATE INDEX "pages_blocks_project_stories_stories_phone_idx" ON "pages_blocks_project_stories_stories" USING btree ("phone_id");
  CREATE INDEX "pages_blocks_project_stories_stories_phone_poster_idx" ON "pages_blocks_project_stories_stories" USING btree ("phone_poster_id");
  CREATE INDEX "pages_blocks_project_stories_stories_phone2_idx" ON "pages_blocks_project_stories_stories" USING btree ("phone2_id");
  CREATE INDEX "pages_blocks_project_stories_order_idx" ON "pages_blocks_project_stories" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_stories_parent_id_idx" ON "pages_blocks_project_stories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_stories_path_idx" ON "pages_blocks_project_stories" USING btree ("_path");
  CREATE INDEX "pages_blocks_capabilities_items_order_idx" ON "pages_blocks_capabilities_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_items_parent_id_idx" ON "pages_blocks_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_order_idx" ON "pages_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_parent_id_idx" ON "pages_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_path_idx" ON "pages_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_links_order_idx" ON "pages_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_links_parent_id_idx" ON "pages_blocks_image_text_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_founder_links_order_idx" ON "pages_blocks_founder_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_links_parent_id_idx" ON "pages_blocks_founder_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_order_idx" ON "pages_blocks_founder" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_parent_id_idx" ON "pages_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_path_idx" ON "pages_blocks_founder" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_portrait_idx" ON "pages_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_founder_signature_image_idx" ON "pages_blocks_founder" USING btree ("signature_image_id");
  CREATE INDEX "pages_blocks_device_showcase_bullets_order_idx" ON "pages_blocks_device_showcase_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_device_showcase_bullets_parent_id_idx" ON "pages_blocks_device_showcase_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_device_showcase_links_order_idx" ON "pages_blocks_device_showcase_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_device_showcase_links_parent_id_idx" ON "pages_blocks_device_showcase_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_device_showcase_order_idx" ON "pages_blocks_device_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_device_showcase_parent_id_idx" ON "pages_blocks_device_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_device_showcase_path_idx" ON "pages_blocks_device_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_device_showcase_project_idx" ON "pages_blocks_device_showcase" USING btree ("project_id");
  CREATE INDEX "pages_blocks_device_showcase_desktop_idx" ON "pages_blocks_device_showcase" USING btree ("desktop_id");
  CREATE INDEX "pages_blocks_device_showcase_mobile_idx" ON "pages_blocks_device_showcase" USING btree ("mobile_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_contact_page_idx" ON "pages_blocks_pricing" USING btree ("contact_page_id");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_gallery_order_idx" ON "pages_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_gallery_parent_id_idx" ON "pages_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_gallery_path_idx" ON "pages_blocks_project_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_grid_order_idx" ON "pages_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_grid_parent_id_idx" ON "pages_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_grid_path_idx" ON "pages_blocks_projects_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_teaser_order_idx" ON "pages_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_teaser_parent_id_idx" ON "pages_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_teaser_path_idx" ON "pages_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_teaser_category_idx" ON "pages_blocks_blog_teaser" USING btree ("category_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_start_project_types_order_idx" ON "pages_blocks_contact_start_project_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_start_project_types_parent_id_idx" ON "pages_blocks_contact_start_project_types" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_start_faqs_order_idx" ON "pages_blocks_contact_start_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_start_faqs_parent_id_idx" ON "pages_blocks_contact_start_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_start_order_idx" ON "pages_blocks_contact_start" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_start_parent_id_idx" ON "pages_blocks_contact_start" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_start_path_idx" ON "pages_blocks_contact_start" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_rels_clients_id_idx" ON "pages_rels" USING btree ("clients_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_bubbles_order_idx" ON "_pages_v_blocks_hero_bubbles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_bubbles_parent_id_idx" ON "_pages_v_blocks_hero_bubbles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_highlights_order_idx" ON "_pages_v_blocks_hero_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_highlights_parent_id_idx" ON "_pages_v_blocks_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_portrait_idx" ON "_pages_v_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_hero_signature_image_idx" ON "_pages_v_blocks_hero" USING btree ("signature_image_id");
  CREATE INDEX "_pages_v_blocks_hero_floating_testimonial_idx" ON "_pages_v_blocks_hero" USING btree ("floating_testimonial_id");
  CREATE INDEX "_pages_v_blocks_manifesto_lines_order_idx" ON "_pages_v_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_manifesto_lines_parent_id_idx" ON "_pages_v_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_manifesto_index_order_idx" ON "_pages_v_blocks_manifesto_index" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_manifesto_index_parent_id_idx" ON "_pages_v_blocks_manifesto_index" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_manifesto_order_idx" ON "_pages_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_manifesto_parent_id_idx" ON "_pages_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_manifesto_path_idx" ON "_pages_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_manifesto_person_person_portrait_idx" ON "_pages_v_blocks_manifesto" USING btree ("person_portrait_id");
  CREATE INDEX "_pages_v_blocks_manifesto_person_person_portrait_smile_idx" ON "_pages_v_blocks_manifesto" USING btree ("person_portrait_smile_id");
  CREATE INDEX "_about_v_experience_points_order_idx" ON "_about_v_experience_points" USING btree ("_order");
  CREATE INDEX "_about_v_experience_points_parent_id_idx" ON "_about_v_experience_points" USING btree ("_parent_id");
  CREATE INDEX "_about_v_proof_screens_order_idx" ON "_about_v_proof_screens" USING btree ("_order");
  CREATE INDEX "_about_v_proof_screens_parent_id_idx" ON "_about_v_proof_screens" USING btree ("_parent_id");
  CREATE INDEX "_about_v_proof_screens_desktop_idx" ON "_about_v_proof_screens" USING btree ("desktop_id");
  CREATE INDEX "_about_v_proof_screens_phone_idx" ON "_about_v_proof_screens" USING btree ("phone_id");
  CREATE INDEX "_about_v_order_idx" ON "_about_v" USING btree ("_order");
  CREATE INDEX "_about_v_parent_id_idx" ON "_about_v" USING btree ("_parent_id");
  CREATE INDEX "_about_v_path_idx" ON "_about_v" USING btree ("_path");
  CREATE INDEX "_about_v_founder_founder_portrait_idx" ON "_about_v" USING btree ("founder_portrait_id");
  CREATE INDEX "_about_v_proof_proof_project_idx" ON "_about_v" USING btree ("proof_project_id");
  CREATE INDEX "_pages_v_blocks_work_rail_items_order_idx" ON "_pages_v_blocks_work_rail_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_work_rail_items_parent_id_idx" ON "_pages_v_blocks_work_rail_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_work_rail_items_project_idx" ON "_pages_v_blocks_work_rail_items" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_work_rail_order_idx" ON "_pages_v_blocks_work_rail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_work_rail_parent_id_idx" ON "_pages_v_blocks_work_rail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_work_rail_path_idx" ON "_pages_v_blocks_work_rail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_stack_cards_order_idx" ON "_pages_v_blocks_service_stack_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_stack_cards_parent_id_idx" ON "_pages_v_blocks_service_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_stack_order_idx" ON "_pages_v_blocks_service_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_stack_parent_id_idx" ON "_pages_v_blocks_service_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_stack_path_idx" ON "_pages_v_blocks_service_stack" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_menu_order_idx" ON "_pages_v_blocks_service_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_menu_parent_id_idx" ON "_pages_v_blocks_service_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_menu_path_idx" ON "_pages_v_blocks_service_menu" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_menu_contact_page_idx" ON "_pages_v_blocks_service_menu" USING btree ("contact_page_id");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quote_rotator_order_idx" ON "_pages_v_blocks_quote_rotator" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_rotator_parent_id_idx" ON "_pages_v_blocks_quote_rotator" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_rotator_path_idx" ON "_pages_v_blocks_quote_rotator" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_order_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_parent_id_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_project_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_desktop_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("desktop_id");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_desktop_poster_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("desktop_poster_id");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_phone_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("phone_id");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_phone_poster_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("phone_poster_id");
  CREATE INDEX "_pages_v_blocks_project_stories_stories_phone2_idx" ON "_pages_v_blocks_project_stories_stories" USING btree ("phone2_id");
  CREATE INDEX "_pages_v_blocks_project_stories_order_idx" ON "_pages_v_blocks_project_stories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_stories_parent_id_idx" ON "_pages_v_blocks_project_stories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_stories_path_idx" ON "_pages_v_blocks_project_stories" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capabilities_items_order_idx" ON "_pages_v_blocks_capabilities_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capabilities_items_parent_id_idx" ON "_pages_v_blocks_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capabilities_order_idx" ON "_pages_v_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capabilities_parent_id_idx" ON "_pages_v_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capabilities_path_idx" ON "_pages_v_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_links_order_idx" ON "_pages_v_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_links_parent_id_idx" ON "_pages_v_blocks_image_text_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_founder_links_order_idx" ON "_pages_v_blocks_founder_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_links_parent_id_idx" ON "_pages_v_blocks_founder_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_order_idx" ON "_pages_v_blocks_founder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_parent_id_idx" ON "_pages_v_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_path_idx" ON "_pages_v_blocks_founder" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_portrait_idx" ON "_pages_v_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_founder_signature_image_idx" ON "_pages_v_blocks_founder" USING btree ("signature_image_id");
  CREATE INDEX "_pages_v_blocks_device_showcase_bullets_order_idx" ON "_pages_v_blocks_device_showcase_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_device_showcase_bullets_parent_id_idx" ON "_pages_v_blocks_device_showcase_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_device_showcase_links_order_idx" ON "_pages_v_blocks_device_showcase_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_device_showcase_links_parent_id_idx" ON "_pages_v_blocks_device_showcase_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_device_showcase_order_idx" ON "_pages_v_blocks_device_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_device_showcase_parent_id_idx" ON "_pages_v_blocks_device_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_device_showcase_path_idx" ON "_pages_v_blocks_device_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_device_showcase_project_idx" ON "_pages_v_blocks_device_showcase" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_device_showcase_desktop_idx" ON "_pages_v_blocks_device_showcase" USING btree ("desktop_id");
  CREATE INDEX "_pages_v_blocks_device_showcase_mobile_idx" ON "_pages_v_blocks_device_showcase" USING btree ("mobile_id");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_contact_page_idx" ON "_pages_v_blocks_pricing" USING btree ("contact_page_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_order_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_gallery_order_idx" ON "_pages_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_gallery_parent_id_idx" ON "_pages_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_gallery_path_idx" ON "_pages_v_blocks_project_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_grid_order_idx" ON "_pages_v_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_grid_parent_id_idx" ON "_pages_v_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_grid_path_idx" ON "_pages_v_blocks_projects_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_teaser_order_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_teaser_parent_id_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_teaser_path_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_teaser_category_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_start_project_types_order_idx" ON "_pages_v_blocks_contact_start_project_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_start_project_types_parent_id_idx" ON "_pages_v_blocks_contact_start_project_types" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_start_faqs_order_idx" ON "_pages_v_blocks_contact_start_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_start_faqs_parent_id_idx" ON "_pages_v_blocks_contact_start_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_start_order_idx" ON "_pages_v_blocks_contact_start" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_start_parent_id_idx" ON "_pages_v_blocks_contact_start" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_start_path_idx" ON "_pages_v_blocks_contact_start" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_clients_id_idx" ON "_pages_v_rels" USING btree ("clients_id");
  CREATE INDEX "services_pricing_niches_order_idx" ON "services_pricing_niches" USING btree ("_order");
  CREATE INDEX "services_pricing_niches_parent_id_idx" ON "services_pricing_niches" USING btree ("_parent_id");
  CREATE INDEX "services_pricing_process_order_idx" ON "services_pricing_process" USING btree ("_order");
  CREATE INDEX "services_pricing_process_parent_id_idx" ON "services_pricing_process" USING btree ("_parent_id");
  CREATE INDEX "services_pricing_included_order_idx" ON "services_pricing_included" USING btree ("_order");
  CREATE INDEX "services_pricing_included_parent_id_idx" ON "services_pricing_included" USING btree ("_parent_id");
  CREATE INDEX "services_menu_capabilities_order_idx" ON "services_menu_capabilities" USING btree ("_order");
  CREATE INDEX "services_menu_capabilities_parent_id_idx" ON "services_menu_capabilities" USING btree ("_parent_id");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_links_order_idx" ON "services_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_links_parent_id_idx" ON "services_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_bubbles_order_idx" ON "services_blocks_hero_bubbles" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_bubbles_parent_id_idx" ON "services_blocks_hero_bubbles" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_highlights_order_idx" ON "services_blocks_hero_highlights" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_highlights_parent_id_idx" ON "services_blocks_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_image_idx" ON "services_blocks_hero" USING btree ("image_id");
  CREATE INDEX "services_blocks_hero_portrait_idx" ON "services_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "services_blocks_hero_signature_image_idx" ON "services_blocks_hero" USING btree ("signature_image_id");
  CREATE INDEX "services_blocks_hero_floating_testimonial_idx" ON "services_blocks_hero" USING btree ("floating_testimonial_id");
  CREATE INDEX "services_blocks_manifesto_lines_order_idx" ON "services_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "services_blocks_manifesto_lines_parent_id_idx" ON "services_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_manifesto_index_order_idx" ON "services_blocks_manifesto_index" USING btree ("_order");
  CREATE INDEX "services_blocks_manifesto_index_parent_id_idx" ON "services_blocks_manifesto_index" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_manifesto_order_idx" ON "services_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "services_blocks_manifesto_parent_id_idx" ON "services_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_manifesto_path_idx" ON "services_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "services_blocks_manifesto_person_person_portrait_idx" ON "services_blocks_manifesto" USING btree ("person_portrait_id");
  CREATE INDEX "services_blocks_manifesto_person_person_portrait_smile_idx" ON "services_blocks_manifesto" USING btree ("person_portrait_smile_id");
  CREATE INDEX "services_blocks_work_rail_items_order_idx" ON "services_blocks_work_rail_items" USING btree ("_order");
  CREATE INDEX "services_blocks_work_rail_items_parent_id_idx" ON "services_blocks_work_rail_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_work_rail_items_project_idx" ON "services_blocks_work_rail_items" USING btree ("project_id");
  CREATE INDEX "services_blocks_work_rail_order_idx" ON "services_blocks_work_rail" USING btree ("_order");
  CREATE INDEX "services_blocks_work_rail_parent_id_idx" ON "services_blocks_work_rail" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_work_rail_path_idx" ON "services_blocks_work_rail" USING btree ("_path");
  CREATE INDEX "services_blocks_service_stack_cards_order_idx" ON "services_blocks_service_stack_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_service_stack_cards_parent_id_idx" ON "services_blocks_service_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_stack_order_idx" ON "services_blocks_service_stack" USING btree ("_order");
  CREATE INDEX "services_blocks_service_stack_parent_id_idx" ON "services_blocks_service_stack" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_stack_path_idx" ON "services_blocks_service_stack" USING btree ("_path");
  CREATE INDEX "services_blocks_service_menu_order_idx" ON "services_blocks_service_menu" USING btree ("_order");
  CREATE INDEX "services_blocks_service_menu_parent_id_idx" ON "services_blocks_service_menu" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_menu_path_idx" ON "services_blocks_service_menu" USING btree ("_path");
  CREATE INDEX "services_blocks_service_menu_contact_page_idx" ON "services_blocks_service_menu" USING btree ("contact_page_id");
  CREATE INDEX "services_blocks_statement_order_idx" ON "services_blocks_statement" USING btree ("_order");
  CREATE INDEX "services_blocks_statement_parent_id_idx" ON "services_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_statement_path_idx" ON "services_blocks_statement" USING btree ("_path");
  CREATE INDEX "services_blocks_quote_rotator_order_idx" ON "services_blocks_quote_rotator" USING btree ("_order");
  CREATE INDEX "services_blocks_quote_rotator_parent_id_idx" ON "services_blocks_quote_rotator" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_quote_rotator_path_idx" ON "services_blocks_quote_rotator" USING btree ("_path");
  CREATE INDEX "services_blocks_project_stories_stories_order_idx" ON "services_blocks_project_stories_stories" USING btree ("_order");
  CREATE INDEX "services_blocks_project_stories_stories_parent_id_idx" ON "services_blocks_project_stories_stories" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_project_stories_stories_project_idx" ON "services_blocks_project_stories_stories" USING btree ("project_id");
  CREATE INDEX "services_blocks_project_stories_stories_desktop_idx" ON "services_blocks_project_stories_stories" USING btree ("desktop_id");
  CREATE INDEX "services_blocks_project_stories_stories_desktop_poster_idx" ON "services_blocks_project_stories_stories" USING btree ("desktop_poster_id");
  CREATE INDEX "services_blocks_project_stories_stories_phone_idx" ON "services_blocks_project_stories_stories" USING btree ("phone_id");
  CREATE INDEX "services_blocks_project_stories_stories_phone_poster_idx" ON "services_blocks_project_stories_stories" USING btree ("phone_poster_id");
  CREATE INDEX "services_blocks_project_stories_stories_phone2_idx" ON "services_blocks_project_stories_stories" USING btree ("phone2_id");
  CREATE INDEX "services_blocks_project_stories_order_idx" ON "services_blocks_project_stories" USING btree ("_order");
  CREATE INDEX "services_blocks_project_stories_parent_id_idx" ON "services_blocks_project_stories" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_project_stories_path_idx" ON "services_blocks_project_stories" USING btree ("_path");
  CREATE INDEX "services_blocks_capabilities_items_order_idx" ON "services_blocks_capabilities_items" USING btree ("_order");
  CREATE INDEX "services_blocks_capabilities_items_parent_id_idx" ON "services_blocks_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_capabilities_order_idx" ON "services_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "services_blocks_capabilities_parent_id_idx" ON "services_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_capabilities_path_idx" ON "services_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "services_blocks_image_text_links_order_idx" ON "services_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "services_blocks_image_text_links_parent_id_idx" ON "services_blocks_image_text_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_text_order_idx" ON "services_blocks_image_text" USING btree ("_order");
  CREATE INDEX "services_blocks_image_text_parent_id_idx" ON "services_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_text_path_idx" ON "services_blocks_image_text" USING btree ("_path");
  CREATE INDEX "services_blocks_image_text_image_idx" ON "services_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "services_blocks_founder_links_order_idx" ON "services_blocks_founder_links" USING btree ("_order");
  CREATE INDEX "services_blocks_founder_links_parent_id_idx" ON "services_blocks_founder_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_founder_order_idx" ON "services_blocks_founder" USING btree ("_order");
  CREATE INDEX "services_blocks_founder_parent_id_idx" ON "services_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_founder_path_idx" ON "services_blocks_founder" USING btree ("_path");
  CREATE INDEX "services_blocks_founder_portrait_idx" ON "services_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "services_blocks_founder_signature_image_idx" ON "services_blocks_founder" USING btree ("signature_image_id");
  CREATE INDEX "services_blocks_device_showcase_bullets_order_idx" ON "services_blocks_device_showcase_bullets" USING btree ("_order");
  CREATE INDEX "services_blocks_device_showcase_bullets_parent_id_idx" ON "services_blocks_device_showcase_bullets" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_device_showcase_links_order_idx" ON "services_blocks_device_showcase_links" USING btree ("_order");
  CREATE INDEX "services_blocks_device_showcase_links_parent_id_idx" ON "services_blocks_device_showcase_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_device_showcase_order_idx" ON "services_blocks_device_showcase" USING btree ("_order");
  CREATE INDEX "services_blocks_device_showcase_parent_id_idx" ON "services_blocks_device_showcase" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_device_showcase_path_idx" ON "services_blocks_device_showcase" USING btree ("_path");
  CREATE INDEX "services_blocks_device_showcase_project_idx" ON "services_blocks_device_showcase" USING btree ("project_id");
  CREATE INDEX "services_blocks_device_showcase_desktop_idx" ON "services_blocks_device_showcase" USING btree ("desktop_id");
  CREATE INDEX "services_blocks_device_showcase_mobile_idx" ON "services_blocks_device_showcase" USING btree ("mobile_id");
  CREATE INDEX "services_blocks_services_grid_order_idx" ON "services_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_services_grid_parent_id_idx" ON "services_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_grid_path_idx" ON "services_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_pricing_order_idx" ON "services_blocks_pricing" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_parent_id_idx" ON "services_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_path_idx" ON "services_blocks_pricing" USING btree ("_path");
  CREATE INDEX "services_blocks_pricing_contact_page_idx" ON "services_blocks_pricing" USING btree ("contact_page_id");
  CREATE INDEX "services_blocks_feature_grid_items_order_idx" ON "services_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_items_parent_id_idx" ON "services_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_order_idx" ON "services_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_parent_id_idx" ON "services_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_path_idx" ON "services_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_project_gallery_order_idx" ON "services_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_project_gallery_parent_id_idx" ON "services_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_project_gallery_path_idx" ON "services_blocks_project_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_projects_grid_order_idx" ON "services_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_projects_grid_parent_id_idx" ON "services_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_projects_grid_path_idx" ON "services_blocks_projects_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_process_steps_steps_order_idx" ON "services_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_steps_parent_id_idx" ON "services_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_steps_order_idx" ON "services_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_parent_id_idx" ON "services_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_steps_path_idx" ON "services_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE INDEX "services_blocks_logo_cloud_order_idx" ON "services_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "services_blocks_logo_cloud_parent_id_idx" ON "services_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logo_cloud_path_idx" ON "services_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "services_blocks_blog_teaser_order_idx" ON "services_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "services_blocks_blog_teaser_parent_id_idx" ON "services_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_blog_teaser_path_idx" ON "services_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "services_blocks_blog_teaser_category_idx" ON "services_blocks_blog_teaser" USING btree ("category_id");
  CREATE INDEX "services_blocks_cta_links_order_idx" ON "services_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_links_parent_id_idx" ON "services_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_contact_start_project_types_order_idx" ON "services_blocks_contact_start_project_types" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_start_project_types_parent_id_idx" ON "services_blocks_contact_start_project_types" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_start_faqs_order_idx" ON "services_blocks_contact_start_faqs" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_start_faqs_parent_id_idx" ON "services_blocks_contact_start_faqs" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_start_order_idx" ON "services_blocks_contact_start" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_start_parent_id_idx" ON "services_blocks_contact_start" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_start_path_idx" ON "services_blocks_contact_start" USING btree ("_path");
  CREATE INDEX "services_blocks_contact_form_order_idx" ON "services_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_form_parent_id_idx" ON "services_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_form_path_idx" ON "services_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_menu_menu_example_project_idx" ON "services" USING btree ("menu_example_project_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_rels_faqs_id_idx" ON "services_rels" USING btree ("faqs_id");
  CREATE INDEX "services_rels_clients_id_idx" ON "services_rels" USING btree ("clients_id");
  CREATE INDEX "_services_v_version_pricing_niches_order_idx" ON "_services_v_version_pricing_niches" USING btree ("_order");
  CREATE INDEX "_services_v_version_pricing_niches_parent_id_idx" ON "_services_v_version_pricing_niches" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_pricing_process_order_idx" ON "_services_v_version_pricing_process" USING btree ("_order");
  CREATE INDEX "_services_v_version_pricing_process_parent_id_idx" ON "_services_v_version_pricing_process" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_pricing_included_order_idx" ON "_services_v_version_pricing_included" USING btree ("_order");
  CREATE INDEX "_services_v_version_pricing_included_parent_id_idx" ON "_services_v_version_pricing_included" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_menu_capabilities_order_idx" ON "_services_v_version_menu_capabilities" USING btree ("_order");
  CREATE INDEX "_services_v_version_menu_capabilities_parent_id_idx" ON "_services_v_version_menu_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_features_order_idx" ON "_services_v_version_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_features_parent_id_idx" ON "_services_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_links_order_idx" ON "_services_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_links_parent_id_idx" ON "_services_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_bubbles_order_idx" ON "_services_v_blocks_hero_bubbles" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_bubbles_parent_id_idx" ON "_services_v_blocks_hero_bubbles" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_highlights_order_idx" ON "_services_v_blocks_hero_highlights" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_highlights_parent_id_idx" ON "_services_v_blocks_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_image_idx" ON "_services_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_hero_portrait_idx" ON "_services_v_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "_services_v_blocks_hero_signature_image_idx" ON "_services_v_blocks_hero" USING btree ("signature_image_id");
  CREATE INDEX "_services_v_blocks_hero_floating_testimonial_idx" ON "_services_v_blocks_hero" USING btree ("floating_testimonial_id");
  CREATE INDEX "_services_v_blocks_manifesto_lines_order_idx" ON "_services_v_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_manifesto_lines_parent_id_idx" ON "_services_v_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_manifesto_index_order_idx" ON "_services_v_blocks_manifesto_index" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_manifesto_index_parent_id_idx" ON "_services_v_blocks_manifesto_index" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_manifesto_order_idx" ON "_services_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_manifesto_parent_id_idx" ON "_services_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_manifesto_path_idx" ON "_services_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_manifesto_person_person_portrait_idx" ON "_services_v_blocks_manifesto" USING btree ("person_portrait_id");
  CREATE INDEX "_services_v_blocks_manifesto_person_person_portrait_smil_idx" ON "_services_v_blocks_manifesto" USING btree ("person_portrait_smile_id");
  CREATE INDEX "_services_v_blocks_work_rail_items_order_idx" ON "_services_v_blocks_work_rail_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_work_rail_items_parent_id_idx" ON "_services_v_blocks_work_rail_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_work_rail_items_project_idx" ON "_services_v_blocks_work_rail_items" USING btree ("project_id");
  CREATE INDEX "_services_v_blocks_work_rail_order_idx" ON "_services_v_blocks_work_rail" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_work_rail_parent_id_idx" ON "_services_v_blocks_work_rail" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_work_rail_path_idx" ON "_services_v_blocks_work_rail" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_service_stack_cards_order_idx" ON "_services_v_blocks_service_stack_cards" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_stack_cards_parent_id_idx" ON "_services_v_blocks_service_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_stack_order_idx" ON "_services_v_blocks_service_stack" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_stack_parent_id_idx" ON "_services_v_blocks_service_stack" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_stack_path_idx" ON "_services_v_blocks_service_stack" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_service_menu_order_idx" ON "_services_v_blocks_service_menu" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_menu_parent_id_idx" ON "_services_v_blocks_service_menu" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_menu_path_idx" ON "_services_v_blocks_service_menu" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_service_menu_contact_page_idx" ON "_services_v_blocks_service_menu" USING btree ("contact_page_id");
  CREATE INDEX "_services_v_blocks_statement_order_idx" ON "_services_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_statement_parent_id_idx" ON "_services_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_statement_path_idx" ON "_services_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_quote_rotator_order_idx" ON "_services_v_blocks_quote_rotator" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_quote_rotator_parent_id_idx" ON "_services_v_blocks_quote_rotator" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_quote_rotator_path_idx" ON "_services_v_blocks_quote_rotator" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_project_stories_stories_order_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_project_stories_stories_parent_id_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_project_stories_stories_project_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("project_id");
  CREATE INDEX "_services_v_blocks_project_stories_stories_desktop_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("desktop_id");
  CREATE INDEX "_services_v_blocks_project_stories_stories_desktop_poste_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("desktop_poster_id");
  CREATE INDEX "_services_v_blocks_project_stories_stories_phone_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("phone_id");
  CREATE INDEX "_services_v_blocks_project_stories_stories_phone_poster_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("phone_poster_id");
  CREATE INDEX "_services_v_blocks_project_stories_stories_phone2_idx" ON "_services_v_blocks_project_stories_stories" USING btree ("phone2_id");
  CREATE INDEX "_services_v_blocks_project_stories_order_idx" ON "_services_v_blocks_project_stories" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_project_stories_parent_id_idx" ON "_services_v_blocks_project_stories" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_project_stories_path_idx" ON "_services_v_blocks_project_stories" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_capabilities_items_order_idx" ON "_services_v_blocks_capabilities_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_capabilities_items_parent_id_idx" ON "_services_v_blocks_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_capabilities_order_idx" ON "_services_v_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_capabilities_parent_id_idx" ON "_services_v_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_capabilities_path_idx" ON "_services_v_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_text_links_order_idx" ON "_services_v_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_image_text_links_parent_id_idx" ON "_services_v_blocks_image_text_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_image_text_order_idx" ON "_services_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_image_text_parent_id_idx" ON "_services_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_image_text_path_idx" ON "_services_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_text_image_idx" ON "_services_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_founder_links_order_idx" ON "_services_v_blocks_founder_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_founder_links_parent_id_idx" ON "_services_v_blocks_founder_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_founder_order_idx" ON "_services_v_blocks_founder" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_founder_parent_id_idx" ON "_services_v_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_founder_path_idx" ON "_services_v_blocks_founder" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_founder_portrait_idx" ON "_services_v_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "_services_v_blocks_founder_signature_image_idx" ON "_services_v_blocks_founder" USING btree ("signature_image_id");
  CREATE INDEX "_services_v_blocks_device_showcase_bullets_order_idx" ON "_services_v_blocks_device_showcase_bullets" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_device_showcase_bullets_parent_id_idx" ON "_services_v_blocks_device_showcase_bullets" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_device_showcase_links_order_idx" ON "_services_v_blocks_device_showcase_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_device_showcase_links_parent_id_idx" ON "_services_v_blocks_device_showcase_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_device_showcase_order_idx" ON "_services_v_blocks_device_showcase" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_device_showcase_parent_id_idx" ON "_services_v_blocks_device_showcase" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_device_showcase_path_idx" ON "_services_v_blocks_device_showcase" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_device_showcase_project_idx" ON "_services_v_blocks_device_showcase" USING btree ("project_id");
  CREATE INDEX "_services_v_blocks_device_showcase_desktop_idx" ON "_services_v_blocks_device_showcase" USING btree ("desktop_id");
  CREATE INDEX "_services_v_blocks_device_showcase_mobile_idx" ON "_services_v_blocks_device_showcase" USING btree ("mobile_id");
  CREATE INDEX "_services_v_blocks_services_grid_order_idx" ON "_services_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_grid_parent_id_idx" ON "_services_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_grid_path_idx" ON "_services_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_pricing_order_idx" ON "_services_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pricing_parent_id_idx" ON "_services_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pricing_path_idx" ON "_services_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_pricing_contact_page_idx" ON "_services_v_blocks_pricing" USING btree ("contact_page_id");
  CREATE INDEX "_services_v_blocks_feature_grid_items_order_idx" ON "_services_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_grid_items_parent_id_idx" ON "_services_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_grid_order_idx" ON "_services_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_grid_parent_id_idx" ON "_services_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_grid_path_idx" ON "_services_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_project_gallery_order_idx" ON "_services_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_project_gallery_parent_id_idx" ON "_services_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_project_gallery_path_idx" ON "_services_v_blocks_project_gallery" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_projects_grid_order_idx" ON "_services_v_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_projects_grid_parent_id_idx" ON "_services_v_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_projects_grid_path_idx" ON "_services_v_blocks_projects_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_process_steps_steps_order_idx" ON "_services_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_steps_parent_id_idx" ON "_services_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_steps_order_idx" ON "_services_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_parent_id_idx" ON "_services_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_steps_path_idx" ON "_services_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_logo_cloud_order_idx" ON "_services_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_logo_cloud_parent_id_idx" ON "_services_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_logo_cloud_path_idx" ON "_services_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_blog_teaser_order_idx" ON "_services_v_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_blog_teaser_parent_id_idx" ON "_services_v_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_blog_teaser_path_idx" ON "_services_v_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_blog_teaser_category_idx" ON "_services_v_blocks_blog_teaser" USING btree ("category_id");
  CREATE INDEX "_services_v_blocks_cta_links_order_idx" ON "_services_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_links_parent_id_idx" ON "_services_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_contact_start_project_types_order_idx" ON "_services_v_blocks_contact_start_project_types" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_start_project_types_parent_id_idx" ON "_services_v_blocks_contact_start_project_types" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_start_faqs_order_idx" ON "_services_v_blocks_contact_start_faqs" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_start_faqs_parent_id_idx" ON "_services_v_blocks_contact_start_faqs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_start_order_idx" ON "_services_v_blocks_contact_start" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_start_parent_id_idx" ON "_services_v_blocks_contact_start" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_start_path_idx" ON "_services_v_blocks_contact_start" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_contact_form_order_idx" ON "_services_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_form_parent_id_idx" ON "_services_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_form_path_idx" ON "_services_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version__order_idx" ON "_services_v" USING btree ("version__order");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_menu_version_menu_example_project_idx" ON "_services_v" USING btree ("version_menu_example_project_id");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_projects_id_idx" ON "_services_v_rels" USING btree ("projects_id");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_services_v_rels_faqs_id_idx" ON "_services_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_services_v_rels_clients_id_idx" ON "_services_v_rels" USING btree ("clients_id");
  CREATE INDEX "projects_details_order_idx" ON "projects_details" USING btree ("_order");
  CREATE INDEX "projects_details_parent_id_idx" ON "projects_details" USING btree ("_parent_id");
  CREATE INDEX "projects_results_order_idx" ON "projects_results" USING btree ("_order");
  CREATE INDEX "projects_results_parent_id_idx" ON "projects_results" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_links_order_idx" ON "projects_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_links_parent_id_idx" ON "projects_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_bubbles_order_idx" ON "projects_blocks_hero_bubbles" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_bubbles_parent_id_idx" ON "projects_blocks_hero_bubbles" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_highlights_order_idx" ON "projects_blocks_hero_highlights" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_highlights_parent_id_idx" ON "projects_blocks_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_image_idx" ON "projects_blocks_hero" USING btree ("image_id");
  CREATE INDEX "projects_blocks_hero_portrait_idx" ON "projects_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "projects_blocks_hero_signature_image_idx" ON "projects_blocks_hero" USING btree ("signature_image_id");
  CREATE INDEX "projects_blocks_hero_floating_testimonial_idx" ON "projects_blocks_hero" USING btree ("floating_testimonial_id");
  CREATE INDEX "projects_blocks_manifesto_lines_order_idx" ON "projects_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "projects_blocks_manifesto_lines_parent_id_idx" ON "projects_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_manifesto_index_order_idx" ON "projects_blocks_manifesto_index" USING btree ("_order");
  CREATE INDEX "projects_blocks_manifesto_index_parent_id_idx" ON "projects_blocks_manifesto_index" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_manifesto_order_idx" ON "projects_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "projects_blocks_manifesto_parent_id_idx" ON "projects_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_manifesto_path_idx" ON "projects_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "projects_blocks_manifesto_person_person_portrait_idx" ON "projects_blocks_manifesto" USING btree ("person_portrait_id");
  CREATE INDEX "projects_blocks_manifesto_person_person_portrait_smile_idx" ON "projects_blocks_manifesto" USING btree ("person_portrait_smile_id");
  CREATE INDEX "projects_blocks_work_rail_items_order_idx" ON "projects_blocks_work_rail_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_work_rail_items_parent_id_idx" ON "projects_blocks_work_rail_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_work_rail_items_project_idx" ON "projects_blocks_work_rail_items" USING btree ("project_id");
  CREATE INDEX "projects_blocks_work_rail_order_idx" ON "projects_blocks_work_rail" USING btree ("_order");
  CREATE INDEX "projects_blocks_work_rail_parent_id_idx" ON "projects_blocks_work_rail" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_work_rail_path_idx" ON "projects_blocks_work_rail" USING btree ("_path");
  CREATE INDEX "projects_blocks_service_stack_cards_order_idx" ON "projects_blocks_service_stack_cards" USING btree ("_order");
  CREATE INDEX "projects_blocks_service_stack_cards_parent_id_idx" ON "projects_blocks_service_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_service_stack_order_idx" ON "projects_blocks_service_stack" USING btree ("_order");
  CREATE INDEX "projects_blocks_service_stack_parent_id_idx" ON "projects_blocks_service_stack" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_service_stack_path_idx" ON "projects_blocks_service_stack" USING btree ("_path");
  CREATE INDEX "projects_blocks_service_menu_order_idx" ON "projects_blocks_service_menu" USING btree ("_order");
  CREATE INDEX "projects_blocks_service_menu_parent_id_idx" ON "projects_blocks_service_menu" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_service_menu_path_idx" ON "projects_blocks_service_menu" USING btree ("_path");
  CREATE INDEX "projects_blocks_service_menu_contact_page_idx" ON "projects_blocks_service_menu" USING btree ("contact_page_id");
  CREATE INDEX "projects_blocks_statement_order_idx" ON "projects_blocks_statement" USING btree ("_order");
  CREATE INDEX "projects_blocks_statement_parent_id_idx" ON "projects_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_statement_path_idx" ON "projects_blocks_statement" USING btree ("_path");
  CREATE INDEX "projects_blocks_quote_rotator_order_idx" ON "projects_blocks_quote_rotator" USING btree ("_order");
  CREATE INDEX "projects_blocks_quote_rotator_parent_id_idx" ON "projects_blocks_quote_rotator" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_quote_rotator_path_idx" ON "projects_blocks_quote_rotator" USING btree ("_path");
  CREATE INDEX "projects_blocks_project_stories_stories_order_idx" ON "projects_blocks_project_stories_stories" USING btree ("_order");
  CREATE INDEX "projects_blocks_project_stories_stories_parent_id_idx" ON "projects_blocks_project_stories_stories" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_project_stories_stories_project_idx" ON "projects_blocks_project_stories_stories" USING btree ("project_id");
  CREATE INDEX "projects_blocks_project_stories_stories_desktop_idx" ON "projects_blocks_project_stories_stories" USING btree ("desktop_id");
  CREATE INDEX "projects_blocks_project_stories_stories_desktop_poster_idx" ON "projects_blocks_project_stories_stories" USING btree ("desktop_poster_id");
  CREATE INDEX "projects_blocks_project_stories_stories_phone_idx" ON "projects_blocks_project_stories_stories" USING btree ("phone_id");
  CREATE INDEX "projects_blocks_project_stories_stories_phone_poster_idx" ON "projects_blocks_project_stories_stories" USING btree ("phone_poster_id");
  CREATE INDEX "projects_blocks_project_stories_stories_phone2_idx" ON "projects_blocks_project_stories_stories" USING btree ("phone2_id");
  CREATE INDEX "projects_blocks_project_stories_order_idx" ON "projects_blocks_project_stories" USING btree ("_order");
  CREATE INDEX "projects_blocks_project_stories_parent_id_idx" ON "projects_blocks_project_stories" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_project_stories_path_idx" ON "projects_blocks_project_stories" USING btree ("_path");
  CREATE INDEX "projects_blocks_capabilities_items_order_idx" ON "projects_blocks_capabilities_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_capabilities_items_parent_id_idx" ON "projects_blocks_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_capabilities_order_idx" ON "projects_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "projects_blocks_capabilities_parent_id_idx" ON "projects_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_capabilities_path_idx" ON "projects_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_text_links_order_idx" ON "projects_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_text_links_parent_id_idx" ON "projects_blocks_image_text_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_text_order_idx" ON "projects_blocks_image_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_text_parent_id_idx" ON "projects_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_text_path_idx" ON "projects_blocks_image_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_text_image_idx" ON "projects_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "projects_blocks_founder_links_order_idx" ON "projects_blocks_founder_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_founder_links_parent_id_idx" ON "projects_blocks_founder_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_founder_order_idx" ON "projects_blocks_founder" USING btree ("_order");
  CREATE INDEX "projects_blocks_founder_parent_id_idx" ON "projects_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_founder_path_idx" ON "projects_blocks_founder" USING btree ("_path");
  CREATE INDEX "projects_blocks_founder_portrait_idx" ON "projects_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "projects_blocks_founder_signature_image_idx" ON "projects_blocks_founder" USING btree ("signature_image_id");
  CREATE INDEX "projects_blocks_device_showcase_bullets_order_idx" ON "projects_blocks_device_showcase_bullets" USING btree ("_order");
  CREATE INDEX "projects_blocks_device_showcase_bullets_parent_id_idx" ON "projects_blocks_device_showcase_bullets" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_device_showcase_links_order_idx" ON "projects_blocks_device_showcase_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_device_showcase_links_parent_id_idx" ON "projects_blocks_device_showcase_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_device_showcase_order_idx" ON "projects_blocks_device_showcase" USING btree ("_order");
  CREATE INDEX "projects_blocks_device_showcase_parent_id_idx" ON "projects_blocks_device_showcase" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_device_showcase_path_idx" ON "projects_blocks_device_showcase" USING btree ("_path");
  CREATE INDEX "projects_blocks_device_showcase_project_idx" ON "projects_blocks_device_showcase" USING btree ("project_id");
  CREATE INDEX "projects_blocks_device_showcase_desktop_idx" ON "projects_blocks_device_showcase" USING btree ("desktop_id");
  CREATE INDEX "projects_blocks_device_showcase_mobile_idx" ON "projects_blocks_device_showcase" USING btree ("mobile_id");
  CREATE INDEX "projects_blocks_services_grid_order_idx" ON "projects_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_services_grid_parent_id_idx" ON "projects_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_services_grid_path_idx" ON "projects_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_pricing_order_idx" ON "projects_blocks_pricing" USING btree ("_order");
  CREATE INDEX "projects_blocks_pricing_parent_id_idx" ON "projects_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_pricing_path_idx" ON "projects_blocks_pricing" USING btree ("_path");
  CREATE INDEX "projects_blocks_pricing_contact_page_idx" ON "projects_blocks_pricing" USING btree ("contact_page_id");
  CREATE INDEX "projects_blocks_feature_grid_items_order_idx" ON "projects_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_items_parent_id_idx" ON "projects_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_order_idx" ON "projects_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_parent_id_idx" ON "projects_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_path_idx" ON "projects_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_project_gallery_order_idx" ON "projects_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_project_gallery_parent_id_idx" ON "projects_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_project_gallery_path_idx" ON "projects_blocks_project_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_projects_grid_order_idx" ON "projects_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_projects_grid_parent_id_idx" ON "projects_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_projects_grid_path_idx" ON "projects_blocks_projects_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_process_steps_steps_order_idx" ON "projects_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "projects_blocks_process_steps_steps_parent_id_idx" ON "projects_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_process_steps_order_idx" ON "projects_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "projects_blocks_process_steps_parent_id_idx" ON "projects_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_process_steps_path_idx" ON "projects_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE INDEX "projects_blocks_testimonials_order_idx" ON "projects_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_parent_id_idx" ON "projects_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_path_idx" ON "projects_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "projects_blocks_faq_order_idx" ON "projects_blocks_faq" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_parent_id_idx" ON "projects_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_path_idx" ON "projects_blocks_faq" USING btree ("_path");
  CREATE INDEX "projects_blocks_logo_cloud_order_idx" ON "projects_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "projects_blocks_logo_cloud_parent_id_idx" ON "projects_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_logo_cloud_path_idx" ON "projects_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "projects_blocks_blog_teaser_order_idx" ON "projects_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "projects_blocks_blog_teaser_parent_id_idx" ON "projects_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_blog_teaser_path_idx" ON "projects_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "projects_blocks_blog_teaser_category_idx" ON "projects_blocks_blog_teaser" USING btree ("category_id");
  CREATE INDEX "projects_blocks_cta_links_order_idx" ON "projects_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_links_parent_id_idx" ON "projects_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_order_idx" ON "projects_blocks_cta" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_parent_id_idx" ON "projects_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_path_idx" ON "projects_blocks_cta" USING btree ("_path");
  CREATE INDEX "projects_blocks_contact_start_project_types_order_idx" ON "projects_blocks_contact_start_project_types" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_start_project_types_parent_id_idx" ON "projects_blocks_contact_start_project_types" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_start_faqs_order_idx" ON "projects_blocks_contact_start_faqs" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_start_faqs_parent_id_idx" ON "projects_blocks_contact_start_faqs" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_start_order_idx" ON "projects_blocks_contact_start" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_start_parent_id_idx" ON "projects_blocks_contact_start" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_start_path_idx" ON "projects_blocks_contact_start" USING btree ("_path");
  CREATE INDEX "projects_blocks_contact_form_order_idx" ON "projects_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_form_parent_id_idx" ON "projects_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_form_path_idx" ON "projects_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_gallery_wide_idx" ON "projects" USING btree ("gallery_wide_id");
  CREATE INDEX "projects_gallery_tall_idx" ON "projects" USING btree ("gallery_tall_id");
  CREATE INDEX "projects_desktop_screenshot_idx" ON "projects" USING btree ("desktop_screenshot_id");
  CREATE INDEX "projects_mobile_screenshot_idx" ON "projects" USING btree ("mobile_screenshot_id");
  CREATE INDEX "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX "projects_desktop_scroll_idx" ON "projects" USING btree ("desktop_scroll_id");
  CREATE INDEX "projects_mobile_preview_idx" ON "projects" USING btree ("mobile_preview_id");
  CREATE INDEX "projects_testimonial_idx" ON "projects" USING btree ("testimonial_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_texts_order_parent" ON "projects_texts" USING btree ("order","parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_pages_id_idx" ON "projects_rels" USING btree ("pages_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "projects_rels_posts_id_idx" ON "projects_rels" USING btree ("posts_id");
  CREATE INDEX "projects_rels_testimonials_id_idx" ON "projects_rels" USING btree ("testimonials_id");
  CREATE INDEX "projects_rels_faqs_id_idx" ON "projects_rels" USING btree ("faqs_id");
  CREATE INDEX "projects_rels_clients_id_idx" ON "projects_rels" USING btree ("clients_id");
  CREATE INDEX "_projects_v_version_details_order_idx" ON "_projects_v_version_details" USING btree ("_order");
  CREATE INDEX "_projects_v_version_details_parent_id_idx" ON "_projects_v_version_details" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_results_order_idx" ON "_projects_v_version_results" USING btree ("_order");
  CREATE INDEX "_projects_v_version_results_parent_id_idx" ON "_projects_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_links_order_idx" ON "_projects_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_links_parent_id_idx" ON "_projects_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_bubbles_order_idx" ON "_projects_v_blocks_hero_bubbles" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_bubbles_parent_id_idx" ON "_projects_v_blocks_hero_bubbles" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_highlights_order_idx" ON "_projects_v_blocks_hero_highlights" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_highlights_parent_id_idx" ON "_projects_v_blocks_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_order_idx" ON "_projects_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_parent_id_idx" ON "_projects_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_path_idx" ON "_projects_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hero_image_idx" ON "_projects_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_hero_portrait_idx" ON "_projects_v_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "_projects_v_blocks_hero_signature_image_idx" ON "_projects_v_blocks_hero" USING btree ("signature_image_id");
  CREATE INDEX "_projects_v_blocks_hero_floating_testimonial_idx" ON "_projects_v_blocks_hero" USING btree ("floating_testimonial_id");
  CREATE INDEX "_projects_v_blocks_manifesto_lines_order_idx" ON "_projects_v_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_manifesto_lines_parent_id_idx" ON "_projects_v_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_manifesto_index_order_idx" ON "_projects_v_blocks_manifesto_index" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_manifesto_index_parent_id_idx" ON "_projects_v_blocks_manifesto_index" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_manifesto_order_idx" ON "_projects_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_manifesto_parent_id_idx" ON "_projects_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_manifesto_path_idx" ON "_projects_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_manifesto_person_person_portrait_idx" ON "_projects_v_blocks_manifesto" USING btree ("person_portrait_id");
  CREATE INDEX "_projects_v_blocks_manifesto_person_person_portrait_smil_idx" ON "_projects_v_blocks_manifesto" USING btree ("person_portrait_smile_id");
  CREATE INDEX "_projects_v_blocks_work_rail_items_order_idx" ON "_projects_v_blocks_work_rail_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_work_rail_items_parent_id_idx" ON "_projects_v_blocks_work_rail_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_work_rail_items_project_idx" ON "_projects_v_blocks_work_rail_items" USING btree ("project_id");
  CREATE INDEX "_projects_v_blocks_work_rail_order_idx" ON "_projects_v_blocks_work_rail" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_work_rail_parent_id_idx" ON "_projects_v_blocks_work_rail" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_work_rail_path_idx" ON "_projects_v_blocks_work_rail" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_service_stack_cards_order_idx" ON "_projects_v_blocks_service_stack_cards" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_service_stack_cards_parent_id_idx" ON "_projects_v_blocks_service_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_service_stack_order_idx" ON "_projects_v_blocks_service_stack" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_service_stack_parent_id_idx" ON "_projects_v_blocks_service_stack" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_service_stack_path_idx" ON "_projects_v_blocks_service_stack" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_service_menu_order_idx" ON "_projects_v_blocks_service_menu" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_service_menu_parent_id_idx" ON "_projects_v_blocks_service_menu" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_service_menu_path_idx" ON "_projects_v_blocks_service_menu" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_service_menu_contact_page_idx" ON "_projects_v_blocks_service_menu" USING btree ("contact_page_id");
  CREATE INDEX "_projects_v_blocks_statement_order_idx" ON "_projects_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_statement_parent_id_idx" ON "_projects_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_statement_path_idx" ON "_projects_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_quote_rotator_order_idx" ON "_projects_v_blocks_quote_rotator" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_quote_rotator_parent_id_idx" ON "_projects_v_blocks_quote_rotator" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_quote_rotator_path_idx" ON "_projects_v_blocks_quote_rotator" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_order_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_parent_id_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_project_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("project_id");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_desktop_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("desktop_id");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_desktop_poste_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("desktop_poster_id");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_phone_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("phone_id");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_phone_poster_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("phone_poster_id");
  CREATE INDEX "_projects_v_blocks_project_stories_stories_phone2_idx" ON "_projects_v_blocks_project_stories_stories" USING btree ("phone2_id");
  CREATE INDEX "_projects_v_blocks_project_stories_order_idx" ON "_projects_v_blocks_project_stories" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_project_stories_parent_id_idx" ON "_projects_v_blocks_project_stories" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_project_stories_path_idx" ON "_projects_v_blocks_project_stories" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_capabilities_items_order_idx" ON "_projects_v_blocks_capabilities_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_capabilities_items_parent_id_idx" ON "_projects_v_blocks_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_capabilities_order_idx" ON "_projects_v_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_capabilities_parent_id_idx" ON "_projects_v_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_capabilities_path_idx" ON "_projects_v_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_text_links_order_idx" ON "_projects_v_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_text_links_parent_id_idx" ON "_projects_v_blocks_image_text_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_order_idx" ON "_projects_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_text_parent_id_idx" ON "_projects_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_path_idx" ON "_projects_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_text_image_idx" ON "_projects_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_founder_links_order_idx" ON "_projects_v_blocks_founder_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_founder_links_parent_id_idx" ON "_projects_v_blocks_founder_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_founder_order_idx" ON "_projects_v_blocks_founder" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_founder_parent_id_idx" ON "_projects_v_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_founder_path_idx" ON "_projects_v_blocks_founder" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_founder_portrait_idx" ON "_projects_v_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "_projects_v_blocks_founder_signature_image_idx" ON "_projects_v_blocks_founder" USING btree ("signature_image_id");
  CREATE INDEX "_projects_v_blocks_device_showcase_bullets_order_idx" ON "_projects_v_blocks_device_showcase_bullets" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_device_showcase_bullets_parent_id_idx" ON "_projects_v_blocks_device_showcase_bullets" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_device_showcase_links_order_idx" ON "_projects_v_blocks_device_showcase_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_device_showcase_links_parent_id_idx" ON "_projects_v_blocks_device_showcase_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_device_showcase_order_idx" ON "_projects_v_blocks_device_showcase" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_device_showcase_parent_id_idx" ON "_projects_v_blocks_device_showcase" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_device_showcase_path_idx" ON "_projects_v_blocks_device_showcase" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_device_showcase_project_idx" ON "_projects_v_blocks_device_showcase" USING btree ("project_id");
  CREATE INDEX "_projects_v_blocks_device_showcase_desktop_idx" ON "_projects_v_blocks_device_showcase" USING btree ("desktop_id");
  CREATE INDEX "_projects_v_blocks_device_showcase_mobile_idx" ON "_projects_v_blocks_device_showcase" USING btree ("mobile_id");
  CREATE INDEX "_projects_v_blocks_services_grid_order_idx" ON "_projects_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_services_grid_parent_id_idx" ON "_projects_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_services_grid_path_idx" ON "_projects_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_pricing_order_idx" ON "_projects_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_pricing_parent_id_idx" ON "_projects_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_pricing_path_idx" ON "_projects_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_pricing_contact_page_idx" ON "_projects_v_blocks_pricing" USING btree ("contact_page_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_order_idx" ON "_projects_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_parent_id_idx" ON "_projects_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_order_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_feature_grid_parent_id_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_path_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_project_gallery_order_idx" ON "_projects_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_project_gallery_parent_id_idx" ON "_projects_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_project_gallery_path_idx" ON "_projects_v_blocks_project_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_projects_grid_order_idx" ON "_projects_v_blocks_projects_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_projects_grid_parent_id_idx" ON "_projects_v_blocks_projects_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_projects_grid_path_idx" ON "_projects_v_blocks_projects_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_process_steps_steps_order_idx" ON "_projects_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_process_steps_steps_parent_id_idx" ON "_projects_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_process_steps_order_idx" ON "_projects_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_process_steps_parent_id_idx" ON "_projects_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_process_steps_path_idx" ON "_projects_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_testimonials_order_idx" ON "_projects_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_parent_id_idx" ON "_projects_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_path_idx" ON "_projects_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_faq_order_idx" ON "_projects_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_parent_id_idx" ON "_projects_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_path_idx" ON "_projects_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_logo_cloud_order_idx" ON "_projects_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_logo_cloud_parent_id_idx" ON "_projects_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_logo_cloud_path_idx" ON "_projects_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_blog_teaser_order_idx" ON "_projects_v_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_blog_teaser_parent_id_idx" ON "_projects_v_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_blog_teaser_path_idx" ON "_projects_v_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_blog_teaser_category_idx" ON "_projects_v_blocks_blog_teaser" USING btree ("category_id");
  CREATE INDEX "_projects_v_blocks_cta_links_order_idx" ON "_projects_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_cta_links_parent_id_idx" ON "_projects_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_order_idx" ON "_projects_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_cta_parent_id_idx" ON "_projects_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_path_idx" ON "_projects_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_contact_start_project_types_order_idx" ON "_projects_v_blocks_contact_start_project_types" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_start_project_types_parent_id_idx" ON "_projects_v_blocks_contact_start_project_types" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_start_faqs_order_idx" ON "_projects_v_blocks_contact_start_faqs" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_start_faqs_parent_id_idx" ON "_projects_v_blocks_contact_start_faqs" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_start_order_idx" ON "_projects_v_blocks_contact_start" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_start_parent_id_idx" ON "_projects_v_blocks_contact_start" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_start_path_idx" ON "_projects_v_blocks_contact_start" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_contact_form_order_idx" ON "_projects_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_form_parent_id_idx" ON "_projects_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_form_path_idx" ON "_projects_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version__order_idx" ON "_projects_v" USING btree ("version__order");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_gallery_wide_idx" ON "_projects_v" USING btree ("version_gallery_wide_id");
  CREATE INDEX "_projects_v_version_version_gallery_tall_idx" ON "_projects_v" USING btree ("version_gallery_tall_id");
  CREATE INDEX "_projects_v_version_version_desktop_screenshot_idx" ON "_projects_v" USING btree ("version_desktop_screenshot_id");
  CREATE INDEX "_projects_v_version_version_mobile_screenshot_idx" ON "_projects_v" USING btree ("version_mobile_screenshot_id");
  CREATE INDEX "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_projects_v_version_version_desktop_scroll_idx" ON "_projects_v" USING btree ("version_desktop_scroll_id");
  CREATE INDEX "_projects_v_version_version_mobile_preview_idx" ON "_projects_v" USING btree ("version_mobile_preview_id");
  CREATE INDEX "_projects_v_version_version_testimonial_idx" ON "_projects_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_texts_order_parent" ON "_projects_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id");
  CREATE INDEX "_projects_v_rels_pages_id_idx" ON "_projects_v_rels" USING btree ("pages_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_rels_posts_id_idx" ON "_projects_v_rels" USING btree ("posts_id");
  CREATE INDEX "_projects_v_rels_testimonials_id_idx" ON "_projects_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_projects_v_rels_faqs_id_idx" ON "_projects_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_projects_v_rels_clients_id_idx" ON "_projects_v_rels" USING btree ("clients_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "testimonials__order_idx" ON "testimonials" USING btree ("_order");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_project_idx" ON "testimonials" USING btree ("project_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "faqs__order_idx" ON "faqs" USING btree ("_order");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "clients__order_idx" ON "clients" USING btree ("_order");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_services_id_idx" ON "redirects_rels" USING btree ("services_id");
  CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_projects_id_idx" ON "header_rels" USING btree ("projects_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_projects_id_idx" ON "footer_rels" USING btree ("projects_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "site_settings_contact_social_order_idx" ON "site_settings_contact_social" USING btree ("_order");
  CREATE INDEX "site_settings_contact_social_parent_id_idx" ON "site_settings_contact_social" USING btree ("_parent_id");
  CREATE INDEX "lead_emails_order_idx" ON "lead_emails" USING btree ("_order");
  CREATE INDEX "lead_emails_parent_id_idx" ON "lead_emails" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE INDEX "site_settings_seo_seo_default_image_idx" ON "site_settings" USING btree ("seo_default_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero_bubbles" CASCADE;
  DROP TABLE "pages_blocks_hero_highlights" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_manifesto_lines" CASCADE;
  DROP TABLE "pages_blocks_manifesto_index" CASCADE;
  DROP TABLE "pages_blocks_manifesto" CASCADE;
  DROP TABLE "about_experience_points" CASCADE;
  DROP TABLE "about_proof_screens" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "pages_blocks_work_rail_items" CASCADE;
  DROP TABLE "pages_blocks_work_rail" CASCADE;
  DROP TABLE "pages_blocks_service_stack_cards" CASCADE;
  DROP TABLE "pages_blocks_service_stack" CASCADE;
  DROP TABLE "pages_blocks_service_menu" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_quote_rotator" CASCADE;
  DROP TABLE "pages_blocks_project_stories_stories" CASCADE;
  DROP TABLE "pages_blocks_project_stories" CASCADE;
  DROP TABLE "pages_blocks_capabilities_items" CASCADE;
  DROP TABLE "pages_blocks_capabilities" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_image_text_links" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_founder_links" CASCADE;
  DROP TABLE "pages_blocks_founder" CASCADE;
  DROP TABLE "pages_blocks_device_showcase_bullets" CASCADE;
  DROP TABLE "pages_blocks_device_showcase_links" CASCADE;
  DROP TABLE "pages_blocks_device_showcase" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_project_gallery" CASCADE;
  DROP TABLE "pages_blocks_projects_grid" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_blog_teaser" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_contact_start_project_types" CASCADE;
  DROP TABLE "pages_blocks_contact_start_faqs" CASCADE;
  DROP TABLE "pages_blocks_contact_start" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_bubbles" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_manifesto_lines" CASCADE;
  DROP TABLE "_pages_v_blocks_manifesto_index" CASCADE;
  DROP TABLE "_pages_v_blocks_manifesto" CASCADE;
  DROP TABLE "_about_v_experience_points" CASCADE;
  DROP TABLE "_about_v_proof_screens" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TABLE "_pages_v_blocks_work_rail_items" CASCADE;
  DROP TABLE "_pages_v_blocks_work_rail" CASCADE;
  DROP TABLE "_pages_v_blocks_service_stack_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_stack" CASCADE;
  DROP TABLE "_pages_v_blocks_service_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_quote_rotator" CASCADE;
  DROP TABLE "_pages_v_blocks_project_stories_stories" CASCADE;
  DROP TABLE "_pages_v_blocks_project_stories" CASCADE;
  DROP TABLE "_pages_v_blocks_capabilities_items" CASCADE;
  DROP TABLE "_pages_v_blocks_capabilities" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_links" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_links" CASCADE;
  DROP TABLE "_pages_v_blocks_founder" CASCADE;
  DROP TABLE "_pages_v_blocks_device_showcase_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_device_showcase_links" CASCADE;
  DROP TABLE "_pages_v_blocks_device_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_start_project_types" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_start_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_start" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_pricing_niches" CASCADE;
  DROP TABLE "services_pricing_process" CASCADE;
  DROP TABLE "services_pricing_included" CASCADE;
  DROP TABLE "services_menu_capabilities" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_blocks_hero_links" CASCADE;
  DROP TABLE "services_blocks_hero_bubbles" CASCADE;
  DROP TABLE "services_blocks_hero_highlights" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_manifesto_lines" CASCADE;
  DROP TABLE "services_blocks_manifesto_index" CASCADE;
  DROP TABLE "services_blocks_manifesto" CASCADE;
  DROP TABLE "services_blocks_work_rail_items" CASCADE;
  DROP TABLE "services_blocks_work_rail" CASCADE;
  DROP TABLE "services_blocks_service_stack_cards" CASCADE;
  DROP TABLE "services_blocks_service_stack" CASCADE;
  DROP TABLE "services_blocks_service_menu" CASCADE;
  DROP TABLE "services_blocks_statement" CASCADE;
  DROP TABLE "services_blocks_quote_rotator" CASCADE;
  DROP TABLE "services_blocks_project_stories_stories" CASCADE;
  DROP TABLE "services_blocks_project_stories" CASCADE;
  DROP TABLE "services_blocks_capabilities_items" CASCADE;
  DROP TABLE "services_blocks_capabilities" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_image_text_links" CASCADE;
  DROP TABLE "services_blocks_image_text" CASCADE;
  DROP TABLE "services_blocks_founder_links" CASCADE;
  DROP TABLE "services_blocks_founder" CASCADE;
  DROP TABLE "services_blocks_device_showcase_bullets" CASCADE;
  DROP TABLE "services_blocks_device_showcase_links" CASCADE;
  DROP TABLE "services_blocks_device_showcase" CASCADE;
  DROP TABLE "services_blocks_services_grid" CASCADE;
  DROP TABLE "services_blocks_pricing" CASCADE;
  DROP TABLE "services_blocks_feature_grid_items" CASCADE;
  DROP TABLE "services_blocks_feature_grid" CASCADE;
  DROP TABLE "services_blocks_project_gallery" CASCADE;
  DROP TABLE "services_blocks_projects_grid" CASCADE;
  DROP TABLE "services_blocks_process_steps_steps" CASCADE;
  DROP TABLE "services_blocks_process_steps" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_logo_cloud" CASCADE;
  DROP TABLE "services_blocks_blog_teaser" CASCADE;
  DROP TABLE "services_blocks_cta_links" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_contact_start_project_types" CASCADE;
  DROP TABLE "services_blocks_contact_start_faqs" CASCADE;
  DROP TABLE "services_blocks_contact_start" CASCADE;
  DROP TABLE "services_blocks_contact_form" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_pricing_niches" CASCADE;
  DROP TABLE "_services_v_version_pricing_process" CASCADE;
  DROP TABLE "_services_v_version_pricing_included" CASCADE;
  DROP TABLE "_services_v_version_menu_capabilities" CASCADE;
  DROP TABLE "_services_v_version_features" CASCADE;
  DROP TABLE "_services_v_blocks_hero_links" CASCADE;
  DROP TABLE "_services_v_blocks_hero_bubbles" CASCADE;
  DROP TABLE "_services_v_blocks_hero_highlights" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_manifesto_lines" CASCADE;
  DROP TABLE "_services_v_blocks_manifesto_index" CASCADE;
  DROP TABLE "_services_v_blocks_manifesto" CASCADE;
  DROP TABLE "_services_v_blocks_work_rail_items" CASCADE;
  DROP TABLE "_services_v_blocks_work_rail" CASCADE;
  DROP TABLE "_services_v_blocks_service_stack_cards" CASCADE;
  DROP TABLE "_services_v_blocks_service_stack" CASCADE;
  DROP TABLE "_services_v_blocks_service_menu" CASCADE;
  DROP TABLE "_services_v_blocks_statement" CASCADE;
  DROP TABLE "_services_v_blocks_quote_rotator" CASCADE;
  DROP TABLE "_services_v_blocks_project_stories_stories" CASCADE;
  DROP TABLE "_services_v_blocks_project_stories" CASCADE;
  DROP TABLE "_services_v_blocks_capabilities_items" CASCADE;
  DROP TABLE "_services_v_blocks_capabilities" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_image_text_links" CASCADE;
  DROP TABLE "_services_v_blocks_image_text" CASCADE;
  DROP TABLE "_services_v_blocks_founder_links" CASCADE;
  DROP TABLE "_services_v_blocks_founder" CASCADE;
  DROP TABLE "_services_v_blocks_device_showcase_bullets" CASCADE;
  DROP TABLE "_services_v_blocks_device_showcase_links" CASCADE;
  DROP TABLE "_services_v_blocks_device_showcase" CASCADE;
  DROP TABLE "_services_v_blocks_services_grid" CASCADE;
  DROP TABLE "_services_v_blocks_pricing" CASCADE;
  DROP TABLE "_services_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_services_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_services_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_projects_grid" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_services_v_blocks_blog_teaser" CASCADE;
  DROP TABLE "_services_v_blocks_cta_links" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_contact_start_project_types" CASCADE;
  DROP TABLE "_services_v_blocks_contact_start_faqs" CASCADE;
  DROP TABLE "_services_v_blocks_contact_start" CASCADE;
  DROP TABLE "_services_v_blocks_contact_form" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "projects_details" CASCADE;
  DROP TABLE "projects_results" CASCADE;
  DROP TABLE "projects_blocks_hero_links" CASCADE;
  DROP TABLE "projects_blocks_hero_bubbles" CASCADE;
  DROP TABLE "projects_blocks_hero_highlights" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_manifesto_lines" CASCADE;
  DROP TABLE "projects_blocks_manifesto_index" CASCADE;
  DROP TABLE "projects_blocks_manifesto" CASCADE;
  DROP TABLE "projects_blocks_work_rail_items" CASCADE;
  DROP TABLE "projects_blocks_work_rail" CASCADE;
  DROP TABLE "projects_blocks_service_stack_cards" CASCADE;
  DROP TABLE "projects_blocks_service_stack" CASCADE;
  DROP TABLE "projects_blocks_service_menu" CASCADE;
  DROP TABLE "projects_blocks_statement" CASCADE;
  DROP TABLE "projects_blocks_quote_rotator" CASCADE;
  DROP TABLE "projects_blocks_project_stories_stories" CASCADE;
  DROP TABLE "projects_blocks_project_stories" CASCADE;
  DROP TABLE "projects_blocks_capabilities_items" CASCADE;
  DROP TABLE "projects_blocks_capabilities" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_image_text_links" CASCADE;
  DROP TABLE "projects_blocks_image_text" CASCADE;
  DROP TABLE "projects_blocks_founder_links" CASCADE;
  DROP TABLE "projects_blocks_founder" CASCADE;
  DROP TABLE "projects_blocks_device_showcase_bullets" CASCADE;
  DROP TABLE "projects_blocks_device_showcase_links" CASCADE;
  DROP TABLE "projects_blocks_device_showcase" CASCADE;
  DROP TABLE "projects_blocks_services_grid" CASCADE;
  DROP TABLE "projects_blocks_pricing" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items" CASCADE;
  DROP TABLE "projects_blocks_feature_grid" CASCADE;
  DROP TABLE "projects_blocks_project_gallery" CASCADE;
  DROP TABLE "projects_blocks_projects_grid" CASCADE;
  DROP TABLE "projects_blocks_process_steps_steps" CASCADE;
  DROP TABLE "projects_blocks_process_steps" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_testimonials" CASCADE;
  DROP TABLE "projects_blocks_faq" CASCADE;
  DROP TABLE "projects_blocks_logo_cloud" CASCADE;
  DROP TABLE "projects_blocks_blog_teaser" CASCADE;
  DROP TABLE "projects_blocks_cta_links" CASCADE;
  DROP TABLE "projects_blocks_cta" CASCADE;
  DROP TABLE "projects_blocks_contact_start_project_types" CASCADE;
  DROP TABLE "projects_blocks_contact_start_faqs" CASCADE;
  DROP TABLE "projects_blocks_contact_start" CASCADE;
  DROP TABLE "projects_blocks_contact_form" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_texts" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_details" CASCADE;
  DROP TABLE "_projects_v_version_results" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_links" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_bubbles" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_highlights" CASCADE;
  DROP TABLE "_projects_v_blocks_hero" CASCADE;
  DROP TABLE "_projects_v_blocks_manifesto_lines" CASCADE;
  DROP TABLE "_projects_v_blocks_manifesto_index" CASCADE;
  DROP TABLE "_projects_v_blocks_manifesto" CASCADE;
  DROP TABLE "_projects_v_blocks_work_rail_items" CASCADE;
  DROP TABLE "_projects_v_blocks_work_rail" CASCADE;
  DROP TABLE "_projects_v_blocks_service_stack_cards" CASCADE;
  DROP TABLE "_projects_v_blocks_service_stack" CASCADE;
  DROP TABLE "_projects_v_blocks_service_menu" CASCADE;
  DROP TABLE "_projects_v_blocks_statement" CASCADE;
  DROP TABLE "_projects_v_blocks_quote_rotator" CASCADE;
  DROP TABLE "_projects_v_blocks_project_stories_stories" CASCADE;
  DROP TABLE "_projects_v_blocks_project_stories" CASCADE;
  DROP TABLE "_projects_v_blocks_capabilities_items" CASCADE;
  DROP TABLE "_projects_v_blocks_capabilities" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v_blocks_image_text_links" CASCADE;
  DROP TABLE "_projects_v_blocks_image_text" CASCADE;
  DROP TABLE "_projects_v_blocks_founder_links" CASCADE;
  DROP TABLE "_projects_v_blocks_founder" CASCADE;
  DROP TABLE "_projects_v_blocks_device_showcase_bullets" CASCADE;
  DROP TABLE "_projects_v_blocks_device_showcase_links" CASCADE;
  DROP TABLE "_projects_v_blocks_device_showcase" CASCADE;
  DROP TABLE "_projects_v_blocks_services_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_pricing" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_projects_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_projects_v_blocks_process_steps" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials" CASCADE;
  DROP TABLE "_projects_v_blocks_faq" CASCADE;
  DROP TABLE "_projects_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_projects_v_blocks_blog_teaser" CASCADE;
  DROP TABLE "_projects_v_blocks_cta_links" CASCADE;
  DROP TABLE "_projects_v_blocks_cta" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_start_project_types" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_start_faqs" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_start" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_form" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_texts" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "site_settings_contact_social" CASCADE;
  DROP TABLE "lead_emails" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_manifesto_index_link_type";
  DROP TYPE "public"."enum_about_closing_primary_type";
  DROP TYPE "public"."enum_about_closing_primary_appearance";
  DROP TYPE "public"."enum_about_closing_secondary_type";
  DROP TYPE "public"."enum_about_closing_secondary_appearance";
  DROP TYPE "public"."enum_pages_blocks_work_rail_closing_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_stack_cards_theme";
  DROP TYPE "public"."enum_pages_blocks_service_stack_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_menu_proof_type";
  DROP TYPE "public"."enum_pages_blocks_service_menu_proof_appearance";
  DROP TYPE "public"."enum_pages_blocks_statement_cta_type";
  DROP TYPE "public"."enum_pages_blocks_statement_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_project_stories_stories_layout";
  DROP TYPE "public"."enum_pages_blocks_capabilities_link_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_rich_text_background";
  DROP TYPE "public"."enum_pages_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_image_text_background";
  DROP TYPE "public"."enum_pages_blocks_founder_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_founder_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_founder_background";
  DROP TYPE "public"."enum_pages_blocks_device_showcase_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_device_showcase_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_device_showcase_source";
  DROP TYPE "public"."enum_pages_blocks_device_showcase_devices_position";
  DROP TYPE "public"."enum_pages_blocks_device_showcase_background";
  DROP TYPE "public"."enum_pages_blocks_services_grid_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_background";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_background";
  DROP TYPE "public"."enum_pages_blocks_projects_grid_mode";
  DROP TYPE "public"."enum_pages_blocks_projects_grid_link_type";
  DROP TYPE "public"."enum_pages_blocks_projects_grid_background";
  DROP TYPE "public"."enum_pages_blocks_process_steps_variant";
  DROP TYPE "public"."enum_pages_blocks_process_steps_background";
  DROP TYPE "public"."enum_pages_blocks_stats_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_background";
  DROP TYPE "public"."enum_pages_blocks_faq_background";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_background";
  DROP TYPE "public"."enum_pages_blocks_blog_teaser_link_type";
  DROP TYPE "public"."enum_pages_blocks_blog_teaser_background";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_background";
  DROP TYPE "public"."enum_pages_blocks_contact_form_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_manifesto_index_link_type";
  DROP TYPE "public"."enum__about_v_closing_primary_type";
  DROP TYPE "public"."enum__about_v_closing_primary_appearance";
  DROP TYPE "public"."enum__about_v_closing_secondary_type";
  DROP TYPE "public"."enum__about_v_closing_secondary_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_work_rail_closing_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_stack_cards_theme";
  DROP TYPE "public"."enum__pages_v_blocks_service_stack_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_menu_proof_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_menu_proof_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_statement_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_project_stories_stories_layout";
  DROP TYPE "public"."enum__pages_v_blocks_capabilities_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_founder_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_founder_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_founder_background";
  DROP TYPE "public"."enum__pages_v_blocks_device_showcase_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_device_showcase_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_device_showcase_source";
  DROP TYPE "public"."enum__pages_v_blocks_device_showcase_devices_position";
  DROP TYPE "public"."enum__pages_v_blocks_device_showcase_background";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_projects_grid_mode";
  DROP TYPE "public"."enum__pages_v_blocks_projects_grid_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_projects_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_background";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_background";
  DROP TYPE "public"."enum__pages_v_blocks_blog_teaser_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_blog_teaser_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_services_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_services_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_manifesto_index_link_type";
  DROP TYPE "public"."enum_services_blocks_work_rail_closing_link_type";
  DROP TYPE "public"."enum_services_blocks_service_stack_cards_theme";
  DROP TYPE "public"."enum_services_blocks_service_stack_cards_link_type";
  DROP TYPE "public"."enum_services_blocks_service_menu_proof_type";
  DROP TYPE "public"."enum_services_blocks_service_menu_proof_appearance";
  DROP TYPE "public"."enum_services_blocks_statement_cta_type";
  DROP TYPE "public"."enum_services_blocks_statement_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_project_stories_stories_layout";
  DROP TYPE "public"."enum_services_blocks_capabilities_link_type";
  DROP TYPE "public"."enum_services_blocks_rich_text_width";
  DROP TYPE "public"."enum_services_blocks_rich_text_background";
  DROP TYPE "public"."enum_services_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum_services_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_image_text_image_position";
  DROP TYPE "public"."enum_services_blocks_image_text_background";
  DROP TYPE "public"."enum_services_blocks_founder_links_link_type";
  DROP TYPE "public"."enum_services_blocks_founder_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_founder_background";
  DROP TYPE "public"."enum_services_blocks_device_showcase_links_link_type";
  DROP TYPE "public"."enum_services_blocks_device_showcase_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_device_showcase_source";
  DROP TYPE "public"."enum_services_blocks_device_showcase_devices_position";
  DROP TYPE "public"."enum_services_blocks_device_showcase_background";
  DROP TYPE "public"."enum_services_blocks_services_grid_background";
  DROP TYPE "public"."enum_services_blocks_pricing_background";
  DROP TYPE "public"."enum_services_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_services_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_services_blocks_feature_grid_background";
  DROP TYPE "public"."enum_services_blocks_projects_grid_mode";
  DROP TYPE "public"."enum_services_blocks_projects_grid_link_type";
  DROP TYPE "public"."enum_services_blocks_projects_grid_background";
  DROP TYPE "public"."enum_services_blocks_process_steps_variant";
  DROP TYPE "public"."enum_services_blocks_process_steps_background";
  DROP TYPE "public"."enum_services_blocks_stats_background";
  DROP TYPE "public"."enum_services_blocks_testimonials_background";
  DROP TYPE "public"."enum_services_blocks_faq_background";
  DROP TYPE "public"."enum_services_blocks_logo_cloud_background";
  DROP TYPE "public"."enum_services_blocks_blog_teaser_link_type";
  DROP TYPE "public"."enum_services_blocks_blog_teaser_background";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_cta_background";
  DROP TYPE "public"."enum_services_blocks_contact_form_background";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__services_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  DROP TYPE "public"."enum__services_v_blocks_manifesto_index_link_type";
  DROP TYPE "public"."enum__services_v_blocks_work_rail_closing_link_type";
  DROP TYPE "public"."enum__services_v_blocks_service_stack_cards_theme";
  DROP TYPE "public"."enum__services_v_blocks_service_stack_cards_link_type";
  DROP TYPE "public"."enum__services_v_blocks_service_menu_proof_type";
  DROP TYPE "public"."enum__services_v_blocks_service_menu_proof_appearance";
  DROP TYPE "public"."enum__services_v_blocks_statement_cta_type";
  DROP TYPE "public"."enum__services_v_blocks_statement_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_project_stories_stories_layout";
  DROP TYPE "public"."enum__services_v_blocks_capabilities_link_type";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__services_v_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum__services_v_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__services_v_blocks_image_text_background";
  DROP TYPE "public"."enum__services_v_blocks_founder_links_link_type";
  DROP TYPE "public"."enum__services_v_blocks_founder_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_founder_background";
  DROP TYPE "public"."enum__services_v_blocks_device_showcase_links_link_type";
  DROP TYPE "public"."enum__services_v_blocks_device_showcase_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_device_showcase_source";
  DROP TYPE "public"."enum__services_v_blocks_device_showcase_devices_position";
  DROP TYPE "public"."enum__services_v_blocks_device_showcase_background";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_background";
  DROP TYPE "public"."enum__services_v_blocks_pricing_background";
  DROP TYPE "public"."enum__services_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__services_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__services_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__services_v_blocks_projects_grid_mode";
  DROP TYPE "public"."enum__services_v_blocks_projects_grid_link_type";
  DROP TYPE "public"."enum__services_v_blocks_projects_grid_background";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_background";
  DROP TYPE "public"."enum__services_v_blocks_stats_background";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__services_v_blocks_faq_background";
  DROP TYPE "public"."enum__services_v_blocks_logo_cloud_background";
  DROP TYPE "public"."enum__services_v_blocks_blog_teaser_link_type";
  DROP TYPE "public"."enum__services_v_blocks_blog_teaser_background";
  DROP TYPE "public"."enum__services_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_cta_background";
  DROP TYPE "public"."enum__services_v_blocks_contact_form_background";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_projects_details_kind";
  DROP TYPE "public"."enum_projects_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_hero_variant";
  DROP TYPE "public"."enum_projects_blocks_manifesto_index_link_type";
  DROP TYPE "public"."enum_projects_blocks_work_rail_closing_link_type";
  DROP TYPE "public"."enum_projects_blocks_service_stack_cards_theme";
  DROP TYPE "public"."enum_projects_blocks_service_stack_cards_link_type";
  DROP TYPE "public"."enum_projects_blocks_service_menu_proof_type";
  DROP TYPE "public"."enum_projects_blocks_service_menu_proof_appearance";
  DROP TYPE "public"."enum_projects_blocks_statement_cta_type";
  DROP TYPE "public"."enum_projects_blocks_statement_cta_appearance";
  DROP TYPE "public"."enum_projects_blocks_project_stories_stories_layout";
  DROP TYPE "public"."enum_projects_blocks_capabilities_link_type";
  DROP TYPE "public"."enum_projects_blocks_rich_text_width";
  DROP TYPE "public"."enum_projects_blocks_rich_text_background";
  DROP TYPE "public"."enum_projects_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_image_text_image_position";
  DROP TYPE "public"."enum_projects_blocks_image_text_background";
  DROP TYPE "public"."enum_projects_blocks_founder_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_founder_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_founder_background";
  DROP TYPE "public"."enum_projects_blocks_device_showcase_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_device_showcase_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_device_showcase_source";
  DROP TYPE "public"."enum_projects_blocks_device_showcase_devices_position";
  DROP TYPE "public"."enum_projects_blocks_device_showcase_background";
  DROP TYPE "public"."enum_projects_blocks_services_grid_background";
  DROP TYPE "public"."enum_projects_blocks_pricing_background";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_background";
  DROP TYPE "public"."enum_projects_blocks_projects_grid_mode";
  DROP TYPE "public"."enum_projects_blocks_projects_grid_link_type";
  DROP TYPE "public"."enum_projects_blocks_projects_grid_background";
  DROP TYPE "public"."enum_projects_blocks_process_steps_variant";
  DROP TYPE "public"."enum_projects_blocks_process_steps_background";
  DROP TYPE "public"."enum_projects_blocks_stats_background";
  DROP TYPE "public"."enum_projects_blocks_testimonials_background";
  DROP TYPE "public"."enum_projects_blocks_faq_background";
  DROP TYPE "public"."enum_projects_blocks_logo_cloud_background";
  DROP TYPE "public"."enum_projects_blocks_blog_teaser_link_type";
  DROP TYPE "public"."enum_projects_blocks_blog_teaser_background";
  DROP TYPE "public"."enum_projects_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_cta_background";
  DROP TYPE "public"."enum_projects_blocks_contact_form_background";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_details_kind";
  DROP TYPE "public"."enum__projects_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_hero_variant";
  DROP TYPE "public"."enum__projects_v_blocks_manifesto_index_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_work_rail_closing_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_service_stack_cards_theme";
  DROP TYPE "public"."enum__projects_v_blocks_service_stack_cards_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_service_menu_proof_type";
  DROP TYPE "public"."enum__projects_v_blocks_service_menu_proof_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_statement_cta_type";
  DROP TYPE "public"."enum__projects_v_blocks_statement_cta_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_project_stories_stories_layout";
  DROP TYPE "public"."enum__projects_v_blocks_capabilities_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__projects_v_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__projects_v_blocks_image_text_background";
  DROP TYPE "public"."enum__projects_v_blocks_founder_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_founder_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_founder_background";
  DROP TYPE "public"."enum__projects_v_blocks_device_showcase_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_device_showcase_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_device_showcase_source";
  DROP TYPE "public"."enum__projects_v_blocks_device_showcase_devices_position";
  DROP TYPE "public"."enum__projects_v_blocks_device_showcase_background";
  DROP TYPE "public"."enum__projects_v_blocks_services_grid_background";
  DROP TYPE "public"."enum__projects_v_blocks_pricing_background";
  DROP TYPE "public"."enum__projects_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__projects_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__projects_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__projects_v_blocks_projects_grid_mode";
  DROP TYPE "public"."enum__projects_v_blocks_projects_grid_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_projects_grid_background";
  DROP TYPE "public"."enum__projects_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__projects_v_blocks_process_steps_background";
  DROP TYPE "public"."enum__projects_v_blocks_stats_background";
  DROP TYPE "public"."enum__projects_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__projects_v_blocks_faq_background";
  DROP TYPE "public"."enum__projects_v_blocks_logo_cloud_background";
  DROP TYPE "public"."enum__projects_v_blocks_blog_teaser_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_blog_teaser_background";
  DROP TYPE "public"."enum__projects_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_cta_background";
  DROP TYPE "public"."enum__projects_v_blocks_contact_form_background";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_cta_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_bottom_links_link_type";
  DROP TYPE "public"."enum_site_settings_contact_social_platform";
  DROP TYPE "public"."enum_site_settings_seo_organization_type";
  DROP TYPE "public"."enum_site_settings_integrations_accessibility_position";`)
}
