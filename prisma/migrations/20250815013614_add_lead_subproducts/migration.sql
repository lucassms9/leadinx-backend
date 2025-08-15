/*
  Warnings:

  - You are about to drop the column `model` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `subProduct` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lead` DROP COLUMN `model`,
    ADD COLUMN `subProduct` VARCHAR(191) NOT NULL;
