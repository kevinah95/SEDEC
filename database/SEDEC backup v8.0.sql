-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.17-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for sedec
CREATE DATABASE IF NOT EXISTS `sedec` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `sedec`;

-- Dumping structure for table sedec.analysis
CREATE TABLE IF NOT EXISTS `analysis` (
  `analysisId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `processId` int(11) DEFAULT NULL,
  `sampleDescription` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `samplePicture` longblob NOT NULL,
  PRIMARY KEY (`analysisId`),
  UNIQUE KEY `idanalysis_UNIQUE` (`analysisId`),
  KEY `fk_analysis_user_idx` (`userId`),
  KEY `fk_analysis_process_idx` (`processId`),
  CONSTRAINT `fk_analysis_process` FOREIGN KEY (`processId`) REFERENCES `process` (`processId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_analysis_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.analysis_result
CREATE TABLE IF NOT EXISTS `analysis_result` (
  `analysisResultId` int(11) NOT NULL AUTO_INCREMENT,
  `resultMessage` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `analysisId` int(11) NOT NULL,
  PRIMARY KEY (`analysisResultId`),
  KEY `fk_analysis_idx` (`analysisId`),
  CONSTRAINT `fk_analysis` FOREIGN KEY (`analysisId`) REFERENCES `analysis` (`analysisId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.control_log
CREATE TABLE IF NOT EXISTS `control_log` (
  `controlLogId` int(11) NOT NULL AUTO_INCREMENT,
  `dateTime` date DEFAULT NULL,
  `table` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `action` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`controlLogId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `idNotification` int(11) NOT NULL AUTO_INCREMENT,
  `notificationDatetime` datetime NOT NULL,
  `viewed` bit(1) NOT NULL,
  `idResult` int(11) DEFAULT NULL,
  PRIMARY KEY (`idNotification`),
  KEY `fk_result_idx` (`idResult`),
  CONSTRAINT `fk_result` FOREIGN KEY (`idResult`) REFERENCES `analysis_result` (`analysisResultId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.organization
CREATE TABLE IF NOT EXISTS `organization` (
  `organizationId` int(11) NOT NULL AUTO_INCREMENT,
  `organizationName` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `organizationDescription` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `organizationAgentName` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `organizationAgentMail` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `isActive` bit(1) NOT NULL,
  PRIMARY KEY (`organizationId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.process
CREATE TABLE IF NOT EXISTS `process` (
  `processId` int(11) NOT NULL AUTO_INCREMENT,
  `processName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `processDescription` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`processId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.process_by_organization
CREATE TABLE IF NOT EXISTS `process_by_organization` (
  `organizationId` int(11) NOT NULL,
  `processId` int(11) NOT NULL,
  PRIMARY KEY (`processId`,`organizationId`),
  KEY `fk_orgnization_processByOrganization_idx` (`organizationId`),
  CONSTRAINT `fk_orgnization_processByOrganization` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`organizationId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_process_processByOrganization` FOREIGN KEY (`processId`) REFERENCES `process` (`processId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.process_by_user
CREATE TABLE IF NOT EXISTS `process_by_user` (
  `userId` int(11) NOT NULL,
  `processId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`processId`),
  KEY `fk_process_processByUser_idx` (`processId`),
  CONSTRAINT `fk_process_processByUser` FOREIGN KEY (`processId`) REFERENCES `process` (`processId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_processByUser` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table sedec.user
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userMail` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `userPassword` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `userName` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `userProfilePicture` longblob NOT NULL,
  `organizationId` int(11) DEFAULT NULL,
  `isAdmin` bit(1) NOT NULL,
  `isActive` bit(1) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userMail_UNIQUE` (`userMail`),
  KEY `fk_user_organization_idx` (`organizationId`),
  CONSTRAINT `fk_user_organization` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`organizationId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for procedure sedec.answer_analysis
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `answer_analysis`(IN `resultContentp` VARCHAR(500), IN `analysisIdp` INT)
    NO SQL
INSERT INTO `analysis_result` (`analysisResultId`, `resultMessage`, `analysisId`) VALUES (NULL, resultContentp, analysisIdp)//
DELIMITER ;

-- Dumping structure for procedure sedec.check_user
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `check_user`(IN `mailp` VARCHAR(150), IN `passp` VARCHAR(150))
    NO SQL
    DETERMINISTIC
    COMMENT 'Validates if an user exist and returns the information of him'
SELECT u.userId, u.userMail,u.userName,u.userProfilePicture,u.organizationId,o.organizationName,u.isAdmin from user u inner join organization o on o.organizationId = u.organizationId where u.userMail = mailp and u.userPassword = passp//
DELIMITER ;

-- Dumping structure for procedure sedec.create_analysis
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `create_analysis`(IN `userIdp` INT, IN `processIdp` INT, IN `descriptionp` VARCHAR(500), IN `picturep` LONGBLOB)
    NO SQL
    DETERMINISTIC
INSERT INTO `analysis` (`analysisId`, `userId`, `processId`, `sampleDescription`, `samplePicture`) VALUES (NULL,userIdp,processIdp,descriptionp,picturep)//
DELIMITER ;

-- Dumping structure for procedure sedec.create_user
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `create_user`(
	IN `p_mail` VARCHAR(150)
,
	IN `p_password` VARCHAR(150),
	IN `p_name` VARCHAR(150),
	IN `p_profile_picture` LONGBLOB,
	IN `p_organization_id` INT
)
BEGIN
	INSERT INTO `sedec`.`user` (`userMail`, `userPassword`, `userName`, `userProfilePicture`, `organizationId`, `isAdmin`, `isActive`) VALUES (p_mail, p_password, p_name, p_profile_picture, p_organization_id, b'0', b'1');
END//
DELIMITER ;

-- Dumping structure for procedure sedec.delete_user
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `delete_user`(
	IN `p_user_id` INT
)
BEGIN
	DELETE FROM user WHERE user.userId = p_user_id;
END//
DELIMITER ;

-- Dumping structure for procedure sedec.dummy
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `dummy`(
	IN `p_id` INT





)
BEGIN
	DECLARE custom_error TEXT DEFAULT NULL;
	SET custom_error = LEFT(CONCAT('authentication failed for user ',IFNULL(CONCAT("'",p_id,"'"),'NULL')),128);
	IF NOT EXISTS(SELECT * FROM user	WHERE user.userId  = p_id)then
    	-- SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'A warning occurred', MYSQL_ERRNO = 100;
		-- SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_error;
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_error;
	ELSE
		SELECT * FROM user	WHERE user.userId  = p_id;
	END IF;
END//
DELIMITER ;

-- Dumping structure for procedure sedec.user_find_by_id
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `user_find_by_id`(
	IN `userId` INT



)
BEGIN
	SELECT u.userId, u.userMail,u.userName,u.userProfilePicture,u.organizationId,o.organizationName,u.isAdmin from user u inner join organization o on o.organizationId = u.organizationId where u.userId = userId;
END//
DELIMITER ;

-- Dumping structure for procedure sedec.find_one_user
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `find_one_user`(
	IN `email` VARCHAR(150)


)
BEGIN
	SELECT u.userId,u.userPassword, u.userMail,u.userName,u.userProfilePicture,u.organizationId,o.organizationName,u.isAdmin from user u inner join organization o on o.organizationId = u.organizationId where u.userMail = email;
END//
DELIMITER ;

-- Dumping structure for procedure sedec.get_all_users
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `get_all_users`()
BEGIN
	SELECT * FROM user;
END//
DELIMITER ;

-- Dumping structure for procedure sedec.get_user_notifications
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `get_user_notifications`(
	IN `userIdp` INT
)
    NO SQL
SELECT n.idNotification,n.idResult,DATE_FORMAT(n.notificationDatetime,'%b/%d/%Y - %h:%i %p') as 'notificationDatetime' FROM notification n INNER JOIN analysis_result r ON n.idResult = r.analysisResultId INNER JOIN analysis a ON r.analysisId = a.analysisId INNER JOIN user u ON a.userId = u.userId WHERE a.userId = userIdp AND n.viewed = 0 ORDER BY n.notificationDatetime DESC//
DELIMITER ;

-- Dumping structure for procedure sedec.processes_find_by_user_id
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `processes_find_by_user_id`(IN `userIdp` INT)
    NO SQL
SELECT p.processId,p.processName,p.processDescription FROM process p INNER JOIN process_by_user pbu on pbu.processId = p.processId INNER JOIN user u ON pbu.userId = u.userId WHERE u.userId = userIdp//
DELIMITER ;

-- Dumping structure for procedure sedec.results_find_by_user_id
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `results_find_by_user_id`(
	IN `userIdp` INT

)
    NO SQL
SELECT a.analysisId,p.processName,a.sampleDescription,a.samplePicture, r.resultMessage, DATE_FORMAT(n.notificationDatetime,'%b/%d/%Y - %h:%i %p') as 'notificationDatetime' FROM analysis a inner join process p on p.processId = a.processId INNER JOIN analysis_result r on a.analysisId = r.analysisId INNER JOIN notification n ON r.analysisResultId = n.idResult where a.userId = userIdp ORDER BY n.notificationDatetime DESC//
DELIMITER ;

-- Dumping structure for procedure sedec.user_update_profile
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `user_update_profile`(IN `userIdp` INT, IN `newMailp` VARCHAR(150), IN `newPasswordp` VARCHAR(150), IN `newNamep` VARCHAR(150), IN `newPicturep` LONGBLOB)
    NO SQL
UPDATE user u SET u.userMail = COALESCE(newMailp,u.userMail), u.userPassword = COALESCE(newPasswordp,u.userPassword), u.userName = COALESCE(newNamep,u.userName), u.userProfilePicture = COALESCE(newPicturep,u.userProfilePicture) WHERE u.userId = userIdp//
DELIMITER ;

-- Dumping structure for procedure sedec.write_answer
DELIMITER //
CREATE DEFINER=`sedec_web_client`@`localhost` PROCEDURE `write_answer`(IN `resultContentp` VARCHAR(500), IN `analysisIdp` INT)
    NO SQL
INSERT INTO `analysis_result` (`analysisResultId`, `resultMessage`, `analysisId`) VALUES (NULL, resultContentp, analysisIdp)//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
