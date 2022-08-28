

function goTo(index) {
    var owl = $('.owl-1');
    owl.trigger('to.owl.carousel', [index, 500]);
}

function getQuestionIndex() {
    return parseInt($('.carousel-nav a.col.active').first().attr('data-num'));
}

function goToNext() {

    let i = getQuestionIndex();
    goTo(i + 1);
}
function goToPrev() {

    let i = getQuestionIndex();
    goTo(i - 1);
}

function buildPageBtns(start, end) {

    // ============= menu
    let navitems = document.getElementById('nav_tab');
    for (let i = start; i <= end; i++) {
        navitems.innerHTML = navitems.innerHTML + `<a href="#" class="col">Q${i}</a>`;
    }

    // ============= question body
    let qbdy = document.getElementById('question_body');
    for (let i = start; i <= end; i++) {
        qbdy.innerHTML = qbdy.innerHTML + `<div class="media-29101 d-md-flex w-100">
        <div class="img1">
          <img src="images/amnist/f${i}.png" alt="Image" class="img-fluid">
        </div>
        <div class="text"><h2><a href="#">Look at the images and decide which numbers you prefer（one or more choices）</a></h2>
          <div class="select_btns"></div>
        </div>
      </div>`;
    }


    // ============= selecting btns
    let its = document.getElementsByClassName('select_btns');
    for (let it of its) {
        for (let i = 0; i < 10; i++) {
            it.innerHTML += `<input id="t${i}" type="checkbox" data-toggle="toggle" data-on="${i}" data-off="${i}" data-onstyle="primary" data-offstyle="light" data-size="lg" data-style="fast" data-width="60">`;
        }
        it.outerHTML = it.outerHTML +
            `            <div style="text-align: center;margin-top: 20px;">
      <button style="margin: 20px;" type="button" class="btn btn-lg btn-outline-secondary" onclick="goToPrev();">PREV</button>
      <button style="margin: 20px;"type="button" class="btn btn-lg btn-outline-secondary" onclick="goToNext();">NEXT</button>
    </div>`;
    }
}

buildPageBtns(91, 100);

$(function () {
    var owl = $('.owl-1');
    owl.owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: false,
        items: 1,
        smartSpeed: 1000,
        autoplay: false,
        navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
    });

    var carousel_nav_a = $('.carousel-nav a');

    carousel_nav_a.each(function (slide_index) {
        var $this = $(this);
        $this.attr('data-num', slide_index);
        $this.click(function (e) {
            owl.trigger('to.owl.carousel', [slide_index, 1500]);
            e.preventDefault();
        })
    })

    owl.on('changed.owl.carousel', function (event) {
        carousel_nav_a.removeClass('active');
        $(".carousel-nav a[data-num=" + event.item.index + "]").addClass('active');
    })

});

