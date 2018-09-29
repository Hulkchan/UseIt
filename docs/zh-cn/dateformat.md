### 时间转化/格式化/计算
```javascript
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
```
