import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏控制器，控制其他的所有类
class GameControl{
    //定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;

    //创建属性存储蛇的移动方向；也就是用户按下的鼠标事件的方向
    direction:string = '' ;

    //创建一个属性来记录游戏是否结束
    isLive = true;

    constructor(){
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }

    //游戏初始化方法，调用后游戏即将开始
    init(){
        //绑定键盘按下事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run()
    }

    //创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        //检查值是否合法，即用户是否按了正常的按键（四个方向键）

        this.direction = event.key; //修改方向
        console.log(event.key)
    }

    //创建一个控制蛇移动的方法
    run(){
        //根据方向（this.direction）来使蛇的位置发生改变
        //X和Y是蛇的现在的值
        let X = this.snake.X;
        let Y = this.snake.Y;

        //根据按键方向，修改X和Y的值
        switch(this.direction){
            case 'ArrowUp':
            case 'Up':
                //向上移动，也就是距离top的值减少
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;           
        }

        //检查蛇是否吃到了食物
        this.checkEat(X,Y)





        //修改X、Y的值。在snake类中进行设置X、Y的值的时候。如果撞墙绘有异常抛出，所以这里使用try、catch可以捕获异常
        //使用异常处理的好处是到时再有新的一场就不用再加入新的处理了
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(err){
            //游戏结束
            alert(err.message+'Game Over!')
            this.isLive = false;
            console.log(err)
        }
        this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)        //等级提高，速度变快
    }


    //定义一个方法检查蛇是否吃到了食物
    checkEat(X:number,Y:number){        //传入蛇的位置
        if(X === this.food.X && Y === this.food.Y){
            //食物的位置需要进行重置
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇要增加一节
            this.snake.addBody()
        }
    }




}

export default GameControl;