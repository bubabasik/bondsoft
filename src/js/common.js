
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
				close: '',
				smallBtn: '',
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

	$('.accord').on('click', function(e){
		e.preventDefault();
		var
		self = $(this),
		body = self.find('.accord--data'),
		inner = self.find('.accord--inner'),
		height = inner.outerHeight();

		if(body.hasClass('collapsing')) {
			return;
		}

		if(body.outerHeight() > 0) {
			body.css('height', inner.outerHeight() + 'px')
			setTimeout(function(){
				body.css('height', 0).addClass('collapsing');
			}, 10);
			setTimeout(function(){
				body.removeClass('collapsing');
			}, 500);
		}else{
			body.css('height', inner.outerHeight() + 'px').addClass('collapsing');
			setTimeout(function(){
				body.css('height', 'auto').removeClass('collapsing');
			}, 500);
		}
	})


	$(document).on('click', '.form__select--list li', function(e){
		e.preventDefault();
		$(this).closest('.form__select').find('.form__select--input').val($(this).text());
		$(this).closest('.form__select').removeClass('--active');
	})
	$(document).on('mouseenter', '.form__select--list li', function(e){
		e.preventDefault();
		$(this).removeClass('--dis').siblings('li').addClass('--dis');
	})
	$(document).on('mouseleave', '.form__select--list li', function(e){
		e.preventDefault();
		$('.form__select--list li').removeClass('--dis');
	})
	$(document).on('focus', '.form__select--input', function(){
		$(this).closest('.form__select').addClass('--active');
	})

	window.onclick = function(e) {

		if (!$('.form__select').is(e.target) 
			&& $('.form__select').has(e.target).length === 0 ) 
		{	
			$('.form__select').removeClass('--active');
		}
	}

	$('.form__file input[type="file"]').on('change', function(){
		var 
		self = $(this),
		name = self.closest('.form__file').find('.form__file--name'),
		file = self.val(),
		filename = file.replace(/.*\\/, "");

		if(filename === '') {
			name.text(name.attr('data-placeholder'));
		}else{
			name.text(filename);
		}

	});

	$('.form-order').on('submit', function(){
		var
		form = $(this),
		success = form.find('.form__success'),
		bottom = form.find('.form__bottom'),
		error = false;

		if(!error) {
			form.addClass('--success');
			form.find('input[type="text"],input[type="file"],textarea').val('');
			if(form.find('.form__file--name').length) {
				form.find('.form__file--name').each(function(){
					$(this).text($(this).attr('data-placeholder'));
				})
			}

			bottom.css('min-height', success.outerHeight() + 'px');

		}

		return false;
	})



	$(document).on('click', '.mmenu__show', function(e){
		e.preventDefault();

		$.fancybox.open({
			src  : '#modal-menu',
			type : 'inline',
			opts : {
				closeExisting: true,
				baseClass: 'fancy-mmenu',
				animationEffect: false,
				animationDuration: 1000,
				transitionEffect: false,
				transitionDuration: 1000,
				touch: false,
				btnTpl: {
					close: '',
					smallBtn: '',
				},
				afterShow : function( instance, current ) {
					$(current.src).addClass('active');
					mmenuAnim();
				},
				beforeClose : function( instance, current ) {
					this.opts.animationEffect = true;
					this.opts.transitionEffect = true;
					$(current.src).removeClass('active');
				},
				afterClose : function( instance, current ) {
					mmenuHide();
				}
			}
		});
	})
	$(document).on('mouseenter', '.mmenu__menu a', function(e){
		e.preventDefault();
		$(this).removeClass('--dis').closest('li').siblings('li').find('a').addClass('--dis');
	})
	$(document).on('mouseleave', '.mmenu__menu', function(e){
		e.preventDefault();
		$('.mmenu__menu a').removeClass('--dis');
	})


	if($('.review__slider').length) {
		$('.review__slider').slick({
			infinite: true,
			slidesToShow: 1,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev btn nav__item nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg><span class="btn-fill"></span></button>',
			nextArrow: '<button type="button" class="slick-next btn nav__item nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg><span class="btn-fill"></span></button>',
		})
	}

	if($('.slcase__slider').length) {
		$('.slcase__slider').slick({
			infinite: true,
			slidesToShow: 2,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev btn nav__item nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg><span class="btn-fill"></span></button>',
			nextArrow: '<button type="button" class="slick-next btn nav__item nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg><span class="btn-fill"></span></button>',
			responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			},
			]
		})
	}

	if($('.life__slider').length) {
		$('.life__slider').slick({
			infinite: true,
			slidesToShow: 2,
			dots: false,
			variableWidth: true,
			prevArrow: '<button type="button" class="slick-prev btn nav__item nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg><span class="btn-fill"></span></button>',
			nextArrow: '<button type="button" class="slick-next btn nav__item nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg><span class="btn-fill"></span></button>',
			responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					variableWidth: false
				}
			},
			]
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

