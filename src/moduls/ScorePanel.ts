
//表示计分牌的类
class ScorePanel{
    score = 0;
    level = 1;

    //分数和等级所在的元素，在构造函数中进行初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //设置一个变量限制等级
    maxLevel:number;

    //设置一个变量表示多少分升级
    upScore:number;

    constructor(maxLevel:number = 10,upScore:number = 10){
        //用来记录分数和等级
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    //设置一个加分的方法
    addScore(){
        this.score++;
        this.scoreEle.innerHTML = this.score + "";

        //判断分数是多少，看需不需要进行升级。这里是10分升级
        if(this.score%this.upScore === 0){
            this.levelUp()
        }
    }

    //提升等级的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + "";
        }
    }
}

// const scorePanel = new ScorePanel(100,2)
// for(let i = 0;i < 200;i++){
//     scorePanel.addScore()
// }

export default ScorePanel;


