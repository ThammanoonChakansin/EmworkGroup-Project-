-- CreateTable
CREATE TABLE `Work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `time_start` VARCHAR(191) NOT NULL,
    `time_end` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `typeWork` VARCHAR(191) NOT NULL,
    `dates` VARCHAR(191) NOT NULL,
    `save` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
