/**
 * 判断 Obj 是否为 json
 * @param  obj
 * @return obj
 */
function isJson(obj){
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}
/**
 * 将 Obj 的 Key 第一个字母转为大写
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
