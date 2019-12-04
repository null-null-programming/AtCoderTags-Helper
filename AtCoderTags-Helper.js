// ==UserScript==
// @name         AtCoderTags_Helper
// @version      0.6
// @author       Null_Null
// @match        https://atcoder.jp/contests/*/tasks/*
// @match        https://*/tasks/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant        none
// @namespace https://github.com/null-null-programming/AtCoderTags-Helper
// @description
// AtCoderTagsへのTag投票を、AtCoder問題ページからTagを選ぶだけで投票できるようにします。
// ==/UserScript==

(function() {})();

function getContestName() {
  let contestURL = location.href;
  let contestArray = contestURL.split('/');
  return contestArray[contestArray.length - 1];
}

$('#copyright').append(`<div style="padding-top:5rem">
    <div>
        <div style="height:10;">
            <div>
                <div>
                    <h4>Tag-Vote</h4>
                </div>
                <div style="height: 20px;">
                   <form id="search">
                        <div class="input-group col-xs-11">
                            <span class="input-group-addon">Select-Tag</span>
                            <input class="form-control" id="input_tag">
                        </div>
                   </form>
                </div>
            </div>
        </div>

        <div style="height: 20px;"></div>
    </div>
</div>`);

(async function() {
  const tag = [
    'Searching', 'Greedy-Methods', 'String', 'Mathematics', 'Graph',
    'Technique', 'Construct', 'Dynamic-Programming', 'Data-Structure', 'Game',
    'Flow-Algorithms', 'Geometry'
  ];
  $('#input_tag').autocomplete({
    source: tag,
    autoFocus: true,
    delay: 0,
    minLength: 0,
    appendTo: 'menu',
    //候補をクリックすることでsubmitできるようにする
    select: function(event, ui) {
      var name = ui.item.label;
      $('#ingput_tag').val(name);
      var probleme_id = getContestName();

      window.open().location.href =
          (('https://atcoder-tags.herokuapp.com/vote_result?problem_id=' +
            probleme_id + '&tag=' + name))
    }
  });
  // input内でのEnter無効化
  $(function() {
    $(document).on('keypress', 'input:not(.allow_submit)', function(event) {
      return event.which !== 13;
    });
  });
  //日本語入力をスタートしたら無効化
  $('#input_tag').on('compositionstart', function() {
    $('#intput_tag').autocomplete('disable');
  });
  //日本語入力が確定したら有効化
  $('#input_tag').on('compositionend', function() {
    $('#input_tag').autocomplete('enable').autocomplete('search');
  });
})();
