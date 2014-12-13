<?php
/**
 * Created by JetBrains PhpStorm.
 * Author: Lynx
 * Date: 14-6-3
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */

class UserAction extends Action{
    public function login(){
        $this->display();
    }

    public function register(){
        $this->display();
    }

    public function registerDo(){

        $User=M('User');
        $User->create();
        $User->add();
        $this->success('注册成功');
    }

    public function loginDo(){
        $username=$this->_post('username');
        $pwd=$this->_post('pwd');
        $User=M('User');
        $list=$User->where(array('username'=>$username))->find();
        if($list){
            if($pwd==$list['pwd']){
                session('user',$list);
                $this->success("登录成功",'__APP__/Index/index');
            }
            else{
                $this->error("密码错误");
            }
        }
        else{
            $this->error("用户名不存在");
        }
    }

    public  function logout(){
        session('user',null);
        $this->success("退出成功");
    }
}