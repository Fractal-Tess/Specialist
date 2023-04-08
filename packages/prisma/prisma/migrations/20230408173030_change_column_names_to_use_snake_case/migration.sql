/*
  Warnings:

  - You are about to drop the column `userId` on the `Audio` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Audio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buffer" BLOB NOT NULL,
    "tag" TEXT NOT NULL,
    "audio_level" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Audio_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Audio" ("audio_level", "buffer", "created_at", "id", "tag", "updated_at") SELECT "audio_level", "buffer", "created_at", "id", "tag", "updated_at" FROM "Audio";
DROP TABLE "Audio";
ALTER TABLE "new_Audio" RENAME TO "Audio";
CREATE UNIQUE INDEX "Audio_tag_key" ON "Audio"("tag");
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("created_at", "id", "label", "link", "text", "updated_at") SELECT "created_at", "id", "label", "link", "text", "updated_at" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buffer" BLOB NOT NULL,
    "tag" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("buffer", "created_at", "id", "tag", "updated_at") SELECT "buffer", "created_at", "id", "tag", "updated_at" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_tag_key" ON "Image"("tag");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
