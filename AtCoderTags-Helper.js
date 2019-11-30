// ==UserScript==
// @name         AtCoderTags_Helper
// @version      0.1
// @author       Null_Null
// @match        https://atcoder.jp/contests/*/tasks/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant        none
// ==/UserScript==

(function() {
})();

function getContestName() {
    let contestURL = location.href;
    let contestArray = contestURL.split('/');
    return contestArray[contestArray.length - 1];
}

 $('#copyright').append(`<div style="padding-top:5rem">
    <div id="menu_wrap">
        <div id="sidemenu" class="container" style="height:10;">
            <div class="menu-wrapper">
                <div class="menu-header">
                    <h4 class="sidemenu-txt">Tag-Vote</h4>
                </div>
                <div class="menu-box" style="height: 20px;">
                   <form id="search" method="POST" action="">
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

(async function () {
        const tag = [
            //what?
            "Puzzle", "String-Parsing", "String-Manipulation", "String-Forward",
            "Data-Manipulation", "Simulation", "Geometry", "Numerical-Analysis",
            "Ad-Hoc", "Probability", "Combinational-Problem", "Number", "Graph", "Game",
            //how?
            "Ordering", "Searching", "Brute-Force",
            "Backtracking", "Heuristic-Search", "Divide-and-Conquer",
            "Dynamic-Programming", "Greedy-Methods", "Randomized-Algorithm",
            "Graph-Algorithms", "Flow-Algorithms",
            "Algorithms-with-Numbers", "Numerical-Algorithms",
            "Geometric-Algorithms", "String-Algorithms", "List", "Hash", "Set", "Tree"
        ];
        $('#input_tag').autocomplete({
            source: tag,
            autoFocus: true,
            delay: 0,
            minLength: 0,
            appendTo: "menu",
            //候補をクリックすることでsubmitできるようにする
            select: function (event, ui) {
                var name = ui.item.label;
                $("#ingput_tag").val(name);
                var tweet_text="/"+getContestName()+"/"+name+"/";
                window.open().location.href=("https://twitter.com/share?url=https://atcoder-tags.herokuapp.com&hashtags=AtCoderTags&text=" + tweet_text )
            }
        });
        //input内でのEnter無効化
        $(function () {
            $(document).on("keypress", "input:not(.allow_submit)", function (event) {
                return event.which !== 13;
            });
        });
        //日本語入力をスタートしたら無効化
        $('#input_tag').on('compositionstart', function () {
            $('#intput_tag').autocomplete('disable');
        });
        //日本語入力が確定したら有効化
        $('#input_tag').on('compositionend', function () {
            $('#input_tag').autocomplete('enable').autocomplete('search');
        });
    })();



