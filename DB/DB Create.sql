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
-- Table `SWP`.`SOLVED_RANK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`SOLVED_RANK` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Tier` VARCHAR(25) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`USER` (
  `ID` VARCHAR(20) NOT NULL,
  `Problems` INT NOT NULL,
  `SOLVED_RANK_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_USER_SOLVED.AC_RANK_idx` (`SOLVED_RANK_ID` ASC) VISIBLE,
  CONSTRAINT `fk_USER_SOLVED.AC_RANK`
    FOREIGN KEY (`SOLVED_RANK_ID`)
    REFERENCES `SWP`.`SOLVED_RANK` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`PROBLEM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`PROBLEM` (
  `ID` INT NOT NULL,
  `Alg` VARCHAR(40) NULL,
  `Rate` DECIMAL(10) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`Algorithm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`Algorithm` (
  `ID` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`USER_has_PROBLEM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`USER_has_PROBLEM` (
  `USER_ID` VARCHAR(20) NOT NULL,
  `PROBLEM_ID` INT NOT NULL,
  PRIMARY KEY (`USER_ID`, `PROBLEM_ID`),
  INDEX `fk_USER_has_PROBLEM_PROBLEM1_idx` (`PROBLEM_ID` ASC) VISIBLE,
  INDEX `fk_USER_has_PROBLEM_USER1_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_USER_has_PROBLEM_USER1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `SWP`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_has_PROBLEM_PROBLEM1`
    FOREIGN KEY (`PROBLEM_ID`)
    REFERENCES `SWP`.`PROBLEM` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SWP`.`PROBLEM_has_Algorithm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SWP`.`PROBLEM_has_Algorithm` (
  `PROBLEM_ID` INT NOT NULL,
  `Algorithm_ID` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`PROBLEM_ID`, `Algorithm_ID`),
  INDEX `fk_PROBLEM_has_Algorithm_Algorithm1_idx` (`Algorithm_ID` ASC) VISIBLE,
  INDEX `fk_PROBLEM_has_Algorithm_PROBLEM1_idx` (`PROBLEM_ID` ASC) VISIBLE,
  CONSTRAINT `fk_PROBLEM_has_Algorithm_PROBLEM1`
    FOREIGN KEY (`PROBLEM_ID`)
    REFERENCES `SWP`.`PROBLEM` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROBLEM_has_Algorithm_Algorithm1`
    FOREIGN KEY (`Algorithm_ID`)
    REFERENCES `SWP`.`Algorithm` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
