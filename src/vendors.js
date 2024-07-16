// vendors.js
import $ from 'jquery';
import 'animsition';
import 'bootstrap';
import 'select2';
import moment from 'moment';
import 'daterangepicker';
import 'slick-carousel';
import Parallax from 'parallax-js'; // Assurez-vous que ce soit le bon module
import 'magnific-popup';
import 'isotope-layout';
import swal from 'sweetalert';
import PerfectScrollbar from 'perfect-scrollbar';

$(document).ready(function () {
    $(".js-select2").each(function () {
        $(this).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(this).next('.dropDownSelect2')
        });
    });

    // Vérifier l'initialisation de parallax100
    // if (typeof $.fn.parallax100 === 'function') {
    //     $('.parallax100').parallax100();
    // } else {
    //     console.error('parallax100 is not a function');
    // }

    $('.gallery-lb').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
            mainClass: 'mfp-fade'
        });
    });

    $('.js-addwish-b2').on('click', function (e) {
        e.preventDefault();
    });

    $('.js-addwish-b2').each(function () {
        var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
        $(this).on('click', function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass('js-addedwish-b2');
            $(this).off('click');
        });
    });

    $('.js-addwish-detail').each(function () {
        var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

        $(this).on('click', function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass('js-addedwish-detail');
            $(this).off('click');
        });
    });

    $('.js-addcart-detail').each(function () {
        var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
        $(this).on('click', function () {
            swal(nameProduct, "is added to cart !", "success");
        });
    });

    $('.js-pscroll').each(function () {
        $(this).css('position', 'relative');
        $(this).css('overflow', 'hidden');
        var ps = new PerfectScrollbar(this, {
            wheelSpeed: 1,
            scrollingThreshold: 1000,
            wheelPropagation: false,
        });

        $(window).on('resize', function () {
            ps.update();
        });
    });
});
