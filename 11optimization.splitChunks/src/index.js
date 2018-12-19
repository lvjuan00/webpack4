import './css/style.css'
import './less/a.less'
import './sass/b.scss'
document.write('welcome')
import { cc } from './js/test.js'
console.log(cc)
// import $ from 'jquery' 
//不推荐 推荐providePlugin（不需要下载，webpack自带）
$('.jqbox').css({
  color:'#00f'
}) 

let imgsrc=require('./images/img1.png')
let oImg = new Image()
oImg.src=imgsrc
oImg.onload=()=>{
  document.body.appendChild(oImg)
}