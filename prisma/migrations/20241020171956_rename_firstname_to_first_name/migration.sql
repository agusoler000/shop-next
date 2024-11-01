/*
  Warnings:

  - You are about to drop the column `firstname` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "firstname",
ADD COLUMN     "firstName" TEXT;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "firstname",
ADD COLUMN     "firstName" TEXT NOT NULL;



