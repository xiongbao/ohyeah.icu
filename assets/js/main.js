var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.match(/MicroMessenger/i) == "micromessenger" ? true : false

function template(str,obj){
  var reg = /{{(\w+)}}/;
  var result = reg.exec(str);
  while(reg.exec(str)!=null){
    var str = str.replace(result[0],obj[result[1]]);
    var result = reg.exec(str);
  }
  return str;
}

var date = new Date();
var year = date.getFullYear(); 
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var title = '';
var summary = '';
var ohyeahDays,days;
var LogTime = Date.parse(date);
var nowDate,lastDate,logDays=0,logHours=0,logMinutes=0;
    nowDate = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes() ];

var stateWork = ['划水摸鱼','带薪大便','无聊发呆','混吃等死','虚度光阴','无所事事','虚度年华','无精打采','行尸走肉','吊儿郎当','漫不经心','百无聊赖','好逸恶劳','游手好闲','碌碌无为'];
var resultElement = document.createElement('article');

// 本地存储
var Logs = JSON.parse(localStorage.getItem('OhYeahLogs')) || [];
if( Logs.length > 0 ) {
  dateLast = new Date(Logs[Logs.length - 1]);
  lastDate = [ dateLast.getFullYear(), dateLast.getMonth() + 1, dateLast.getDate(), dateLast.getHours(), dateLast.getMinutes() ];
  logDays = Logs.length;
  for(var i = 0;i < Logs.length; i++) {
    logHours += new Date(Logs[i]).getHours();
    logMinutes += new Date(Logs[i]).getMinutes();
  }
  if (logMinutes > 60) {
    logHours += Math.floor(logMinutes/60);
    logMinutes = Math.round(logMinutes%60);
  }
} else {
  dateLast = new Date('2020-04-11 22:00:00'); // 默认比较日期，本站上线时间
  lastDate = [ dateLast.getFullYear(), dateLast.getMonth() + 1, dateLast.getDate(), dateLast.getHours(), dateLast.getMinutes() ];
}

if(hour >= 0 && hour <= 6){
  title = '熬夜自杀';
  resultElement.style.backgroundColor = "#ca3939";
  if (lastDate[0] != nowDate[0] || lastDate[1] != nowDate[1] || lastDate[2] != nowDate[2]) {
    Logs.push(LogTime)
    logDays = Logs.length;
    logTmpMinutes = logMinutes + minute;
    logMinutes = Math.round(logTmpMinutes%60);
    logHours += hour + Math.floor(logTmpMinutes/60);
  } else if(lastDate[3] == nowDate[3]) {
    Logs[Logs.length - 1] = LogTime;
    logTmpMinutes = nowDate[4] - lastDate[4];
    logMinutes = Math.round((logMinutes+logTmpMinutes)%60);
    logHours += Math.floor(logTmpMinutes/60);
  } else if(lastDate[3] != nowDate[3]) {
    Logs[Logs.length - 1] = LogTime;
    logTmpHours = nowDate[3] - lastDate[3];
    logMinutes = minute;
    logHours += logTmpHours;
  }

  summary = '你累计熬夜'+logDays+'天，共计'+logHours+'小时'+logMinutes+'分，快滚去睡';
  document.getElementById('themeColor').content = '#ca3939';
  // 写入
  localStorage.setItem('OhYeahLogs',JSON.stringify(Logs))
} else if(hour >= 22 && hour <= 23){
  title = '准备熬夜';
  summary = '你已经熬夜'+logDays+'天，请不要再继续了，赶紧睡吧';
  resultElement.style.backgroundColor = "#e87715";
} else {
  title = stateWork[Math.floor(Math.random() * stateWork.length)];
  summary = '虽然此刻你没有在熬夜，但你在'+title+'呀<br>你累计熬夜'+logDays+'天，共计'+logHours+'小时'+logMinutes+'分';
}

// 渲染数据
var data={
  title: title,
  summary: summary
}
var tpl = document.getElementById('template');
var result = template(tpl.innerHTML,data);
resultElement.innerHTML = result;
if(isWeixin){
  document.body.className = 'weixin';
}
document.body.insertBefore(resultElement,tpl);
