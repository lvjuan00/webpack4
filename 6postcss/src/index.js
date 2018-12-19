import './css/style.css'
import './less/a.less'
import './sass/b.scss'
document.write('welcome')

let imgsrc=require('./images/img1.png')
let oImg = new Image()
oImg.src=imgsrc
oImg.onload=()=>{
  document.body.appendChild(oImg)
}