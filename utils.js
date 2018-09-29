/**
 * 1.判断 Obj 是否为 json
 * @param  obj
 * @return obj
 */
function isJson(obj){
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}
/**
 * 2.将 Obj 的 Key 第一个字母转为大写
 * @param  Obj
 * @return Obj
 */
function upperJsonFirst(jsonObj){
    for(key in jsonObj){
        var upperKey = key.replace(key.charAt(0),key.charAt(0).toUpperCase());
        jsonObj[upperKey] = jsonObj[key];
        delete jsonObj[key];
        if(isJson(jsonObj[upperKey])){
            upperJsonFirst(jsonObj[upperKey])
        }
    }
}
/**
 * 3.获取随机六位数
 * @return {[string]} 随机六位数
 */
function getRandomNum(){
    return Math.random().toString().slice(-6)
}
/**
 * 4.从html标签中提取图片
 * @param  {[string]} str html标签的字符串
 * 返回src的数组
 */
function getSrcByHtml(str){
    //匹配图片（g表示匹配所有结果i表示区分大小写）
    var imgReg = /<img.*?(?:>|\/>)/gi;
    //匹配src属性
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = str.match(imgReg);
    var imgArr = []
    for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(srcReg);
        imgArr.push(src[1])
    }
    return imgArr
}
/**
 * 5.删除str中空的img标签
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function deleteNullImg(str){
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    str = str.replace(imgReg,function(match,oldText){
        if(match.match(srcReg)!=null){
            if(match.match(srcReg)[1] == ''|| match.indexOf('src') == -1){
                return ''
            }else{
                return match
            }
        }else{
            return ''
        }
    })
    return str
}
/**
 * 6.时间戳/obj格式的时间 转化为相应格式
 * 默认 xxxx-xx-xx xx:xx:xx 格式
 * @param  {[obj/str/num]} time    [传入需要转化的时间]
 * @param  {[type]} cFormat [传入相应的时间格式]
 * 年{y} 月{m} 日{d} 时{h} 分{i} 秒{s} 星期{a}
 * @return {[string]}         [转化后的时间]
 */
function parseTime(time, cFormat){
    if(arguments.length === 0){
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if(typeof time == 'object'){
        date = time
    }else{
        if(('' + time).length === 10){
            time = parseInt(time) * 1000;
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if(key === 'a'){
            return '星期' + ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        }
        if (result.length > 0 && value < 10) {
          value = '0' + value;
        }
        return value || 0;
    })
    return time_str;
}

/**
 * 7. 前端活动倒计时 *
 */
 const interval = 1000
 let ms = 5000 // 从服务器和活动开始时间计算出的时间差，这里测试用 50000 ms
 let count = 0
 const startTime = new Date().getTime()
 let timeCounter
 if (ms >= 0) {
     timeCounter = setTimeout(countDownStart, interval)
 }

 function countDownStart() {
     count++
     const offset = new Date().getTime() - (startTime + count * interval)
     let nextTime = interval - offset
     if (nextTime < 0) {
         nextTime = 0
     }
     ms -= interval
     console.log(`误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`)
     if (ms <= 0) {
         clearTimeout(timeCounter)
     } else {
         timeCounter = setTimeout(countDownStart, nextTime)
     }
 }
