import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, json } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';

// Users
export const UserSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  imageUrl: text("imageUrl"),
  gender: text("gender"),
  address: text("address"),
  street: text("street"),
  city: text("city"),
  state: text("state"),
  postcode: text("postcode"),
  country: text("country"),
  countryCode: text("countryCode"),
  currency: text("currency"),
  currencySymbol: text("currencySymbol"),
  phone: text("phone"),
  role: text("role").notNull().$type<"admin" | "user">().default("user"),
})

// Orders
export const OrdersSchema = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => UserSchema.userId, { onDelete: 'cascade' }),
  status: text("status").$type<"pending" | "complete" | "cancel" | "default" | "secondary" | "destructive" | "outline">(),
  total: text("total"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Wallet Orders
export const WalletOrdersSchema = pgTable("wallet_orders", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  userId: text("userId").references(() => UserSchema.userId, { onDelete: 'cascade' }),
  status: text("status").$type<"pending" | "complete" | "cancel" | "default" | "secondary" | "destructive" | "outline">(),
  total: text("total"),
  checkoutLink: text("checkoutLink"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Game Orders
export const GameOrdersSchema = pgTable("game_orders", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  userId: text("userId").references(() => UserSchema.userId, { onDelete: 'cascade' }),
  status: text("status").$type<"pending" | "complete" | "cancel" | "default" | "secondary" | "destructive" | "outline">(),
  total: text("total"),
  gameOptions: json("gameOptions").default({}),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// User Wallet
export const WalletSchema = pgTable("wallets", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => UserSchema.userId, { onDelete: 'cascade' }),
  balance: text('balance'),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// RELATIONS

export const userWalletRelations = relations(UserSchema, ({ one }) => ({
  wallet: one(WalletSchema, {
    fields: [UserSchema.userId], references: [WalletSchema.userId]
  }),
}));

export const walletRelations = relations(WalletSchema, ({ one }) => ({
  user: one(UserSchema, {
    fields: [WalletSchema.userId], references: [UserSchema.id]
  }),
}));

export const walletOrderRelations = relations(WalletOrdersSchema, ({ one }) => ({
  user: one(UserSchema, {
    fields: [WalletOrdersSchema.userId],
    references: [UserSchema.userId]
  }),
}));

export const userWalletOrderRelations = relations(UserSchema, ({ many }) => ({
  walletOrders: many(WalletOrdersSchema),
}));

export const gameOrderRelations = relations(GameOrdersSchema, ({ one }) => ({
  user: one(UserSchema, {
    fields: [GameOrdersSchema.userId],
    references: [UserSchema.userId]
  }),
}));

export const userGameOrderRelations = relations(UserSchema, ({ many }) => ({
  gameOrders: many(GameOrdersSchema),
}));


