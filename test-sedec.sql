CREATE SCHEMA `test-sedec` ;

CREATE TABLE `test-sedec`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC));

  CREATE TABLE `test-sedec`.`user` (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(100) NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci ;

USE `test-sedec`;
DROP procedure IF EXISTS `getUsers`;

DELIMITER $$
USE `test-sedec`$$
CREATE PROCEDURE `getUsers` ()
BEGIN
	select * from `user`;
END$$

DELIMITER ;


INSERT INTO `test-sedec`.`user` (`name`) VALUES ('Kevin');
INSERT INTO `test-sedec`.`user` (`name`) VALUES ('Jose');
INSERT INTO `test-sedec`.`user` (`name`) VALUES ('Jasson');