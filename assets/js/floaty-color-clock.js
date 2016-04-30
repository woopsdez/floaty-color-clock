// =====================
// -- 時間表示 --
// =====================
// ----- 関数群 -----

// 時間取得
function getTime () {
	var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	var d = new Date(); // インスタンス作成

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
	var mdw = month + "/" + day + " " + week;

	// 現在時刻の秒数
	var _sec = hours*60*60 + minutes*60 + seconds;
  var _per = _sec / 86400;
  console.log(_per);

  // 桁を切り捨て
  var _pow = Math.pow(10, 2);
  var pwd = Math.round(_per*_pow) / _pow;
  console.log(pwd);

	// それぞれの値を返す
	return {
		"hours" : hours,
		"minutes" : minutes,
		"seconds" : seconds,
		"mdw" : mdw,
		"pwd" : pwd
	};
}

// =====================
// 天気情報を取得
// =====================

var prefName, areaName;
var prefNum = 13;

// selectの値が保存してあれば、それを初期値とする
if (localStorage.prefNum !== undefined) {
	console.log('「' + localStorage.prefNum + '」があるよ');
	prefNum = localStorage.prefNum;
	$("#pref").val(String(prefNum));
	$("body").append("<script src=\"http://www.drk7.jp/weather/json/" + prefNum + ".js\"></script>");
}

// 地域の変更
$("#pref").change(
	function(){
		prefNum = $('select option:selected').val();
		localStorage.setItem('prefNum', prefNum);
		$("body").append("<script src=\"http://www.drk7.jp/weather/json/" + prefNum + ".js\"></script>");
		$('#area').remove();
		$('#setArea').append('<select id="area" name="ara"></select>');
	}
);


drk7jpweather = { // objectを定義
	"callback" : function(json){ // 無名関数でcallbackを定義
	  // --- データ取得 ---
		// 地域データを取得
		prefName = json.pref.id;
		var area = json.pref.area;
		for (var key in area){ // areaのプロパティ名をkeyに入れる
			areaName = key;
			$("#area").append('<option value="'+ key +'">'+ key +'</option>');
		}

		// 降水確立を取得
		var period = json.pref.area[key].info[0].rainfallchance.period; //長いので一時格納			

		// 処理用の変数や配列に格納
		var data, num, iconImg, max, min, average;

		// 長ったらしいパスを格納
		// -- TODO 処理部分HTMLにclassを入れて短縮する --
		var time = $(".weather ul li time");
		var icon = $(".weather i");
		var rainNum = $(".rainfall");

		for (var i = 0; i < period.length; i++) { // periodに格納している数だけ繰り返す
			data = period[i]; // periodをdataに入れる
			// --- 天気の処理 ---
			// 降水確立の数字をアイコンにマッピング
			if ( data.content <= 30 ) {
				iconClass = "wi wi-day-sunny";
			}else
			if (data.content > 31 && data.content <= 60 ) {
				iconClass = "wi wi-cloudy";
			}else
			if (data.content >= 61){
				iconClass = "wi wi-rain";
			}else{
				iconClass = "fa fa-question";
			}

			$(icon[i]).attr("class", "wi "+iconClass);
			$(rainNum[i]).text(data.content+"%");
		}

		// -- styling --
		setTimeout(function(){
			var maxVal = 0;
			$('i.wi').each(function(index,ele){
				maxVal = Math.max(maxVal, $(this).height());
			});
			$('i.wi').height(maxVal);
		},1000);

		// 県名を英語に変換
		var jp = jpPrefecture;
		var prefNameEn = jp.prefConvert(prefName, "en");
		$("#areaName small").text(prefNameEn);
	}
};

// 取得した時間をHTMLに書き込む
function refleshTime (){
	var t = getTime();
	$("#numH").text(t.hours);
	$("#numM").text(t.minutes);
	$("#dw").text(t.mdw);

	// 背景色
	$('body').css()
}

refleshTime();
setInterval(refleshTime,1000);

// =====================
// -- slide menu --
// =====================
function openSlide(){
	$(this).removeClass('off');
	$(this).addClass('on');
	$('.setting').animate({left: '0'});
	$('.detail').animate({left: '280px'});
	$('.on').off('click');
	$('.on').click(closeSlide);
}

function closeSlide(){
	$(this).removeClass('on');
	$(this).addClass('off');
	$('.setting').animate({left: '-280px'});
	$('.detail').animate({left: '0'});
	$('.off').off('click');
	$('.off').click(openSlide);
}

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
		}
	});
}

if (localStorage.fontName !== null) {
	console.log(localStorage.fontName);
	$('body').css('font-family', localStorage.fontName);

	// 選択した書体をselectedにしておく
	$('#selectFont option').each(function () {
		var str = $(this).attr('value');
		if (localStorage.fontName === str) {
			$('#selectFont').val(str);
		}
	});
}

// text color
function setTextColor(e, colorName){
	$(e).on('click', function(){
		localStorage.setItem('color', colorName);
		$('.detail').css("color", colorName);
	});
}
setTextColor('#textWhite', 'white');
setTextColor('#textBlack', 'black');

// font
$('.style #selectFont').change(function(){
	fontName = $(this).val();
	localStorage.setItem('fontName', fontName);
	$('body').css("font-family", localStorage.fontName);
});

// ====================
// Fullscreen
// ====================

var target = document.getElementById("target");
var btn    = document.getElementById("fullscreenSwitch");

/*フルスクリーン実行用ファンクション*/
function requestFullscreen() {
	if (target.webkitRequestFullscreen) {
		target.webkitRequestFullscreen(); //Chrome15+, Safari5.1+, Opera15+
	} else if (target.mozRequestFullScreen) {
		target.mozRequestFullScreen(); //FF10+
	} else if (target.msRequestFullscreen) {
		target.msRequestFullscreen(); //IE11+
	} else if (target.requestFullscreen) {
		target.requestFullscreen(); // HTML5 Fullscreen API仕様
	} else {
		alert('ご利用のブラウザはフルスクリーン操作に対応していません');
		return;
	}
	/*フルスクリーン終了用ファンクションボタンに切り替える*/
	btn.onclick = exitFullscreen;
}

/*フルスクリーン終了用ファンクション*/
function exitFullscreen() {
	if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen(); //Chrome15+, Safari5.1+, Opera15+
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen(); //FF10+
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen(); //IE11+
	} else if(document.cancelFullScreen) {
		document.cancelFullScreen(); //Gecko:FullScreenAPI仕様
	} else if(document.exitFullscreen) {
		document.exitFullscreen(); // HTML5 Fullscreen API仕様
	}
	/*フルスクリーン実行用ファンクションボタンに切り替える*/
	btn.onclick = requestFullscreen;
}
/*サポートしていないIE10以下とスマフォではフルスクリーンボタンを非表示*/
if(typeof window.orientation != "undefined" || (document.uniqueID && document.documentMode < 11)){
	btn.style.display = "none";
}