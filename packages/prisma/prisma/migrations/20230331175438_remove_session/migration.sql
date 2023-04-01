/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "auth_token" TEXT NOT NULL DEFAULT '2',
    "discord_id" TEXT NOT NULL
);
INSERT INTO "new_User" ("discord_id", "id", "username") SELECT "discord_id", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_auth_token_key" ON "User"("auth_token");
CREATE UNIQUE INDEX "User_discord_id_key" ON "User"("discord_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
