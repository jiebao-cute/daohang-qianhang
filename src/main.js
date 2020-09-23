const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x);
const hashMap = xObject || [
{ logo:'A', url:'http://acfun.cn'},
{ logo:'I', url:'https://www.iqiyi.com/'},
{ logo:'B',url:'https://www.bilibili.com/'}
]
const removeX =(url)=>{
    return url.replace('http://','')
    .replace('https://','')
    .replace('www.','')
    .replace(/\/.*/,'')//删除/开头后面的内容
}

const render =() =>{
    $siteList.find('li:not(.last)').remove();//找到哈希里面除了last其他li删除
    hashMap.forEach((node,index)=>{
        //console.log(index);
        const $li = $(`
        <li>
          <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${removeX(node.url)}</div>
             <div class='close'>
               <svg class="icon">
                <use xlink:href="#icon-close"></use>
               </svg>
             </div>
           </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{//阻止冒泡事件，点击close不告诉父元素
            //console.log('点击一次');
            e.stopPropagation()
            hashMap.splice(index , 1)
            render()
        })
     }) 
}

render();

$('.addButton')
 .on('click',()=>{
    let url= window.prompt('请问你要添加的网址是？')
    if(url.indexOf('http')!==0){
        url = 'https://'+url
    }
    console.log(url);
    hashMap.push({logo:removeX(url)[0].toUpperCase(),//把小写字母改成大写字母
        url:url})
    render();
    
})
window.onbeforeunload =()=>{
   //console.log('页面要关闭了');
   const string = JSON.stringify(hashMap)
   //console.log(typeof hashMap);
   //console.log(hashMap);
   //console.log(typeof hashMap);
   //console.log(string);
   localStorage.setItem('x',string);//在本地的存储里面设置一个值x就是string
}

$(document).on('keypress',(e)=>{
    console.log(e.key);
   const {key} = e
   for(let i = 0;i< hashMap.length;i++){
       if(hashMap[i].logo.toLowerCase() === key){
           window.open(hashMap[i].url)
       }
   }
})