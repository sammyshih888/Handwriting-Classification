

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function save() {
    alert("Your data has been successfully submitted.");
    alert("If you have time and you can do the following questions.");
    data = JSON.parse(localStorage.getItem(tag));

    let ans = document.getElementsByTagName('input');
    let result_list = [];
    for (let k of ans) {
        if (k.checked == true) {
            console.log(k.dataset['qid'] + " ... " + k.dataset['on']);
            result_list.push([k.dataset['qid'], parseInt(k.dataset['on'])]);
            let val = parseInt(k.dataset['qid'].substring(1));
            if (data.q.indexOf(val) < 0) {
                data.q.push(val);
            }
        }
    }

    // upload to server

    // save to localstorage
    localStorage.setItem(tag, JSON.stringify(data));
    return result_list;
    // refresh
    //location.reload();
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function goTo(index) {
    var owl = $('.owl-1');
    owl.trigger('to.owl.carousel', [index, 500]);
    if (index == 0) {
        document.getElementById('submit_result').style.visibility = "hidden";
        document.getElementById('submit_result_text').style.visibility = "hidden";


    } else {

        document.getElementById('submit_result').style.visibility = "visible";
        document.getElementById('submit_result_text').style.visibility = "visible";
    }
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

function buildPageBtns(arr) {

    // ============= menu
    let navitems = document.getElementById('nav_tab');
    for (let i of arr) {
        navitems.innerHTML = navitems.innerHTML + `<a href="#" class="col">Q${i}</a>`;
    }

    // ============= question body
    let qbdy = document.getElementById('question_body');
    for (let i of arr) {
        qbdy.innerHTML = qbdy.innerHTML + `<div class="media-29101 d-md-flex w-100">
        <div class="img1">
          <img src="images/amnist/f${i}.png" alt="Image" class="img-fluid">
        </div>
        <div class="text"><h2><a href="#">Look at the images and decide which numbers you prefer（one or more choices）</a></h2>
          <div class="select_btns" data-qid="f${i}"></div>
        </div>
      </div>`;
    }


    // ============= selecting btns
    let its = document.getElementsByClassName('select_btns');
    for (let idx = 0; idx < its.length; idx++) {
        for (let i = 0; i < 10; i++) {
            its[idx].innerHTML += `<input type="checkbox" data-qid="${its[idx].dataset['qid']}" data-toggle="toggle" data-on="${i}" data-off="${i}" data-onstyle="primary" data-offstyle="light" data-size="lg" data-style="fast" data-width="60">`;
        }
        if (idx == its.length - 1) {
            its[idx].outerHTML = its[idx].outerHTML +
                `<div style="text-align: center;margin-top: 20px;">
            <button style="margin: 20px;" type="button" class="btn btn-lg btn-outline-secondary" onclick="goToPrev();">PREV</button>
            
            </div>`;
            continue;
        }
        its[idx].outerHTML = its[idx].outerHTML +
            `<div style="text-align: center;margin-top: 20px;">
        <button style="margin: 20px;" type="button" class="btn btn-lg btn-outline-secondary" onclick="goToPrev();">PREV</button>
        <button style="margin: 20px;"type="button" class="btn btn-lg btn-outline-secondary" onclick="goToNext();">NEXT</button>
        </div>`;
    }
}

// ==============
// 
var tag = 'ahdl';
if (localStorage.getItem(tag) == null) {
    // first time
    buildPageBtns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    data = {
        id: new Date().getTime(),
        q: []
    }
    localStorage.setItem(tag, JSON.stringify(data));
} else {
    data = JSON.parse(localStorage.getItem(tag));
    arr = []
    for (let i = 1; i <= 100; i++) {
        if (arr.length >= 10) {
            break;
        }
        if (data.q.indexOf(i) >= 0) {
            continue;
        }
        arr.push(i);
    }

    if (arr.length > 0) {
        buildPageBtns(arr);
    } else {
        document.getElementById('start_btn').innerHTML = ''
    }
}



$(function () {
    var owl = $('.owl-1');
    owl.owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: false,
        items: 1,
        smartSpeed: 700,
        autoplay: false,
        navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
    });

    var carousel_nav_a = $('.carousel-nav a');

    carousel_nav_a.each(function (slide_index) {
        var $this = $(this);
        $this.attr('data-num', slide_index);
        $this.click(function (e) {
            owl.trigger('to.owl.carousel', [slide_index, 700]);
            document.getElementById('submit_result').style.visibility = "visible";
            document.getElementById('submit_result_text').style.visibility = "visible";

            e.preventDefault();
        })
    })

    owl.on('changed.owl.carousel', function (event) {
        carousel_nav_a.removeClass('active');
        $(".carousel-nav a[data-num=" + event.item.index + "]").addClass('active');
    })

});

