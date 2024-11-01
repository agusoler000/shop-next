/*
  Warnings:

  - Made the column `firstName` on table `OrderAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ALTER COLUMN "firstName" SET NOT NULL;
