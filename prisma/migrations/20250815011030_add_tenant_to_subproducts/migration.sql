/*
  Warnings:

  - Added the required column `tenantId` to the `SubProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SubProduct` ADD COLUMN `tenantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `SubProduct` ADD CONSTRAINT `SubProduct_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
