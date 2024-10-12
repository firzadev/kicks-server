import { sql } from "drizzle-orm";
import { index, unique } from "drizzle-orm/sqlite-core";
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

export const productVariants = sqliteTable(
  "product_variants",
  {
    id: integer("id").primaryKey().notNull(),
    productId: integer("product_id")
      .references(() => products.id)
      .notNull(),
    color: text("color").notNull(),
    size: integer("size").notNull(),
    createdAt: text("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => ({
    productVariantIndex: index("product_id_variant_index").on(table.productId),
  })
);

export const productStocks = sqliteTable(
  "product_stocks",
  {
    id: integer("id").primaryKey().notNull(),
    productVariantId: integer("product_variant_id")
      .notNull()
      .references(() => productVariants.id),
    stock: integer("stock").notNull(),
    createdAt: text("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => ({
    productVariantIndex: index("product_variant_id_index").on(
      table.productVariantId
    ),
  })
);

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey().notNull(),
  name: text("category").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});

export const productCategories = sqliteTable(
  "product_categories",
  {
    id: integer("id").primaryKey().notNull(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    createdAt: text("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => ({
    uniqueProductCategory: unique().on(table.productId, table.categoryId),
    productIndex: index("product_category_product_id_index").on(
      table.productId
    ),
    categoryIndex: index("product_category_index").on(table.categoryId),
  })
);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
