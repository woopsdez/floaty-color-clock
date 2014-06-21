days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
d = new Date

month = d.getMonth() + 1 #月
day = d.getDate() #日
week = days[d.getDay()] #曜日
hour = d.getHours() #時間
minutes = d.getMilliseconds() #分
#分の桁数を合わせる
if Math.floor(minutes/10) == 0
	minutes = "0" + minutes

#月、日、曜日をまとめる
mdw = "#{month}/#{day} #{week}"

# --- 関数群 ---

# HTMLを上書きする関数
overWrite = (id,replaceText) ->
	hm = document.getElementById(id)
	hm.innerHTML = replaceText

# 実行部分
# setTimeOut ->
# 	# overWrite("numH","#{hour}")		
# 	# overWrite("dw","#{mdw}"),
# 		overWrite("numM","#{minutes}")
# 	,1000


setInterval ->
    overWrite("numM","#{minutes}")
, 100	