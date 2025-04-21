/*
  Warnings:

  - You are about to drop the column `ownedProductsHistory` on the `Manufacturer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Manufacturer" DROP COLUMN "ownedProductsHistory",
ALTER COLUMN "longitude" SET DEFAULT '',
ALTER COLUMN "latitude" SET DEFAULT '';
