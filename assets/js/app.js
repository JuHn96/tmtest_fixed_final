// Template Name: Orixon
// Template URL: https://techpedia.co.uk/template/orixon
// Description: Orixon - IT Solutions & Digital Agencies
// Version: 1.0.0
(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.menuShow();
      Init.intializeSlick();
      Init.dropdown();
      Init.formValidation();
      Init.contactForm();
      Init.videoPlay();
      Init.modalPopup();
    },
    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "300");
      });
    },
    preloader: function () {
      setTimeout(function () {
        $('#ctn-preloader').addClass('loaded');
        $('body').removeClass('no-scroll-y');

        if ($('#ctn-preloader').hasClass('loaded')) {
          $('#preloader').delay(1000).queue(function () {
            $(this).remove();
          });
        }
      }, 3000);
    },
    menuShow: function (e) {
      $('.menu-block').on('click', function () {
        var id = $(this).attr("id");
        $('.menu-block').removeClass('active');
        $(this).addClass('active');
        $('#menuDetail .menu-item').hide('slow');
        $('.' + id).show('slow');
      })
    },

    // ✅ 수정된 부분
    intializeSlick: function () {
      if (typeof $.fn.slick !== "undefined") {
        $(document).ready(function () {
          if ($(".gallerySlider").length) {
            $(".gallerySlider").not('.slick-initialized').slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 0,
              speed: 4000,
              pauseOnHover: false,
              pauseOnFocus: false,
              cssEase: "linear",
              arrows: false,
              swipe: false,
              infinite: true,
              responsive: [
                { breakpoint: 1199, settings: { slidesToShow: 4 } },
                { breakpoint: 992, settings: { slidesToShow: 3 } },
                { breakpoint: 492, settings: { slidesToShow: 2 } },
              ],
            });
          }

          if ($(".reviewSlider").length) {
            $(".reviewSlider").not('.slick-initialized').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 6000,
              speed: 1000,
              pauseOnHover: false,
              pauseOnFocus: false,
              arrows: false,
              dots: true,
              swipe: true,
              infinite: true,
            });
          }
        });
      }
    },

    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");
      selectedAll.forEach((selected) => {
        const optionsList = selected.querySelectorAll("div.wrapper-dropdown li");
        selected.addEventListener("click", () => {
          let arrow = selected.children[1];
          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(".wrapper-dropdown.active");
            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }
            handleDropdown(selected, arrow, true);
          }
        });
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          let arrow = selected.children[1];
          handleDropdown(selected, arrow, false);
        });
      }
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },
    videoPlay: function () {
      $(".video .play-btn").on("click", function () {
        $(".video .img-box").hide("slow");
        $(".video .video-box").show("slow");
      });
    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".booking-form form").length) {
        $(".booking-form form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self.closest("div").find('button[type="submit"]').attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h3 class='bg-primary text-white p-3 mt-3'>Email Sent Successfully</h3>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h3 class='bg-primary text-white p-3 mt-3'>There is an error</h3>";
              }
              $("#message").show("slow").slideDown("slow");
              setTimeout(function () {
                $("#message").slideUp("hide").hide("slow");
              }, 3000);
            },
          });
        } else {
          return false;
        }
      });
    },
    modalPopup: function () {
      $('.modal-popup').on('click', function () {
        $('.booking-popup').animate({ opacity: '1', }, 'slow', function () {
          $(this).css('z-index', 999);
        })
      })
      $('.close').on('click', function () {
        $('.booking-popup').animate({ opacity: '0', }, 'slow', function () {
          $(this).css('z-index', -10);
        })
      })
    }
  }
  Init.i();
})(window, document, jQuery);
