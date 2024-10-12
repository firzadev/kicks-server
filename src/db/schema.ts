import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  fullName: text("fullname").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey().notNull(),
  productName: text("product_name").notNull(),
  description: text("description").notNull(),
  productPrice: integer("product_price").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});

export const productVariants = sqliteTable("product_variants", {
  id: integer("id").primaryKey().notNull(),
  product_id: integer("product_id")
    .references(() => products.id)
    .notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
