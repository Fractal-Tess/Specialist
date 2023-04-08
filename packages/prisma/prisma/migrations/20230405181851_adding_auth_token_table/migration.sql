/*
  Warnings:

  - You are about to drop the column `auth_token` on the `User` table. All the data in the column will be lost.
  - Added the required column `authTokenId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN "volume" INTEGER;

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auth_token" TEXT NOT NULL,
    "generated_at" DATETIME NOT NULL,
    "generated_count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL,
    "authTokenId" INTEGER NOT NULL
);
INSERT INTO "new_User" ("discord_id", "id", "username") SELECT "discord_id", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_discord_id_key" ON "User"("discord_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_auth_token_key" ON "AuthToken"("auth_token");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_userId_key" ON "AuthToken"("userId");
