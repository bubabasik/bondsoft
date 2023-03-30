
showModal = function($href, $class=""){
	$.fancybox.open({
		src  : $href,
		type : 'inline',
		closeExisting: false,
		opts : {
			baseClass: $class,
			animationEffect: false,
			animationDuration: 300,
			transitionEffect: false,
			transitionDuration: 300,
			touch: false,
			btnTpl: {
				close: '<button class="btn btn-nav modal__close" data-fancybox-close><svg class="ico ico-center"><use xlink:href="#close" /></svg></button>',
				smallBtn: '<button class="btn btn-nav modal__close" data-fancybox-close><svg class="ico ico-center"><use xlink:href="#close" /></svg></button>',
			},
			afterShow : function( instance, current ) {
				$(current.src).addClass('active');
			},
			beforeClose : function( instance, current ) {
				this.opts.animationEffect = true;
				$(current.src).removeClass('active');
			},
			afterClose : function( instance, current ) {
					// $('#modal_menu').removeClass('active mmenu__vis');
				}
			}
		});
}


scrollTo = function(target = '') {
	if(target && $(target).length) {
		var 
		$minus = $('.fline__inner').length ? $('.fline__inner').outerHeight() : 0;
		console.log($(target).offset().top, $minus);
		$('html, body').animate({scrollTop: $(target).offset().top - $minus}, 800);
	}
}

$(function(){

	Splitting();

	$('input[name="phone"]').inputmask({
		mask: "+7 9{1,30}",
		showMaskOnHover: false
	});


	$(document).on('click','.modalshow', function(e){
		e.preventDefault();
		var 
		$href = $(this).attr('href'),
		$class = $(this).attr('data-class');

		showModal($href, 'fancy-from-right ' + $class);
	})

	$(document).on('click', '.mmenu__btn', function(e){
		e.preventDefault();
		showModal($('#modal_menu'), 'fancy-mmenu');
	})


	// GO TO 
	var myHash = location.hash; 
	location.hash = ''; 
	if(myHash[1] != undefined){ 
		scrollTo(myHash[1]);
	};
	$(document).on('click', '.goTo', function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		scrollTo(target);
		return false;
	});

	$('.form__label').on('click', function(){
		$(this).siblings('input, textarea').focus();
	})
	$('.form__input, .form__textarea').on('change', function(){
		if($(this).val().length > 0) {
			$(this).addClass('valid');
		}else{
			$(this).removeClass('valid');
		}
	});


	if($('.review__slider').length) {
		$('.review__slider').slick({
			infinite: true,
			slidesToShow: 1,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev btn nav__item nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg><span class="btn-fill"></span></button>',
			nextArrow: '<button type="button" class="slick-next btn nav__item nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg><span class="btn-fill"></span></button>',
		})
	}

	if($('.top__sub--slider').length) {
		$('.top__sub--slider').slick({
			infinite: true,
			slidesToShow: 1,
			dots: false,
			arrows: false,
			draggable: false
		})
	}


});

