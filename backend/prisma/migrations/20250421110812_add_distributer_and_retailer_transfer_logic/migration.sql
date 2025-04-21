-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "retailerId" TEXT;

-- CreateTable
CREATE TABLE "Retailer" (
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

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Retailer_email_key" ON "Retailer"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
