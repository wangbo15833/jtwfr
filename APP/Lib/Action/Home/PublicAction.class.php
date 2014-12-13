<?php
/**
 * Created by JetBrains PhpStorm.
 * Author: Lynx
 * Date: 14-6-7
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */

class PublicAction extends Action{
    Public function verify(){
        import('ORG.Util.Image');
        Image::buildImageVerify();
    }

}