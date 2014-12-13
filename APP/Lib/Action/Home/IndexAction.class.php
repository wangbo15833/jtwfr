<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
    public function index(){
        $News=M('News');
        import('ORG.Util.Page');//导入分页类
        $count = $News->where()->count();
        $Page   = new Page($count,10);
        $show   = $Page->show();
        $result=$News->where()->order('pubtime desc')->limit($Page->firstRow.','.$Page->listRows)->select();
        $newResult=array();
        foreach($result as $item){
            $item['pubtime']=date('Y-m-d',$item['pubtime']);
            $newResult[]=$item;
        }
        $this->assign('lists',$newResult);
        $this->assign('page',$show);
        $this->display();

    }
}