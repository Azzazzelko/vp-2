 var lotusMod = (function(){
  var min_max = $("#price-min, #price-max"),
      boxes = $(".colors__item");

  var main = function(){
    setUpListeners();
    dotdotdot();
    column();
    slider();
  };

  var setUpListeners = function(){
    min_max.on("keydown", onlyNumber);

    min_max.on("change", slider);

    $(".clear-filter").on("click", clearFilter);

    boxes.on("click", checkColor);

    $(".categories__toggle").on("click", filterContentToggle);
  };

  function column(){ //== Разделение текста в диве на две колонки
    $('.info-block__text').columnize({ columns: 2 });
  };

  function dotdotdot(){ //== Обрезание многострочного текста с добавлением ...
      var $destS = $(".product__info");

      $destS.each(function(indx) {
        var $dest = $(this),
            $marker = $("<div>");
        
        var myWi = $dest.width(),
            myHei = $dest.height();

        var $temp = $("<div>").css({
            position: 'fixed',
            left: '-99999px'
        }).appendTo("body");
        
        $marker.replaceWith(
          $dest
            .before($marker)
            .width(myWi).height(myHei)
            .detach().appendTo($temp).dotdotdot()
            .detach()
            .width("").height("")
        );

        $temp.remove();
        });
    };

  function onlyNumber(e){ //== Ввод только цифр. + Разрешен делит, бекспейс и num0-9.
      if( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 13 ){
        return;
      }

      if (((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    };

  function slider(){ //== Слайдер в общем-то
      var _min = parseInt( $("#price-min").val() ),
          _max = parseInt( $("#price-max").val() );

      if ( _max < _min ) {
        _max = _min;
        $("#price-max").val(_min);
      }

      $( "#slider-range" ).slider({
        range: true,
        min: _min,
        max: _max,
        values: [ _min, _max ],
        slide: function( event, ui ) {
          $( "#price-min" ).val(ui.values[ 0 ]);
          $( "#price-max" ).val(ui.values[ 1 ]);
        }
      });
  };

  function clearFilter(e){ //== Очистка чек-боксов
    e.preventDefault();

    var items = $(this).parent().parent().find("input");
    items.each(function(index){
      $(this).removeAttr('checked');
    });
  };

  function checkColor(e){  //== Выбор цвета кубика
      boxes.removeClass('colors__item_active');
      $(this).addClass('colors__item_active');
  };

  function filterContentToggle(e){ //== Аккордеон
    e.preventDefault();

    $(this)
      .toggleClass("categories__toggle_open")
      .siblings('.categories__content')
      .stop(true, true)
      .slideToggle();
  };

  return {
    run:main
  }

}());

$(document).ready(function(){
  lotusMod.run();
});


