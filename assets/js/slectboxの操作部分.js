		// selectのデータ取得
		$("select").change(
			function(){
				var areaNum = $('select option:selected').val();
				$("#dark7").attr({
					src: 'http://www.drk7.jp/weather/json/'+ areaNum +'.js'
				});
				$.getJSON('http://www.drk7.jp/weather/json/'+ areaNum +'.js');
			}
		);