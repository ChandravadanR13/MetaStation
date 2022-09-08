$(document).ready(function() {

  $(".default_option").click(function() {
      $(this).parent().toggleClass("active");

  })


  $('.profile-col .profile-user li:first').addClass('active');
  $('.ptab-content:not(:first)').hide();
  $('.profile-col .profile-user li a').click(function(event) {
      event.preventDefault();
      var content = $(this).attr('href');
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
      $(content).show();
      $(content).siblings('.ptab-content').hide();
  });

 

  $(".select2-drop").select2({
      closeOnSelect: true,
      placeholder: $(".select2-drop").data('placeholder'),
      allowHtml: true,
      allowClear: true,
  });

  $(".currency-drop").select2({
    closeOnSelect: true,
    placeholder: $(".currency-drop").data('placeholder'),
    allowHtml: true,
    allowClear: true,
    dropdownParent: $('#currency-drop-wrap')
});

$(".plat-drop").select2({
    closeOnSelect: true,
    placeholder: $(".plat-drop").data('placeholder'),
    allowHtml: true,
    allowClear: true,
    dropdownParent: $('#plat-wrap')
});
 

  $('.accord').click(function() {
      $(this).find('.panel-collapse').show();
      $(this).siblings().find('.panel-collapse').hide();

  });

  $(".currency-div").click(function() {
      $(".currency-div").removeClass('active');
      $(this).addClass('active');
  });

  $(document).on('click', '.toggle-password', function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $(this).prev(".forgot-password");
      input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password')
  });

  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  

    $('#change-emial-Modal').on('shown.bs.modal', function (e) {
        var currheight = $("#progressbar").next().outerHeight();
        $("#msform").css("padding-bottom",currheight+"px");
    })

  $(".next").click(function() {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      var currheight = next_fs.outerHeight();
      $("#msform").css("padding-bottom",currheight+"px");

      //activate next step on progressbar using the index of next_fs
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({
          opacity: 0
      }, {
          step: function(now, mx) {
              //as the opacity of current_fs reduces to 0 - stored in "now"
              //1. scale current_fs down to 80%
              scale = 1 - (1 - now) * 0.2;
              //2. bring next_fs from the right(50%)
              left = (now * 50) + "%";
              //3. increase opacity of next_fs to 1 as it moves in
              opacity = 1 - now;
              current_fs.css({
                  'transform': 'scale(' + scale + ')'
              });
              next_fs.css({
                  'left': left,
                  'opacity': opacity
              });
          },
          duration: 800,
          complete: function() {
              current_fs.hide();
              animating = false;
          },
          //this comes from the custom easing plugin
          easing: 'easeInOutBack'
      });
  });

 




  var verificationCode = [];
  $(".verification-code input[type=number]").keyup(function(e) {

      // Get Input for Hidden Field
      $(".verification-code input[type=number]").each(function(i) {
          verificationCode[i] = $(".verification-code input[type=number]")[i].value;
          $('#verificationCode').val(Number(verificationCode.join('')));
          //console.log( $('#verificationCode').val() );
      });

      //console.log(event.key, event.which);

      if ($(this).val() > 0) {
          if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0) {
              $(this).parent().next().children().focus();
          }
      } else {
          if (event.key == 'Backspace') {
              $(this).parent().prev().children().focus();
          }
      }

  }); // keyup

  $('.verification-code input').on("paste", function(event, pastedValue) {
      console.log(event)
      $('#txt').val($content)
      console.log($content)
      //console.log(values)
  });

  // $editor.on('paste, keydown', function() {
  //     http: //jsfiddle.net/5bNx4/#run
  //         var $self = $(this);
  //     setTimeout(function() {
  //         var $content = $self.html();
  //         $clipboard.val($content);
  //     }, 100);
  // });

  
    $(document).on("click", ".icon-social-copy", function(e) {
        $(this).siblings( ".form-control" ).select();
        document.execCommand("copy");
    })

    // $('#table_id').DataTable();

  $('.latest-blogs-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      prevArrow: '<button class="PrevArrow rounded-slider-btn"><i class="icon-backward-slick"></i></button>',
      nextArrow: '<button class="NextArrow rounded-slider-btn"><i class="icon-forward-slick"></i></button>',
      responsive: [{
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
          }

      ]
  });

  

})