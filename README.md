#jQuery AutoSmothController Plugin

This plug-in is a page within the smooth scrolling plug-in that specializes in the weblog for.
Please see the demo and documentation for more details.

ブログでの使用に特化したページスムーズスクロールプラグインです。
様々なリッチな機能を搭載し、閲覧者のユーザビリティの向上と共に、そのほとんどを自動的に出力するため記述の負担を大きく軽減するができます。
様々な条件下での使用を想定している為、豊富なオプションを用意しそれに対応しています。
また、アンカーを一つも設置しなかった場合は「移動可能なトップへ戻るボタン」として機能します。


##Basic Using

###Use
* jQuery
* jQueryUI
* AutoSmoothScroller.js
* jquery.ui.touch-punch.js (For mobile draggable patch)
* jquery cookie (Draggable position save)

and AutoSmoothScroller.css.

    <link rel="stylesheet" href="jquery.autosmoothcontroller.css">  

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <script src="jquery.cookie.js"></script>
    <script src="jquery.ui.touch-punch.min.js"></script> //For mobile draggable patch
    <script src="jquery.autosmoothcontroller.js"></script>
    /* or */
    <script src="jquery.autosmoothcontroller.min.js"></script> //jquery.cookie.js&ui.touch-punch packed.



###Instantiation

    $(window).load(function(){
      $('#element').autosmoothcontroller();
    });

##Options
| Key          | default          | Descripiton
|:-------------|:-----------------|:------------------------------------------------------------------------------------|
| target       | '.section'       | アンカーにする要素を指定                                                                 |
| speed        | 1200             | アンカーまでのスクロールスピード（ミリ秒）                                                  |
| distance     | 0                |	アンカーのoffsetTopから指定pxスクロール位置をずらします。                                    |
| stick        | [false,'outer']  | true時、第二引数の位置へコントローラーを吸着させます。                                        |
| setX         | 'right'          | コントローラーの初期位置：左右指定                                                         |
| setY         | 'top'            | コントローラーの初期位置：上下指定                                                         |
| manualX      | 0                | コントローラーの初期位置をX方向へ指定pxずらします。                                          |
| manualY      | null             | コントローラーの初期位置をY方向へ指定pxずらします。                                          |
| addLast      | true             | コントローラーの最後のボタンにスタイルを付与します。                                          |
| easing       | 'swing'          | イージング。jQuery Easing Pluginを併用することができます。                                 |
| autoStrings  | true             | アンカー要素内のテキストを自動取得します。                                                  |
| maxStrings   | 15               | Tipsに表示するテキストの最大文字数。                                                      |
| autoReverse  | true             | 画面左右でTipsの向きを反転させます。（draggable完了後に反映）                                |
| dataname     | 'name'           | Tipsのテキストを任意のdata属性から取得させられます。                                        |
| message      | 'section'        | autoStringsがfalseかつ、data属性の指定が無かった際に表示するテキスト。（messageのテキスト+連番） |
| draggable    | true             | jqueryUI(http://jqueryui.com/draggable/)参照                                         |
| axis         | false            | jqueryUI(http://jqueryui.com/draggable/)参照                                         |
| period       | 14               | Cookieの保存期間                                                                      |
| customClass  | 'default'        | カスタムclassを付与します。                                                             |

詳しい説明と使用方法は下記Documentationをご覧下さい。

##Documentation
<http://glitter-style.jp/labo/web-resource/jquery-autosmoothcontroller/>

##DEMO
[DEMO Page](http://glitter-style.jp/labo/products/AutoSmoothController.js/)

##Dependencies

jQuery 1.8+  
jQueryUI 1.8+  
jquery.cookie.js
jquery.ui.touch-punch.js


##Licence

MIT Licence, enjoy.
