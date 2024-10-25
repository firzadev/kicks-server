CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `product_categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_stocks` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_variant_id` integer NOT NULL,
	`stock` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_variants` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_id` integer NOT NULL,
	`color` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_name` text NOT NULL,
	`description` text NOT NULL,
	`product_price` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`fullname` text NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `product_category_product_id_index` ON `product_categories` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_category_index` ON `product_categories` (`category_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_categories_product_id_category_id_unique` ON `product_categories` (`product_id`,`category_id`);--> statement-breakpoint
CREATE INDEX `product_variant_id_index` ON `product_stocks` (`product_variant_id`);--> statement-breakpoint
CREATE INDEX `product_id_variant_index` ON `product_variants` (`product_id`);