-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema SWP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SWP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SWP` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `SWP` ;

-- -----------------------------------------------------
-- Table `SWP`.`Qnauser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Qnauser` (
  `name` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `Qnauser.name_unique` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;




-- -----------------------------------------------------
-- Table `SWP`.`Qna`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Qna` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` LONGTEXT NULL DEFAULT NULL,
  `userIP` VARCHAR(200) NOT NULL,
  `userId` VARCHAR(200) NOT NULL,
  `problem` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `Qna_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `SWP`.`Qnauser` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 78
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SWP`.`Qnainner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Qnainner` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` LONGTEXT NULL DEFAULT NULL,
  `userIP` VARCHAR(200) NOT NULL,
  `userId` VARCHAR(200) NOT NULL,
  `qnaId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `qnaId` (`qnAId` ASC) VISIBLE,
  CONSTRAINT `Qnainner_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `SWP`.`Qnauser` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Qnainner_ibfk_2`
    FOREIGN KEY (`qnaId`)
    REFERENCES `SWP`.`Qna` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 112
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
