import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, json, decimal, varchar, date } from "drizzle-orm/pg-core";
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

// Match List Data
export const MatchListSchema = pgTable("match_list", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  team1home: varchar("team1home", { length: 255 }),
  team1away: varchar("team1away", { length: 255 }),
  team2home: varchar("team2home", { length: 255 }),
  team2away: varchar("team2away", { length: 255 }),
  team3home: varchar("team3home", { length: 255 }),
  team3away: varchar("team3away", { length: 255 }),
  team4home: varchar("team4home", { length: 255 }),
  team4away: varchar("team4away", { length: 255 }),
  team5home: varchar("team5home", { length: 255 }),
  team5away: varchar("team5away", { length: 255 }),
  team6home: varchar("team6home", { length: 255 }),
  team6away: varchar("team6away", { length: 255 }),
  team7home: varchar("team7home", { length: 255 }),
  team7away: varchar("team7away", { length: 255 }),
  team8home: varchar("team8home", { length: 255 }),
  team8away: varchar("team8away", { length: 255 }),
  team9home: varchar("team9home", { length: 255 }),
  team9away: varchar("team9away", { length: 255 }),
  team10home: varchar("team10home", { length: 255 }),
  team10away: varchar("team10away", { length: 255 }),
  team11home: varchar("team11home", { length: 255 }),
  team11away: varchar("team11away", { length: 255 }),
  team12home: varchar("team12home", { length: 255 }),
  team12away: varchar("team12away", { length: 255 }),
  team13home: varchar("team13home", { length: 255 }),
  team13away: varchar("team13away", { length: 255 }),
  team14home: varchar("team14home", { length: 255 }),
  team14away: varchar("team14away", { length: 255 }),
  team15home: varchar("team15home", { length: 255 }),
  team15away: varchar("team15away", { length: 255 }),
  gameDate: date("gameDate"),
  jackpot: text("jackpot"),
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


