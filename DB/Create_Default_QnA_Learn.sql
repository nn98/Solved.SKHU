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
-- Table `SWP`.`Algorithm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Algorithm` (
  `ID` VARCHAR(40) NOT NULL,
  `namekr` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `SWP`.`Solvedrank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Solvedrank` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `tier` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `SWP`.`Problem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Problem` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `namekr` VARCHAR(1000) NULL DEFAULT NULL,
  `nameen` VARCHAR(1000) NULL DEFAULT NULL,
  `rate` VARCHAR(45) NULL DEFAULT NULL,
  `SOLVED_RANK` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_PROBLEM_SOLVED_RANK1_idx` (`SOLVED_RANK` ASC) VISIBLE,
  CONSTRAINT `fk_PROBLEM_SOLVED_RANK1`
    FOREIGN KEY (`SOLVED_RANK`)
    REFERENCES `SWP`.`Solvedrank` (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 25140
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `SWP`.`PROBLEM_has_Algorithm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`PROBLEM_has_Algorithm` (
  `PRO_ID` INT NOT NULL,
  `ALG_ID` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PRO_ID`, `ALG_ID`),
  INDEX `fk_PROBLEM_has_Algorithm_Algorithm1_idx` (`ALG_ID` ASC) VISIBLE,
  INDEX `fk_PROBLEM_has_Algorithm_PROBLEM1_idx` (`PRO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_PROBLEM_has_Algorithm_Algorithm1`
    FOREIGN KEY (`ALG_ID`)
    REFERENCES `SWP`.`Algorithm` (`ID`),
  CONSTRAINT `fk_PROBLEM_has_Algorithm_PROBLEM1`
    FOREIGN KEY (`PRO_ID`)
    REFERENCES `SWP`.`Problem` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `SWP`.`Qnauser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Qnauser` (
  `name` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `Qnauser.name_unique` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SWP`.`Qna`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Qna` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` LONGTEXT NULL DEFAULT NULL,
  `userip` VARCHAR(200) NOT NULL,
  `USER_ID` VARCHAR(200) NOT NULL,
  `problem` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `USER_ID` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `Qna_ibfk_1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `SWP`.`Qnauser` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 81
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SWP`.`Qnainner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Qnainner` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` LONGTEXT NULL DEFAULT NULL,
  `userip` VARCHAR(200) NOT NULL,
  `USER_ID` VARCHAR(200) NOT NULL,
  `QNA_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `USER_ID` (`USER_ID` ASC) VISIBLE,
  INDEX `qnaId` (`QNA_ID` ASC) VISIBLE,
  CONSTRAINT `Qnainner_ibfk_1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `SWP`.`Qnauser` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Qnainner_ibfk_2`
    FOREIGN KEY (`QNA_ID`)
    REFERENCES `SWP`.`Qna` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 114
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SWP`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`User` (
  `ID` VARCHAR(20) NOT NULL,
  `problems` INT NOT NULL,
  `solvedrank` INT NULL DEFAULT NULL,
  `worldrank` VARCHAR(100) NULL DEFAULT NULL,
  `skhurank` INT UNSIGNED NULL DEFAULT NULL,
  `tier` VARCHAR(45) NULL DEFAULT NULL,
  `rating` INT UNSIGNED NULL DEFAULT NULL,
  `class` VARCHAR(45) NULL DEFAULT NULL,
  `pro` VARCHAR(45) NULL DEFAULT NULL,
  `correction` VARCHAR(45) NULL DEFAULT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_USER_SOLVED.AC_RANK_idx` (`solvedrank` ASC) VISIBLE,
  CONSTRAINT `fk_USER_SOLVED.AC_RANK`
    FOREIGN KEY (`solvedrank`)
    REFERENCES `SWP`.`Solvedrank` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `SWP`.`Solve`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Solve` (
  `USER_ID` VARCHAR(20) NOT NULL,
  `PROBLEM_ID` INT NOT NULL,
  `date` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`PROBLEM_ID`, `USER_ID`),
  INDEX `fk_USER_has_PROBLEM_PROBLEM1_idx` (`PROBLEM_ID` ASC) VISIBLE,
  INDEX `fk_USER_has_PROBLEM_USER1_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_USER_has_PROBLEM_PROBLEM1`
    FOREIGN KEY (`PROBLEM_ID`)
    REFERENCES `SWP`.`Problem` (`ID`),
  CONSTRAINT `fk_USER_has_PROBLEM_USER1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `SWP`.`User` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `SWP`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Student` (
  `ID` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `bojid` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Lecture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Lecture` (
  `ID` INT NOT NULL,
  `professor` VARCHAR(45) NULL,
  `code` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `distribution` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Learn`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Learn` (
  `Student_ID` INT NOT NULL,
  `Lecture_ID` INT NOT NULL,
  PRIMARY KEY (`Student_ID`, `Lecture_ID`),
  INDEX `fk_Student_has_Lecture_Lecture1_idx` (`Lecture_ID` ASC) VISIBLE,
  INDEX `fk_Student_has_Lecture_Student1_idx` (`Student_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Student_has_Lecture_Student1`
    FOREIGN KEY (`Student_ID`)
    REFERENCES `SWP`.`Student` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_has_Lecture_Lecture1`
    FOREIGN KEY (`Lecture_ID`)
    REFERENCES `SWP`.`Lecture` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
