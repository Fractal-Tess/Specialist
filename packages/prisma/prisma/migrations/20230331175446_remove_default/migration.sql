-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "auth_token" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL
);
INSERT INTO "new_User" ("auth_token", "discord_id", "id", "username") SELECT "auth_token", "discord_id", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_auth_token_key" ON "User"("auth_token");
CREATE UNIQUE INDEX "User_discord_id_key" ON "User"("discord_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
