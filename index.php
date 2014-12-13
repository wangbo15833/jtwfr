<?php
header("Content-type: text/html; charset=utf-8");
define('APP_DEBUG', true);
define('APP_NAME', '.');
define('CONF_PATH','./Conf/');
define('RUNTIME_PATH','./Runtime/');
define('TMPL_PATH','./UI/');
define('APP_PATH','./APP/');
define('CORE','./Core/');
define('UPLOAD_PATH','./Upload/');
define('PUBLIC_PATH','./Public/');
define('DATA_PATH','./Data/');

require(CORE.'/ThinkPHP.php');
?>