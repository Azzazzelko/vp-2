var lotusMod = (function(){
  var min_max = $("#price-min, #price-max"),
      boxes = $(".colors__item"),
      viewButtons = $(".control__view-item_inline-block, .control__view-item_inline, .control__view-item_block"),
      temp;

  var main = function(){
    setUpListeners();
    dotdotdot();
    column();
    slider();
    newSelect();
    buildRating();
  };

  var setUpListeners = function(){
    min_max.on("keydown", onlyNumber);

    min_max.on("change", slider);

    $(".clear-filter").on("click", clearFilter);

    boxes.on("click", checkColor);

    $(".categories__toggle").on("click", filterContentToggle);

    viewButtons.on("click", changeView);

    $(".product__img-item").on("click", slideShowClick);
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
      var _min = parseInt( $(".price-min").val() ),
          _max = parseInt( $(".price-max").val() );

      if ( _max < _min ) {
        _max = _min;
        $(".price-max").val(_min);
      }

      $( ".slider-range" ).slider({
        range: true,
        min: _min,
        max: _max,
        values: [ _min, _max ],
        slide: function( event, ui ) {
          $( ".price-min" ).val(ui.values[ 0 ]);
          $( ".price-max" ).val(ui.values[ 1 ]);
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

  function changeView(){  //== Смена вида отображения товаров
    viewButtons
      .removeClass('control__view-item_inline-block_active')
      .removeClass('control__view-item_inline_active')
      .removeClass('control__view-item_block_active');

    if ( $(this).hasClass('control__view-item_inline-block') ){
      $(this).addClass('control__view-item_inline-block_active');
    } else if ( $(this).hasClass('control__view-item_inline') ){
      $(this).addClass('control__view-item_inline_active');
    } else if ( $(this).hasClass('control__view-item_block') ){
      $(this).addClass('control__view-item_block_active');
    }
    
    
    var data = $(this).attr("data-view"),
        over9k = $(".product__list").find("*").add(".product__list");

    over9k.each(function(){
      var classList = $(this).attr("class").split(/\s+/),
          forClear = $(this);

      $(classList).each(function(index, el){
        if ( el.indexOf(temp) > 0 ){
            forClear.removeClass(el);
        };
      });

      var newClassName = $(this).attr("class") + data;

      if ( $(this).attr("class").indexOf(data) == -1 ){
        $(this).addClass(newClassName);
      }
    });
    
    temp = data;
  };
  
  function newSelect(){ //== Плагин-Селект2
    $(".control__select").select2();
  };

  function buildRating(){ //== Создаем звездочки, исходя из циферки в разметке. *нет проверок на дурака*
    var starsLists = $(".product__rate-list");

    starsLists.each(function(index, el){
      var stars = $(this).find('.product__rate-item'),
          starsCol = $(this).find('.product__rate-item_star-col').text();

      stars.each(function(index, el){
        if (index < starsCol){
          $(this).addClass('product__rate-item_active');
        };
      });
    });
  }

  function slideShowClick(){  //== Показываем маленькую картинку в большом поле по клику
    var oldSmallImg = $(this).find('img').attr("src");

    $(this).siblings($(this)).removeClass('product__img-item_active');

    $(this)
      .addClass('product__img-item_active')
      .parent()
      .siblings('.product__full-size-img')
      .find("img")
      .attr("src", oldSmallImg);
  }

  return {
    run:main
  }

}());

$(document).ready(function(){
  lotusMod.run();
});
