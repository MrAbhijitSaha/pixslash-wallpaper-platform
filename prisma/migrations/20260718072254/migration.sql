/*
  Warnings:

  - You are about to drop the column `description` on the `wallpaper` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wallpaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "fileSize" INTEGER,
    "format" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "categoryId" TEXT,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wallpaper_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_wallpaper" ("categoryId", "createdAt", "downloadCount", "fileSize", "format", "height", "id", "imageUrl", "isFeatured", "isPublic", "slug", "thumbnailUrl", "title", "updatedAt", "userId", "width") SELECT "categoryId", "createdAt", "downloadCount", "fileSize", "format", "height", "id", "imageUrl", "isFeatured", "isPublic", "slug", "thumbnailUrl", "title", "updatedAt", "userId", "width" FROM "wallpaper";
DROP TABLE "wallpaper";
ALTER TABLE "new_wallpaper" RENAME TO "wallpaper";
CREATE UNIQUE INDEX "wallpaper_slug_key" ON "wallpaper"("slug");
CREATE INDEX "wallpaper_categoryId_idx" ON "wallpaper"("categoryId");
CREATE INDEX "wallpaper_userId_idx" ON "wallpaper"("userId");
CREATE INDEX "wallpaper_isPublic_idx" ON "wallpaper"("isPublic");
CREATE INDEX "wallpaper_isFeatured_idx" ON "wallpaper"("isFeatured");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
