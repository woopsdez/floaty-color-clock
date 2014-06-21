// ----- 関数群 -----

// 時間取得
var getTime = function(){
	var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	var d = new Date; // インスタンス作成

	// それぞれを変数に入れていく
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var week = days[d.getDay()];

	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();

	// もし分が一桁だったら二桁にする
	if (Math.floor(minutes / 10) === 0) {
  minutes = "0" + minutes;
	}

	// 日付と曜日をまとめる
	mdw = month + "/" + day + " " + week;

	// それぞれの値を返す
	return {
		"hours" : hours,
		"minutes" : minutes,
		"seconds" : seconds,
		"mdw" : mdw,
	};
}

// HTMLを書き換える
var overWrite = function(id, replaceText) {
  var hm;
  hm = document.getElementById(id);
  return hm.innerHTML = replaceText;
};

// 取得した時間をHTMLに書き込む
var refleshTime = function(){
	var t = getTime();
	overWrite("numH", t.hours);
	overWrite("numM", t.seconds);
	overWrite("dw", t.mdw);
}

refleshTime();
setInterval(refleshTime,1000);

// animation

$('#blink').addClass('fadeInUp flash')
$('.fade-in-6').addClass('fadeInUp');
$('.fade-in-7').addClass('fadeInUp');

// .temparature ul liにアニメーション管理用のclassを付与
$(function(){
  $('.temparature ul li').each(function(i){ 
    $(this).attr('class','fade-in-' + (i+1)); //fade-inの連番Classを振る
    $(this).addClass('animated bounceIn'); // animation用のclass付与
  });
});