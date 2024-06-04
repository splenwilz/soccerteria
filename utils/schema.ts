// import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { pgTable, serial, text, boolean, timestamp, foreignKey, date, integer, numeric, bigint } from "drizzle-orm/pg-core"; // replace with actual import


// User table
export const UserSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  imageUrl: text("imageUrl"),
  gender: text("gender"),
  address: text("address"),
  role: text("role").notNull().$type<"admin" | "user">().default("user"),
})

// Orders
export const OrdersSchema = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => UserSchema.userId, { onDelete: 'cascade' }),
  status: text("status"),
  total: text("total"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// User Wallet
export const WalletSchema = pgTable("wallets", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => UserSchema.userId),
  balance: text('balance'),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// RELATIONS

// User Wallet Relations
export const userWalletRelations = relations(UserSchema, ({ one }) => ({
  wallet: one(WalletSchema, {
    fields: [UserSchema.userId], references: [WalletSchema.userId]
  }),
}));

// // Wallet User Relations
export const walletRelations = relations(WalletSchema, ({ one }) => ({
  user: one(UserSchema, {
    fields: [WalletSchema.userId], references: [UserSchema.id]
  }),
}));

export const orderRelations = relations(OrdersSchema, ({ one }) => ({
  user: one(UserSchema, {
    fields: [OrdersSchema.userId], references: [UserSchema.userId]
  }),
}));

export const userOrderRelations = relations(UserSchema, ({ many }) => ({
  orders: many(OrdersSchema),
}));

