// import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, text, boolean, timestamp, foreignKey, date } from "drizzle-orm/pg-core"; // replace with actual import


// User table
export const UserSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  imageUrl: text("imageUrl"),
  gender: text("gender"),
  address: text("address"),
  role: text("role").notNull().$type<"admin" | "user">().default("user"),
});