<?php
/**
 * Created by JetBrains PhpStorm.
 * Author: Lynx
 * Date: 14-5-24
 * Time: 下午3:50
 * To change this template use File | Settings | File Templates.
 */

class TougaoAction extends Action {
    public function index(){
        $this->display();

    }

    public function tougao(){
        if($_SESSION['verify'] != md5($_POST['verify'])) {
            $this->error('验证码错误！');
        }

        import('ORG.Net.UploadFile');
        $upload = new UploadFile();
        $upload->maxSize  = 3145728 ;// 设置附件上传大小
        $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->savePath =  './Uploads/';// 设置附件上传目录
        if(!$upload->upload()) {// 上传错误提示错误信息
            $this->error($upload->getErrorMsg());
        }else{// 上传成功 获取上传文件信息
            $info =  $upload->getUploadFileInfo();
        }

        $News=M('News');
        $News->create();
        $User=session('user');
        $News->publisher=$User['username'];
        $News->picurl=$info[0]['savename'];
        $News->pubtime=time();
        $News->add();
        $this->success('保存完成','__APP__/Index/index');
    }




}