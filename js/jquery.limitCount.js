/*
 * 入力フィールドの入力可能文字数をカウントする関数
 * ターゲットのフィールドをIDセレクターで選択して使用する。
 * ・sizeに入力可能数を設定する
 * ・optionは文字の装飾に関するオプション（未実装）
 *
 * 例）
 * <input type="text" id="hoge">に対して適用する場合は以下のように書く。
 *
 * $(function(){
 *     $("#hoge").limitCount(20);
 * });
 *
 */
(function($){
	// プラグインの対象メソッド
	$.fn.limitCount = function(size, option) {
		$.lcf.size = size;
		return $.lcf.limitCount(this, option);
	};

	// 独自の名前空間
	$.lcf = {};

	$.lcf.size = -1;

	// 処理の実態
	//
	// target   : 入力フィールド自身 $(target)
	// option   : オプション
	$.lcf.limitCount = function(target, option) {
		var $target = $(target);
		var firstcount = $.lcf.size - $target.val().length;
		var selectorval = "#" + $target.attr("id") + " + .count_input";

		if (($target.next("span.count_input")).size() === 0) {

			$target
				// カウント数を表示するタグを追加
				.after("<span class=\"count_input\"></span>")
				// 文字入力後のカウント
				.bind("keyup change", function(){
					var countdown = $.lcf.size - $target.val().length;
					var selectorval2 = "#" + this.id + " + .count_input";
					$.lcf.limitCount.textcolor(selectorval2, countdown);
				});
		}
		// 初期カウント表示用
		$.lcf.limitCount.textcolor(selectorval, firstcount);
	};

	// 文字の装飾用
	$.lcf.limitCount.textcolor = function(selectorval, countdown) {
		var $count_input = $(selectorval);
		$count_input.html(countdown);

		if (countdown < 0) {
			$count_input.css({color:'#ff0000', fontWeight:'bold', padding:'3px'});
		} else {
			$count_input.css({color:'#0099ff', fontWeight:'normal', padding:'3px'});
		}
	};
})(jQuery);
