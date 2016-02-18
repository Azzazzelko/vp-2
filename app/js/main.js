 $(function() {
    //============= slider ===========
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );

    //============= column ============//
    $('.info-block__text').columnize({ columns: 2 });

    //============= text "..." ========//
    
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

  });