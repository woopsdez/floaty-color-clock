// =====================
// -- 時間表示 --
// =====================
// ----- 関数群 -----

// 時間取得
function getTime () {
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

// 取得した時間をHTMLに書き込む
function refleshTime (){
	var t = getTime();
	$("#numH").text(t.hours);
	$("#numM").text(t.minutes);
	$("#dw").text(t.mdw);
}

// 天気情報を取得


// selectのデータ取得
$("#pref").change(
	function(){
		prefNum = $('select option:selected').val();
		$("body").append("<script src=\"http://www.drk7.jp/weather/json/" + prefNum + ".js\"></script>");
		$('#area').remove();
		$('#setArea').append('<select id="area" name="ara"></select>');
	}
);

drk7jpweather = { // objectを定義
	"callback" : function(json){ // 無名関数でcallbackを定義
		var prefNum = 0;
	  	// --- データ取得 ---
		// 地域データを取得
		var area = json.pref.area;
		for (var key in area){ // areaのプロパティ名をkeyに入れる
			$("#area").append('<option value="'+ key +'">'+ key +'</option>');
		}

		// 降水確立を取得
		var period = json.pref.area[key].info[0].rainfallchance.period; //長いので一時格納				

		// 処理用の変数や配列に格納
		var data, num, iconImg, max, min, average;

		// 長ったらしいパスを格納
		// -- TODO 処理部分HTMLにclassを入れて短縮する --
		var time = $(".weather ul li time")
		var icon = $("i.wi")
		var rainNum = $(".rainfall")

		for (var i = 0; i < period.length; i++) { // periodに格納している数だけ繰り返す
			data = period[i]; // periodをdataに入れる
			// --- 天気の処理 ---
			// 降水確立の数字をアイコンにマッピング
			if ( data.content <= 30 ) {
				iconClass = "wi-day-sunny";
			}else
			if (data.content > 31 && data.content <= 60 ) {
				iconClass = "wi-cloudy"
			}else
			if (data.content >= 61){
				iconClass = "wi-rain"
			}else{
				iconClass = "wi-alien"
			};

			$(icon[i]).attr("class", "wi "+iconClass)
			$(rainNum[i]).text(data.content+"%")
		};
		// -- styling --
		setTimeout(function(){
			var maxVal = 0;
			$('i.wi').each(function(index,ele){
				maxVal = Math.max(maxVal, $(this).height())
			});
			$('i.wi').height(maxVal)
		},1000);
	}
}

refleshTime();
setInterval(refleshTime,1000);

// =====================
// -- animation --
// =====================
$('#blink').addClass('flash');
$('.fade-in-6').addClass('fadeInUp');
$('.fade-in-7').addClass('fadeInUp');

// .weather ul liにアニメーション管理用のclassを付与
$(function(){
	$('.weather ul li').each(function(i){ 
    $(this).attr('class','fade-in-' + (i+1)); //fade-inの連番Classを振る
    $(this).addClass('animated bounceIn'); // animation用のclass付与
  });
});

// =====================
// -- slide menu --
// =====================
function openSlide(){
	$(this).removeClass('off');
	$(this).addClass('on');
	$('.setting').animate({left: '0'});
	$('.detail').animate({left: '350px'});
	$('.on').off('click');
	$('.on').click(closeSlide);
};

function closeSlide(){
	$(this).removeClass('on');
	$(this).addClass('off');
	$('.setting').animate({left: '-350px'});
	$('.detail').animate({left: '0'});
	$('.off').off('click');
	$('.off').click(openSlide);
};

$('.off').hover(
	function(){
		$(this).animate({
			opacity: '1'
		});
	},
	function(){
		$(this).animate({
			opacity: '0'
		});
	}
	);

$('.detail').click(openSlide);

// =====================
// -- css set propaty --
// =====================

// 設定を保存
if (localStorage.color !== null) {
	console.log(localStorage.color);
	$('.detail').css('color', localStorage.color);
	$('#textColor input').each(function(){
		var str = $(this).attr('value');
		if (localStorage.color === str) {
			$(this).prop('checked',true);
		};
	});
};

if (localStorage.fontName !== null) {
	console.log(localStorage.fontName);
	$('body').css('font-family', localStorage.fontName);

	// 選択した書体をselectedにしておく
	$('#selectFont option').each(function () {
		var str = $(this).attr('value');
		if (localStorage.fontName === str) {
			$('#selectFont').val(str);
		};
	});
};

// text color
function setTextColor(e, colorName){
	$(e).on('click', function(){
		localStorage.setItem('color', colorName);
		$('.detail').css("color", colorName);
	})
}
setTextColor('#textWhite', 'white')
setTextColor('#textBlack', 'black')

// font
$('.style #selectFont').change(function(){
	fontName = $(this).val();
	localStorage.setItem('fontName', fontName);
	$('body').css("font-family", localStorage.fontName);
});