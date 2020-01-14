# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.28)
# Database: OKR
# Generation Time: 2020-01-14 12:58:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `keyresult`;

CREATE TABLE `keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `objective_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `keyresult` WRITE;
/*!40000 ALTER TABLE `keyresult` DISABLE KEYS */;

INSERT INTO `keyresult` (`id`, `objective_id`, `value`, `state`)
VALUES
	(58,'335','项目导学','1'),
	(59,'335','项目剖析','1'),
	(60,'335','项目详情','1');

/*!40000 ALTER TABLE `keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table objective
# ------------------------------------------------------------

DROP TABLE IF EXISTS `objective`;

CREATE TABLE `objective` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `completed_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `objective` WRITE;
/*!40000 ALTER TABLE `objective` DISABLE KEYS */;

INSERT INTO `objective` (`id`, `user_id`, `value`, `state`, `created_time`, `completed_time`)
VALUES
	(335,'15','完成OKR项目','1','2020-01-14 11:16:06','2020-01-14 11:28:26');

/*!40000 ALTER TABLE `objective` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `completed_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;

INSERT INTO `todo` (`id`, `value`, `state`, `user_id`, `created_time`, `completed_time`)
VALUES
	(38,'项目介绍','1','15','2020-01-14 11:16:20','2020-01-14 11:27:27'),
	(39,'学习目标','1','15','2020-01-14 11:16:27','2020-01-14 11:27:29'),
	(40,'项目解读','1','15','2020-01-14 11:16:53','2020-01-14 11:27:30'),
	(41,'项目拆解','1','15','2020-01-14 11:17:00','2020-01-14 11:27:32'),
	(43,'环境搭建','1','15','2020-01-14 11:17:25','2020-01-14 11:27:33'),
	(44,'数据库配置','1','15','2020-01-14 11:19:31','2020-01-14 11:27:35'),
	(45,'页面模板','1','15','2020-01-14 11:19:56','2020-01-14 11:27:36'),
	(46,'页面样式与交互','1','15','2020-01-14 11:20:03','2020-01-14 11:27:38'),
	(47,'用户登录','1','15','2020-01-14 11:20:09','2020-01-14 11:27:39'),
	(48,'Todos 待办事项','1','15','2020-01-14 11:20:24','2020-01-14 11:28:40'),
	(50,'History 完成事项','1','15','2020-01-14 11:20:51','2020-01-14 11:28:42'),
	(51,'OKR CUD','0','15','2020-01-14 11:21:03','2020-01-14 11:28:43'),
	(53,'OKR 详情','0','15','2020-01-14 11:21:22','2020-01-14 11:28:44');

/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo_keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo_keyresult`;

CREATE TABLE `todo_keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `todo_id` varchar(255) DEFAULT NULL,
  `keyresult_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todo_keyresult` WRITE;
/*!40000 ALTER TABLE `todo_keyresult` DISABLE KEYS */;

INSERT INTO `todo_keyresult` (`id`, `todo_id`, `keyresult_id`)
VALUES
	(15,'38','58'),
	(16,'39','58'),
	(17,'40','59'),
	(18,'41','59'),
	(19,'43','60'),
	(20,'44','60'),
	(21,'45','60'),
	(22,'46','60'),
	(23,'47','60'),
	(24,'48','60'),
	(25,'48','60'),
	(26,'50','60'),
	(27,'51','60'),
	(28,'52','60'),
	(29,'53','60'),
	(30,'54','61'),
	(31,'55','62');

/*!40000 ALTER TABLE `todo_keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `wechatId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `wechatId`)
VALUES
	(15,'杨淑媚','oWhjY5bvPYPXOpJwZvwqA8BYLoFY');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
