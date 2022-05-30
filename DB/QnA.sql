-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema prisma
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema prisma
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `prisma` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `prisma` ;

-- -----------------------------------------------------
-- Table `prisma`.`QnAUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prisma`.`QnAUser` (
  `name` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `QnAUser.name_unique` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;




-- -----------------------------------------------------
-- Table `prisma`.`QnA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prisma`.`QnA` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` LONGTEXT NULL DEFAULT NULL,
  `userIP` VARCHAR(200) NOT NULL,
  `userId` VARCHAR(200) NOT NULL,
  `problem` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `QnA_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `prisma`.`QnAUser` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 78
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `prisma`.`QnAInner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prisma`.`QnAInner` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` LONGTEXT NULL DEFAULT NULL,
  `userIP` VARCHAR(200) NOT NULL,
  `userId` VARCHAR(200) NOT NULL,
  `qnaId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `qnaId` (`qnAId` ASC) VISIBLE,
  CONSTRAINT `QnAInner_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `prisma`.`QnAUser` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `QnAInner_ibfk_2`
    FOREIGN KEY (`qnaId`)
    REFERENCES `prisma`.`QnA` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 112
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
