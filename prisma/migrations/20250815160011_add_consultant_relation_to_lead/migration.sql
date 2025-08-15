-- AlterTable
ALTER TABLE `Lead` ADD COLUMN `consultantId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_consultantId_fkey` FOREIGN KEY (`consultantId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
