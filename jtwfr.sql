-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.32 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  8.3.0.4784
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 jtwfr 的数据库结构
CREATE DATABASE IF NOT EXISTS `jtwfr` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `jtwfr`;


-- 导出  表 jtwfr.jtwfr_news 结构
CREATE TABLE IF NOT EXISTS `jtwfr_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picurl` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `publisher` varchar(50) NOT NULL,
  `pubtime` int(11) NOT NULL,
  `ding` int(11) NOT NULL,
  `cai` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 正在导出表  jtwfr.jtwfr_news 的数据：9 rows
/*!40000 ALTER TABLE `jtwfr_news` DISABLE KEYS */;
INSERT INTO `jtwfr_news` (`id`, `picurl`, `description`, `publisher`, `pubtime`, `ding`, `cai`) VALUES
	(1, '5392aa5ab71b0.jpg', 'bbb', 'ccc', 1111, 333, 222),
	(2, '5392aa5ab71b0.jpg', 'kkkkkkkkkk', '', 0, 0, 0),
	(3, '5392aa5ab71b0.jpg', 'jjjjj', '', 0, 0, 0),
	(4, '538d43be8d24d.jpg', 'aaaaaaaaaaaa', '', 0, 0, 0),
	(5, '53928b5a16e36.jpg', 'haha', '', 0, 0, 0),
	(6, '5392a9095f5e1.jpg', '难男男女女难男男女女', 'aaa', 0, 0, 0),
	(7, '5392aa5ab71b0.jpg', '将建军节建军节建军节', 'aaa', 1402120794, 0, 0),
	(8, '5392b32e7a120.jpg', '年那个号', 'aaa', 1402123054, 0, 0),
	(9, '5392b368c28cb.jpg', 'lllll', 'aaa', 1402123112, 0, 0),
	(10, '53981887e4e1c.jpg', 'hahahaha', 'aaa', 1402476679, 0, 0),
	(11, '5398262394c5f.jpg', '47164716', 'aaa', 1402480163, 0, 0);
/*!40000 ALTER TABLE `jtwfr_news` ENABLE KEYS */;


-- 导出  表 jtwfr.jtwfr_user 结构
CREATE TABLE IF NOT EXISTS `jtwfr_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 正在导出表  jtwfr.jtwfr_user 的数据：1 rows
/*!40000 ALTER TABLE `jtwfr_user` DISABLE KEYS */;
INSERT INTO `jtwfr_user` (`uid`, `username`, `pwd`, `email`) VALUES
	(1, 'aaa', 'ccc', 'bbb');
/*!40000 ALTER TABLE `jtwfr_user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
