import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // e.g., 'nextjs', 'laravel', 'mobile-api'
  serverIp: text("server_ip").notNull(),
  sshPath: text("ssh_path").notNull(),
  isLive: boolean("is_live").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const credentials = pgTable("credentials", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  keyName: text("key_name").notNull(), // e.g., 'DB_PASSWORD', 'ADMIN_PASSWORD'
  encryptedValue: text("encrypted_value").notNull(),
  iv: text("iv").notNull(), // For AES-256-GCM
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const statusLogs = pgTable("status_logs", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  status: text("status").notNull(), // 'up', 'down'
  responseTime: integer("response_time"), // in ms
  errorMessage: text("error_message"),
  checkedAt: timestamp("checked_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  externalId: text("external_id").notNull(),
  customerName: text("customer_name"),
  totalAmount: text("total_amount"),
  status: text("status"),
  orderDate: timestamp("order_date"),
  sourceData: jsonb("source_data"), // Raw order data from child hub
  createdAt: timestamp("created_at").defaultNow(),
});
