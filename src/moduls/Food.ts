//定义类Food
class Food{
    //定义一个属性来表示食物所对应的元素
    element:HTMLElement;
    constructor(){
        //获取页面中的父元素，并且将其赋值给element。后面加上叹号的话表示这个值并非一定会存在
        this.element = document.getElementById('food')!;
    }
    //获取食物X坐标方法
    get X(){
        return this.element.offsetLeft;
    }
    //获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop; 
    }
    //修改食物位置的方法
    //食物的位置的坐标范围是0-290
    //食物的位置坐标要求是整十
    change(){
        this.element.style.left = Math.round(Math.random()*29)*10 + 'px';
        this.element.style.top =  Math.round(Math.random()*29)*10 + 'px';
    }
}



export default Food;
