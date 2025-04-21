-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_manufacturerId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "distributerId" TEXT,
ALTER COLUMN "manufacturerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Distributer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "profilePicture" TEXT,
    "bio" TEXT,
    "companyName" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Distributer',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "longitude" TEXT NOT NULL DEFAULT '',
    "latitude" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Distributer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Distributer_email_key" ON "Distributer"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_distributerId_fkey" FOREIGN KEY ("distributerId") REFERENCES "Distributer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
