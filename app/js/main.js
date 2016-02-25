var lotusMod = (function(){
  var viewButtons = $(".control__view-item_inline-block, .control__view-item_inline, .control__view-item_block"),
      tempData;  //нужная глобальная переменная для смены видов

  var main = function(){
    setUpListeners();
    column();
    slider();
    newSelect();
    buildRating();
  };

  var setUpListeners = function(){
    $("#price-min, #price-max").on("keydown", onlyNumber); //при вводе чего-либо в инпут слайдера

    $("#price-min, #price-max").on("change", slider); //при изменении слайдера

    $(".clear-filter").on("click", clearFilter); //очистка слайдера

    $(".colors__item").on("click", checkColor); //коробки с цветами

    $(".categories__toggle").on("click", filterContentToggle); //аккардеон

    viewButtons.on("click", changeView); //кнопочки сменов вида

    $(".product__img-item").on("click", slideShowClick); //нажатие на мелкую картинку
  };

  function column(){ //== Разделение текста в диве на две колонки
    $('.info-block__text').columnize({ columns: 2 });
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
      var _min = parseInt( $(".price-min").val() ), // значение инпута мин
          _max = parseInt( $(".price-max").val() ), // значение инпута макс
          sliderMin = parseInt( $(".price-min").attr("data-min") ), //значение дата-атрибута мин
          sliderMax = parseInt( $(".price-max").attr("data-max") ); //значение дата-атрибута макс

      if ( _max < _min ) { //если в значении инпута макс меньше минимуму, то макс = мин.
        _max = _min;
        $(".price-max").val(_min);
      }

      $( ".slider-range" ).slider({
        range: true,
        min: sliderMin, // минимум слайдера
        max: sliderMax, // максимум слайдера
        values: [ _min, _max ], // значение на которое головки встанут
        slide: function( event, ui ) {
          $( ".price-min" ).val(ui.values[ 0 ]); //показываем в инпут изменение слайдера
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
      $(".colors__item").removeClass('colors__item_active');
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
      .removeClass('control__view-item_block_active');  //Удаляем все актив классы

    if ( $(this).hasClass('control__view-item_inline-block') ){ // т.к. у меня актив класс каждому эл-у является уникальным, у каждого своя картинка,.. то через проверку на нужный нам див вешаем нужный ему актив.
      $(this).addClass('control__view-item_inline-block_active');
    } else if ( $(this).hasClass('control__view-item_inline') ){
      $(this).addClass('control__view-item_inline_active');
    } else if ( $(this).hasClass('control__view-item_block') ){
      $(this).addClass('control__view-item_block_active');
    }
    
    
    var data = $(this).attr("data-view"), // дата атрибут на кнопочках переключения
        myItems = $(".product__list").find("*").add(".product__list"); // все элементы, которым применится новый класс исходя из дата атрибута.. == все эл-ты изменяемого контента

    myItems.each(function(){ // перебираем элементы ИЧом..
      var classList = $(this).attr("class").split(/\s+/), // понадобится класс-лист, создаем его.. режем строку атрибута класс, лепим из этого массив.. на выходе - массив с классами.
          forClear = $(this); //запоминаем в эту переменную наш текущий элемент this.

      $(classList).each(function(index, el){  //если у элемента СУЩЕСТВУЕТ класс, навешанный с дата-атрибута кнопочек смены вида, очищаем его.
        if ( el.indexOf(tempData) > 0 ){
            forClear.removeClass(el);
        };
      });

      var newClassName = $(this).attr("class") + data; //создаем новое имя для нового класса, это имя класс + дата атрибут кнопочки.

      if ( $(this).attr("class").indexOf(data) == -1 ){  //если если такой класс еще НЕ навешан, делаем это..
        $(this).addClass(newClassName);
      }
    });
    
    tempData = data; //сохраняем значение текущего дата-атрибута в переменную. Дабы потом, очистить эллементы от него на след. круге.. при нажатии на иную кнопку..
  };
  
  function newSelect(){ //== Плагин-Селект2
    $(".control__select").select2();
  };

  function buildRating(){ //== Создаем звездочки, исходя из циферки в разметке. *нет проверок на дурака*
    var starsLists = $(".product__rate-list"); //коллекция списков со звездочками-лишками..

    starsLists.each(function(index, el){ //перебираем наши списки..
      var stars = $(this).find('.product__rate-item'), //все звездочки в текущем списке..
          starsCol = $(this).find('.product__rate-item_star-col').text(); //значение которое стоит в верстке..

      stars.each(function(index, el){ //перебираем звездочки..
        if (index < starsCol){ //если индекс звездочки меньше значения в верстке то..
          $(this).addClass('product__rate-item_active'); //навешиваем красную звезду!=)
        };
      });
    });
  }

  function slideShowClick(){  //== Показываем маленькую картинку в большом поле по клику
    var oldSmallImg = $(this).find('img').attr("src"); //значение сорсы мелкой картинки

    $(this).siblings($(this)).removeClass('product__img-item_active'); //всем рядомлежащщим картинкам от текущей (this), снимаем класс актив 

    $(this)                                       //идем от текущего эллемента
      .addClass('product__img-item_active')       //добавляем ему класс актив
      .parent()                                   //находим родителя
      .siblings('.product__full-size-img')        //ближайший к нему класс (див) с моей большой картинкой внутри
      .find("img")                                //в нем находим картинку
      .attr("src", oldSmallImg);                  //и меняем в ней атрибут сорс на сорс с мелкой картинки. (на ту, которую клацнули)
  }

  return {
    run:main
  }

}());

$(document).ready(function(){
  lotusMod.run();
});


