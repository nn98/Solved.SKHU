-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SWP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SWP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SWP` DEFAULT CHARACTER SET utf8 ;
USE `SWP` ;

-- -----------------------------------------------------
-- Table `SWP`.`Solvedrank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Solvedrank` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `tier` VARCHAR(25) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`User` (
  `ID` VARCHAR(20) NOT NULL,
  `problems` INT NOT NULL,
  `solvedrank` INT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_USER_SOLVED.AC_RANK_idx` (`solvedrank` ASC) VISIBLE,
  CONSTRAINT `fk_USER_SOLVED.AC_RANK`
    FOREIGN KEY (`solvedrank`)
    REFERENCES `SWP`.`Solvedrank` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Problem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Problem` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `alg` VARCHAR(40) NULL,
  `rate` DECIMAL(10) NULL,
  `SOLVED_RANK` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_PROBLEM_SOLVED_RANK1_idx` (`SOLVED_RANK` ASC) VISIBLE,
  CONSTRAINT `fk_PROBLEM_SOLVED_RANK1`
    FOREIGN KEY (`SOLVED_RANK`)
    REFERENCES `SWP`.`Solvedrank` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Algorithm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Algorithm` (
  `ID` VARCHAR(40) NOT NULL,
  `algonamekr` VARCHAR(45) NULL,
  `algonameen` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Solve`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Solve` (
  `USER_ID` VARCHAR(20) NOT NULL,
  `PROBLEM_ID` INT NOT NULL,
  `try` INT NOT NULL,
  PRIMARY KEY (`PROBLEM_ID`, `USER_ID`),
  INDEX `fk_USER_has_PROBLEM_PROBLEM1_idx` (`PROBLEM_ID` ASC) VISIBLE,
  INDEX `fk_USER_has_PROBLEM_USER1_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_USER_has_PROBLEM_USER1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `SWP`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_has_PROBLEM_PROBLEM1`
    FOREIGN KEY (`PROBLEM_ID`)
    REFERENCES `SWP`.`Problem` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`PROBLEM_has_Algorithm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`PROBLEM_has_Algorithm` (
  `PRO_ID` INT NOT NULL,
  `ALG_ID` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`PRO_ID`, `ALG_ID`),
  INDEX `fk_PROBLEM_has_Algorithm_Algorithm1_idx` (`ALG_ID` ASC) VISIBLE,
  INDEX `fk_PROBLEM_has_Algorithm_PROBLEM1_idx` (`PRO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_PROBLEM_has_Algorithm_PROBLEM1`
    FOREIGN KEY (`PRO_ID`)
    REFERENCES `SWP`.`Problem` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROBLEM_has_Algorithm_Algorithm1`
    FOREIGN KEY (`ALG_ID`)
    REFERENCES `SWP`.`Algorithm` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Ranking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Ranking` (
  `User_ID` VARCHAR(20) NOT NULL,
  `worldrank` VARCHAR(200) NULL,
  `skhurank` INT UNSIGNED NULL,
  `tier` VARCHAR(45) NULL,
  `rating` INT UNSIGNED NULL,
  `class` VARCHAR(45) NULL,
  `pro` VARCHAR(45) NULL,
  `correction` DECIMAL(30) UNSIGNED NULL,
  PRIMARY KEY (`User_ID`),
  INDEX `fk_Ranking_User1_idx` (`User_ID` ASC) VISIBLE,
  UNIQUE INDEX `User_ID_UNIQUE` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Ranking_User1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `SWP`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
