<?php
/**
 * Created by JetBrains PhpStorm.
 * Author: Lynx
 * Date: 14-6-12
 * Time: 下午4:48
 * To change this template use File | Settings | File Templates.
 */

class ShentieAction extends Action{
    public function index(){
        $News=M("News");
        $result=$News->where()->order('pubtime desc')->find();

        $this->assign('tiezi',$result);
        $this->display();
    }

    public function ding(){
        $newsid=$this->_post('newsid');
        $onewsid=$newsid-1;
        $News=M("News");
        $News->where('id='.$newsid)->setInc('ding');
        $ONews=$News->where("id=".$onewsid)->find();
        $data['status']=1;
        $data['ONews']=$ONews;
        $this->ajaxReturn($data,'JSON');
    }

    public function cai(){
        $newsid=$this->_post('newsid');
        $onewsid=$newsid-1;
        $News=M("News");
        $News->where('id='.$newsid)->setInc('cai');
        $ONews=$News->where("id=".$onewsid)->find();
        $data['status']=1;
        $data['ONews']=$ONews;
        $this->ajaxReturn($data,'JSON');
    }
}