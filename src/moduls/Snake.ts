class Snake{
    //表示蛇头的元素
    head:HTMLElement;
    //表示蛇的身体。包括蛇头
    bodies:HTMLCollection;
    //获取蛇的容器
    element:HTMLElement;

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')! as HTMLElement;      //获取id为snake的中的第一个div。后面的as是一个类型断言
        this.bodies = this.element!.getElementsByTagName('div');
    }

    //获取蛇的坐标（蛇头的坐标）
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头的坐标
    set X(value){
        //如果新值和旧值相同，则直接返回不再修改
        if(this.X === value){
            return;
        }
        //X值的合法范围0-290之间
        if(value < 0 || value >290){
            //进入判断说明蛇撞墙了,抛出异常
            throw new Error('蛇撞墙了！')
        }

        //修改X的时候是修改水平方向坐标。蛇在左右移动，蛇在向左移动的时候不能x向右掉头，反之亦然
        //其实就是判断蛇头的坐标和第二节身体的坐标。如果一样说明它做了不正常的掉头操作
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft === value){
            // console.log('水平方向发生了掉头')
            if(value > this.X){         //如果新值value大于值X则说明，是向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }

        }

        //移动身体
        this.moveBody()

        this.head.style.left = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value){
        if(this.Y === value){
            return;
        }
        //Y值的合法范围0-290之间
        if(value < 0 || value >290){
            //进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了！')
        }


        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop === value){
            // console.log('垂直方向发生了掉头')
            if(value > this.Y){         
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }

        }

        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody()
    }

    //设置蛇增加身体的方法
    addBody(){
        this.element.insertAdjacentHTML('beforeend','<div></div>')        //beforeend表示它的结束标签之前的位置。也就是驾到它的最后面
    }

    //添加蛇的身体的移动
    moveBody(){
        //将后面身体的位置设置成为前面一个身体的位置
        //从后往前进行修改
        for(let i = this.bodies.length -1;i>0;i--){
            //获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';      //as类型断言
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';      //as类型断言
        }
    }

    //检查头和身体有没有相撞
    checkHeadBody(){
        //检查所有的身体是否跟蛇头的坐标有所重叠
        for(let i = 1;i < this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){    //蛇头的坐标和身体的偏移量一样
                //进入判断说明是撞到身体，游戏结束
                throw new Error('撞到自己了！')
            }   
        }
    }



}


export default Snake;