function LineWrapper(node) {
	const paragraphContent = node.innerHTML.replace(/^\s+|\s+$/gm, '');
	const paragrapthWrappedWords = paragraphContent.replace(/(\S+)/g, '<span class="item"> $1 </span>');
	node.innerHTML = paragrapthWrappedWords;
	const wrappedWords = node.querySelectorAll('.item');
	const arrayOfWordNodes = Object.keys(wrappedWords).map(k => wrappedWords[k]);
	let currLineTop = 0;
	let finalHTML = ' ';

	arrayOfWordNodes.forEach(( node, index ) => {
		let nodeTop = node.offsetTop;
		let br = node.querySelectorAll('br');
		if(br.length) {
			if(arrayOfWordNodes[index + 1]) {
				nodeTop = arrayOfWordNodes[index + 1].offsetTop;
			}else{
				nodeTop = -1;
			}
		}
		finalHTML += ' '
		+ ( index !== 0 && (currLineTop !== nodeTop) ? '</span></span></span> ' : ' ' )
		+ ( index === 0 || (currLineTop !== nodeTop) ? '<span class="line"><span class="words"><span class="word"> ' : ' ' )
		+ node.innerHTML;
		currLineTop = nodeTop;
	});
	node.innerHTML = finalHTML.trim();
}
$(function(){

	let 
	windowWidth = $(window).width();

	Splitting();

	$(function(line_title){
		for(const node of document.getElementsByClassName('line-splitting')) { 
			LineWrapper(node); 
		}
	});


	/* dark mode */
	$(function(darkMode){
		const darks = gsap.utils.toArray('.dark-mode-trigger, .dark-mode-trigger-last');

		darks.forEach((box, i) => {
			let end_trigger, end_position;
			if($(box).hasClass('dark-mode-trigger-last')) {
				end_trigger = 'html';
				end_position = 'bottom top';
			}else{
				end_trigger = box;
				end_position = "bottom bottom-=30%";
			}
			
			ScrollTrigger.create({
				trigger: box,
				endTrigger: end_trigger,
				start: "top+=10% top",
				end: end_position,
				onToggle: self => {
					if(self.isActive) {
						$('body').addClass('dark-header');
						$(box).addClass('dark-mode');
					}else{
						$(box).removeClass('dark-mode');
						$('body').removeClass('dark-header');
					}
				},
			});
		});
	});

	/* dark mode header */
	$(function(darkMode){
		const darks = gsap.utils.toArray('.header-trigger');
		const height = $('.header').outerHeight();

		darks.forEach((box, i) => {			
			ScrollTrigger.create({
				trigger: box,
				endTrigger: box,
				start: "top-=10 top",
				end: "bottom top",
				onToggle: self => {
					if(self.isActive) {
						$('body').addClass('dark-header');
					}else{
						$('body').removeClass('dark-header');
					}
				},
			});
		});
	});

	/* btn hover */
	$(function(button){

		buttonHover = function(e) {
			let
			fill = e.currentTarget.querySelector('.btn-fill'),
			elem = e.currentTarget.getBoundingClientRect(),
			w = elem.width,
			h = elem.height,
			scale = event.type == 'mouseenter' ? 1 : 0;

			fill.style.transformOrigin = "".concat(Math.round((e.clientX - elem.left) / w * 100) - 50, "% ").concat(Math.round((e.clientY - elem.top) / h * 100) - 50, "%"),
			fill.style.transform = "scale(".concat(scale, ") translate3d(-50%, -50%, 0)");
		}

		const buttons = document.querySelectorAll('.btn, .btn-outer');

		buttons.forEach((btn) => {
			let fill = btn.querySelector('.btn-fill');
			if(fill) {
				btn.onmouseenter = btn.onmouseleave = buttonHover;
			}			
		})

	}) 

});



/*-----------------------------*/



$(document).ready(function() {

	/* Заголовок Услуги */
	$(function(){
		const original = document.querySelector('.modserv__capt-original');
		const front = document.querySelector('.modserv__capt-front');
		const back = document.querySelector('.modserv__capt-back');

		const sub = document.querySelector('.modserv__cont .mod__title');
		const title = document.querySelector('.modserv__title');

		if(!back) {return;}

		front.innerHTML = back.innerHTML = original.innerHTML;

		gsap.set(front, {clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",})
		gsap.set(back, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",})

		gsap.timeline({
			scrollTrigger: {
				trigger: ".modserv__cont",
				start: "top+=200px bottom"
			}
		})
		.from(sub, 0.6, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1 
		}) 
		.from(title, 0.6, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1 
		}, 0)  

		const tl = gsap.timeline({ 
			scrollTrigger: {
				trigger: ".modserv__cont",
				start: "top top+=150",
				end: "bottom top+=150",    
				anticipatePin: 1,
				pin: true,
				pinSpacing : true,
				scrub: .5,
				toggleActions: "play none reverse none",
				onUpdate: self  => {
					let h = self.progress * 100;
					gsap.set(back, {
						clipPath: "polygon(0 0, 100% 0, 100% " + 100 - h + "%, 0 " + 100 - h + "%)",
					})
					gsap.set(front, {
						clipPath: "polygon(0 0, 100% 0, 100% " + h + "%, 0 " + h + "%)",
					})
				}
			}
		})
	})

	/* О нас ЛОГО */
	$(function(){
		const img = document.querySelector('.abtop__img img');

		if(!img) {return;}

		const tl = gsap.timeline({ 
			scrollTrigger: {
				trigger: ".abtop__cont",
				start: "top-=100 top",
				end: "bottom+=250 botom+=250",    
				anticipatePin: 1,
				pin: true,
				pinSpacing : true,
				scrub: .5,
				toggleActions: "play none reverse none",
				onUpdate: self  => {
					let h = self.progress * 100;
					gsap.set(img, {
						opacity: 1 - self.progress
					})
				}
			}
		})
	})

	/* футер */

	$(function(){
		const footer = document.querySelector('.footer');
		const inner = footer.querySelector('.footer__inner');

		gsap.set(inner, {yPercent: -50})

		const tl = gsap.timeline({ 
			scrollTrigger: {
				trigger: footer,
				start: "top bottom",   
				end: "bottom bottom",   
				scrub: .5,
				toggleActions: "play none reverse none",
				onUpdate: self  => {
					let result = -50 + self.progress / 2 * 100;
					gsap.set(inner, {
						yPercent: result,
					})
				}
			}
		})
	})



	$(function(){
		$('.line_title').each(function(){
			$(this).splitLines({ keepHtml:true});  
		});
	});


	/*Курсор*/
	$(function(){


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
				self.removeClass('--active');
			}else{
				body.css('height', inner.outerHeight() + 'px').addClass('collapsing');
				setTimeout(function(){
					body.css('height', 'auto').removeClass('collapsing');
				}, 500);
				self.addClass('--active');
			}

			checkAccord(this);
		})

		function checkAccord(elem) {
			if(elem.classList.contains('--active')) {
				cursor.classList.add("minus");
				cursor.classList.remove("plus");
			}else{
				cursor.classList.add("plus");
				cursor.classList.remove("minus");
			}
		}

		var windowWidth = $(window).width();
		if((windowWidth >= 1000)){
			var cursor = document.querySelector(".new-cursor");
			var links = document.querySelectorAll("a");
			var initCursor = false;
			for (var i = 0; i < links.length; i++) {
				var selfLink = links[i];
				selfLink.addEventListener("mouseover", function() {
					cursor.classList.add("new-cursor--link");
				});
				selfLink.addEventListener("mouseout", function() {
					cursor.classList.remove("new-cursor--link");
				});
			} 
			/*Стрелка*/
			var linksArrow = document.querySelectorAll(".batch-block, .foot__link ");
			for (var i = 0; i < linksArrow.length; i++) {
				var arrow = linksArrow[i];
				arrow.addEventListener("mouseover", function() {
					cursor.classList.add("arrow");
				});
				arrow.addEventListener("mouseout", function() {
					cursor.classList.remove("arrow");
				});
			}
			var linksCircle = document.querySelectorAll(".abpoints__list");			
			for (var i = 0; i < linksCircle.length; i++) {
				var circle = linksCircle[i];	
				circle.addEventListener("mouseover", function() {
					cursor.classList.add("circle");
				});
				circle.addEventListener("mouseout", function() {
					cursor.classList.remove("circle");
				});
			}

			var linksAccord = document.querySelectorAll('.accord');
			linksAccord.forEach( link => {
				link.addEventListener("mouseover", function() {
					checkAccord(link);
				});
				link.addEventListener("mouseout", function() {
					cursor.classList.remove("plus", "minus");
				});
			})

			var linksArrowMin = document.querySelectorAll(".vacancy__item");
			for (var i = 0; i < linksArrowMin.length; i++) {
				var arrow = linksArrowMin[i];
				arrow.addEventListener("mouseover", function() {
					cursor.classList.add("arrow-min");
				});
				arrow.addEventListener("mouseout", function() {
					cursor.classList.remove("arrow-min");
				});
			}
			window.onmousemove = function(e) {
				var mouseX = e.clientX;
				var mouseY = e.clientY;
				if (!initCursor) {
					TweenLite.to(cursor, 0.3, {
						opacity: 1
					});
					initCursor = true;
				}
				TweenLite.to(cursor, 0.5, {
					top: mouseY + "px",
					left: mouseX + "px",
					stagger: 0.5
				});
			};
			window.onmouseout = function(e) {
				TweenLite.to(cursor, 0.3, {
			// opacity: 0
		});
				initCursor = false;
			};
		};
	});

if($('.first-screen-title').length) { 
	/*Первый экран*/
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})    
		.from(".first-screen-title .line span", 1.3, {
			yPercent: 200,
			ease: "power4.out",
			delay: 0.1,
			duration: 1.8,
			stagger:0.2
		},0.2)
		.to('.first-screen-title .line', 1.3, {
			webkitClipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			stagger:0.2
		}, 0.2)    
		.to(".head__row a, .head__mmenu", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2) 
		.from(".pin-but", 1, {
			autoAlpha: 0, 
			transform: "scale(0)",
			ease: Power4.easeOut
		},0.8)    
		/*Слайдер из текста*/
		const lines = document.querySelectorAll(".slide-text-first .split-item");
		const lines2 = document.querySelectorAll(".slide-text-second .split-item");  
		const lines3 = document.querySelectorAll(".slide-text-third .split-item");
		const lines4 = document.querySelectorAll(".slide-text-fourth .split-item");      
		let tl = gsap.timeline({repeat:-1, repeatDelay:-0.29});
		tl.from(lines, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			stagger:0.1
		},0.6)
		.to(lines, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:-0.1
		},2.5)
		.from(lines2, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},3)
		.to(lines2, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:-0.1
		},5)  
		.from(lines3, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},5.5)
		.to(lines3, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:-0.1
		},7.5)      
		.from(lines4, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},8)
		.to(lines4, 0.5, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:-0.1
		},10) 
	});

	/*Фиксированная кнопка на первом экране*/
	var windowWidth = $(window).width();
	if((windowWidth > 1200)){
		$(function(){
			ScrollTrigger.create({
				trigger: ".pin-but",
				start: "center center",
				endTrigger: '.lines-flip-one',
				end: 'center center',
				pin: true,
				pinSpacing: false,
				pinType: "transform",
				pinReparent: true,
				scrub:true
			});
		});
	}

	/* 2 экран */
	$(function(){
		gsap.registerPlugin(Flip);
		gsap.registerPlugin(ScrollTrigger);
		const firstHeading = document.querySelector('.lines-flip-one');
		const containerTwo = document.querySelector('.container-flip-one');
		const firstHeading2 = document.querySelector('.lines-flip-two');
		const containerTwo2 = document.querySelector('.container-flip-two');    
		const firstHeading3 = document.querySelector('.lines-flip-three');
		const containerTwo3 = document.querySelector('.container-flip-three');
		const word = document.querySelectorAll('.lines__item .word');
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".lines-flip-three",
				start: "bottom bottom"
			}
		});
		tl.from(".flip-line", 0.8, {
			scaleX:0, 
			transformOrigin:"left",
			ease: "Expo.easeOut",
			stagger:0.2
		})
		tl.from(word, 0.4, {
			yPercent: 130,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			stagger: { 
				from: "random", 
				amount: 0.5 
			},
			onComplete: myEnterFunc
		},0.4)        
		function myEnterFunc() {
			const state = Flip.getState(firstHeading, {
				props: "justify-content",
			})
			containerTwo.appendChild(firstHeading);
			Flip.from(state, {
				ease: "cubic-bezier(0.4, 0.1, 0, 1)",
				delay: "random(0.1, 0.3)",
				duration: "random(0.5, 1)"
			})
			const state2 = Flip.getState(firstHeading2, {
				props: "justify-content",
			})
			containerTwo2.appendChild(firstHeading2);
			Flip.from(state2, {
				ease: "cubic-bezier(0.4, 0.1, 0, 1)",
				delay: "random(0.1, 0.3)",
				duration: "random(0.5, 1)"
			})
			const state3 = Flip.getState(firstHeading3, {
				props: "justify-content",
			})
			containerTwo3.appendChild(firstHeading3);
			Flip.from(state3, {
				ease: "cubic-bezier(0.4, 0.1, 0, 1)",
				delay: "random(0.1, 0.3)",
				duration: "random(0.5, 1)"
			})
		}
	});

	/*H2 О нас*/
	$(document).ready(function() {
		let revealText = document.querySelectorAll(".subtitle-anim-about");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealText.forEach((element) => {
			const lines = element.querySelectorAll(".split-item");
			let h2 = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "bottom bottom"
				}
			});
			h2.set(element, { autoAlpha: 1 });
			h2.from(lines, 0.6, {
				yPercent: 100,
				ease: "cubic-bezier(.12,.46,.47,.99)",
				delay: 0.1,
				stagger:0.1
			})  
		});

		/*SUB возле H2 О нас*/
		let sub = gsap.timeline({
			scrollTrigger: {
				trigger: ".subtitle-anim-about",
				start: "bottom bottom"
			}
		});      
		sub.from(".subtitle-anim-about-before", 0.8, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1 
		}) 
	});


};


/*SUB одиночные*/		
$(document).ready(function() {
	if($('.sub-line_title').length) { 
		let revealText = document.querySelectorAll(".sub_title");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealText.forEach((element) => {
			const lines = element.querySelectorAll(".sub-line_title");
			let sub2 = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top+=200px bottom"
				}
			});
			sub2.from(lines, 0.6, {
				autoAlpha: 0,
				ease: "cubic-bezier(.12,.46,.47,.99)",
				delay: 0.1,
				stagger:0.1 
			})  
		});
	};
});	


/*Курсор с притяжением*/
if(($('.abpoints__list').length)){	

	var windowWidth = $(window).width();	

	$(function(){
		if(windowWidth >= 1200) {
			let cur = gsap.timeline({
				scrollTrigger: {
					trigger: ".abpoints__list",
					start: "top+=100px bottom"
				}
			});
			cur.from(".abpoints__circle", 1, {
				autoAlpha: 0, 
				transform: "scale(0)",
				ease: Power4.easeOut
			})
		}else{
			let items = document.querySelectorAll('.abpoints__item');
			items.forEach(item => {
				circle = item.querySelector('.abpoints__circle');
				if(circle) {
					let tl = gsap.timeline({
						scrollTrigger: {
							trigger: item,
							start: "center 80%"
						}
					});
					tl.from(circle, 1, {
						autoAlpha: 0, 
						transform: "scale(0)",
						ease: Power4.easeOut
					})
				}
			})
		}

	});

	if((windowWidth > 1200) & ($('.abpoints__list').length)){
		var mArea = document.querySelector('.abpoints__list');
		function parallaxIt(e, target, movement = 1){
			var boundingRect = mArea.getBoundingClientRect();
			var relX = e.pageX - boundingRect.left;
			var relY = e.pageY - boundingRect.top;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			gsap.to(target, {
				x: (relX - boundingRect.width / 1.75),
				y: (relY - boundingRect.height / 10.6 - scrollTop),
				ease: "power1",
				duration: 0.6
			});
		}
		function callParallax(e){
			parallaxIt(e, '.abpoints__circle');
		}
		mArea.addEventListener('mousemove', function(e){
			callParallax(e);
		});
		mArea.addEventListener('mouseleave', function(e){
			gsap.to('.abpoints__circle', {
				scale:1,
				x: 0,
				y: 0,
				ease: "power3",
				duration: 0.6
			});
		});
	}
}


/* Кейсы и мы в эфире */
$(document).ready(function() {
	if(($('.batch-block').length)){
		var windowWidth = $(window).width();
		if((windowWidth > 767)){
			ScrollTrigger.batch(".batch-block img", {
				onEnter: elements => {
					gsap.from(elements, 0.8, {
						scale: 1.4,
						ease: "easeOut",
						stagger: 0.2
					});
				},
				once: true
			});      

			ScrollTrigger.batch(".batch-block", {
				onEnter: elements => {
					gsap.from(elements, 0.6, {
						autoAlpha: 0,
						ease: "easeOut",
						delay: 0.1,
						stagger: 0.2
					});
				},
				once: true
			});

			ScrollTrigger.batch(".batch-block-info", {
				onEnter: elements => {
					gsap.from(elements, 0.8, {
						autoAlpha: 0,
						delay: 0.3,
						ease: "cubic-bezier(.12,.46,.47,.99)",
						stagger: 0.2
					});
				},
				once: true
			});   

			ScrollTrigger.batch(".batch-block-name", {
				onEnter: elements => {
					gsap.from(elements, 0.8, {
						autoAlpha: 0,
						delay: 0.4,
						ease: "cubic-bezier(.12,.46,.47,.99)",
						stagger: 0.2
					});
				},
				once: true
			});   
		};

		if((windowWidth < 766)){
			let revealYsl = document.querySelectorAll(".batch-container");
			gsap.registerPlugin(ScrollTrigger);
			let revealLines = revealYsl.forEach((element) => {
				const lines = element.querySelectorAll(".batch-block img");      
				let ysl = gsap.timeline({
					scrollTrigger: {
						trigger: element,
						start: "top bottom"
					}
				});
				ysl.from(lines, 0.6, {
					scale: 1.4,
					ease: "easeOut"
				})       
			});

			let revealYslmob = document.querySelectorAll(".batch-container");
			gsap.registerPlugin(ScrollTrigger);
			let revealLinesmob = revealYslmob.forEach((element) => {
				const lines3 = element.querySelectorAll(".batch-block-info");   
				const lines4 = element.querySelectorAll(".batch-block-name");      
				let ysl = gsap.timeline({
					scrollTrigger: {
						trigger: lines3,
						start: "top bottom"
					}
				});
				ysl.from(lines3, 0.8, {
					autoAlpha: 0,
					ease: "cubic-bezier(.12,.46,.47,.99)",
					stagger: 0.1
				})  
				ysl.from(lines4, 0.8, {
					autoAlpha: 0,
					ease: "cubic-bezier(.12,.46,.47,.99)",
					stagger: 0.1
				},0.2)              
			});			    
		};

		/* Hover изображений */ 
		$(function(){
			var wrappers = document.querySelectorAll('.batch-block');
			var masks = document.querySelectorAll('.batch-block img');
			wrappers.forEach((value, i) => {
				let tl = gsap.timeline({paused: true});
				tl.to(value.querySelector(".batch-block img") ,{scale: 1.1,ease: "easeOut", duration:0.6});
				$(value).hover(function() {
					tl.restart();
				},
				function() {
					tl.reverse();
				});
			});
		});
	};
});

/* Услуги */ 
$(document).ready(function() {
	if($('.serv-anim-block').length) { 
		var windowWidth = $(window).width();
		if((windowWidth > 767)){
			let revealYsl = document.querySelectorAll(".serv-anim-block");
			gsap.registerPlugin(ScrollTrigger);
			let revealLines = revealYsl.forEach((element) => {
				const lines = element.querySelectorAll(".serv__item--title.line_title .split-item");
				const lines2 = element.querySelectorAll(".serv__item--data .split-item");
				const lines3 = element.querySelectorAll(".serv__item--btns a");   
				const lines4 = element.querySelectorAll(".serv__item--icon");      
				let ysl = gsap.timeline({
					scrollTrigger: {
						trigger: element,
						start: "top+=100px bottom"
					}
				});
				ysl.from(lines2, 0.5, {
					autoAlpha: 0,  
					yPercent: 80,
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
					delay: 0.1,
					stagger:0.2
				},0.1) 
				ysl.from(lines3, 0.3, {
					autoAlpha: 0,  
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
					delay: 0.1,
					stagger:0.2
				},0.1)     
				ysl.from(lines4, 0.4, {
					autoAlpha: 0,  
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
					delay: 0.1,
					stagger:0.2
				},0.1)  
			});
		};		
		/* Мобильная версия */ 
		if((windowWidth < 766)){
			$(function(){
				let revealYsl = document.querySelectorAll(".serv-anim-block");
				let revealLines = revealYsl.forEach((element) => {  
					const lines4 = element.querySelectorAll(".serv__item--icon");      
					let ysl = gsap.timeline({
						scrollTrigger: {
							trigger: lines4,
							start: "top bottom"
						}
					});
					ysl.from(lines4, 0.4, {
						autoAlpha: 0,  
						ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
						delay: 0.1,
						stagger:0.2
					},0.1)			
				});
			});
			$(function(){
				let revealYsl = document.querySelectorAll(".serv-anim-block");
				let revealLines = revealYsl.forEach((element) => {  
					const lines2 = element.querySelectorAll(".serv__item--data .split-item");    
					let ysl = gsap.timeline({
						scrollTrigger: {
							trigger: lines2,
							start: "top bottom"
						}
					});
					ysl.from(lines2, 0.5, {
						autoAlpha: 0,  
						yPercent: 80,
						ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
						delay: 0.1,
						stagger:0.2
					},0.1) 		
				});
			});
			$(function(){
				let revealYsl = document.querySelectorAll(".serv-anim-block");
				let revealLines = revealYsl.forEach((element) => {  
					const lines3 = element.querySelectorAll(".serv__item--btns a");    
					let ysl = gsap.timeline({
						scrollTrigger: {
							trigger: lines3,
							start: "top bottom"
						}
					});
					ysl.from(lines3, 0.3, {
						autoAlpha: 0,  
						ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
						delay: 0.1,
						stagger:0.2
					},0.1) 	
				});
			});
		};
	};
});


/* Анимаия цифр*/ 
$(function(){	

	const pageNums = document.querySelectorAll('.pagetop__attr--num');
	if(pageNums) {
		pageNums.forEach((number) => {
			number.innerHTML = '<div class="pagetop__attr--number">'+number.innerHTML+'</div>'+'<div class="pagetop__attr--number --animate-num">'+number.innerHTML+'</div>';
		})
	}

	if($('.numb-anim').length) { 
		const items = document.querySelectorAll(".--animate-num .numb-anim");		
		let revealLines = items.forEach((elem) => {
			let numb = gsap.timeline({
				scrollTrigger: {
					trigger: elem,
					start: "top+=100px bottom"
				}
			});
			numb.from(elem, {
				textContent: 0,
				duration: 2,
				ease: "easeOut",
				snap: { textContent: 1 },
				stagger: {
					each: 1.0,
					onUpdate: function() {
						this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
					},
				}
			});
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
			}
		});
	};
});


/*Первые экраны для остальных страниц*/
$(function(){
	let tt = gsap.timeline();
	tt.to(".head__row a, .head__mmenu", 0.6, {
		autoAlpha: 1,
		ease: "cubic-bezier(.12,.46,.47,.99)",
		delay: 0.1,
		stagger:0.1
	},0.2) 
});


/*Header*/
$(function(){
	const header = document.querySelector("header");
	let lastScroll = 0;
	const throttle = (func, time = 100) => {
		let lastTime = 0;
		return () => {
			const now = new Date();
			if (now - lastTime >= time) {
				func();
				time = now;
			}
		};
	};
	const validateHeader = () => {
		const windowY = window.scrollY;
		const windowH = window.innerHeight;
		if (windowY > windowH) {
			header.classList.add("is-fixed");
			if (windowY > windowH + 50) {
				header.classList.add("can-animate");
				if (windowY < lastScroll) {
					header.classList.add("scroll-up");
				} else {
					header.classList.remove("scroll-up");
				}
			} else {
				header.classList.remove("scroll-up");
			}
		} else {
			header.classList.remove("is-fixed", "can-animate");
		}
		lastScroll = windowY;
	};
	window.addEventListener("scroll", throttle(validateHeader, 100));
});

/* параллакс фото */
$(function(){
	const img = document.querySelector('.pagetop__image img');

	if(!img) {return;}

	gsap.registerPlugin(ScrollTrigger);

	gsap.set(img, {
		height: '125%',
		y: '-25%'
	});

	let parallax = gsap.timeline()
	.to(img, {
		scrollTrigger:{
			trigger: '.pagetop__image',
			start: 'top bottom',
			end: 'bottom top',
			scrub: .5,
			onUpdate: self  => {
				let h = self.progress / 4 * 100;
				gsap.set(img, {
					transform: 'translateY(calc(-25% + '+h+'%))'
				})
			}
		}
	})
})

/* логотипы */
$(function(){ 
	const lines = document.querySelectorAll('.trust__line');

	if(!lines) {return;}

	if(windowWidth >= 992) {
		lines.forEach( line => {
			let item = '<div class="marquee__inner">'+line.innerHTML+'</div>';
			line.innerHTML = item + item + item;
		});
	}		

	if($('.text-to-left-side').length) {
		$(window).on("load resize scroll", function() {
			if(windowWidth >= 1200) {
				$(".text-to-left-side").each(function() {
					var windowTop = $(window).scrollTop();
					var elementTop = $(this).offset().top;
					var leftPosition = windowTop * 1600 / elementTop;
					$(this)
					.find(".marquee__inner")
					.css({ right: leftPosition });
				});  
			}
		}); 
	}
}); 

/*Появление слайдов на стр. Карьера*/
$(function(){
	if($('.life__slider').length) { 
		let revealText = document.querySelectorAll(".life__slider");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealText.forEach((element) => {
			const lines = element.querySelectorAll(".overlay");
			let ov = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top+=200px bottom"
				}
			});
			ov.to(lines, {
				duration: 0.8,
				ease: "epower4.out",
				webkitClipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
				clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
				stagger:0.2              
			})
		});
	}
})

/*Одиночные заголовки внутри страниц */
$(function(){
	let revealYsl = document.querySelectorAll(".subtitle-anim-dop-title");
	gsap.registerPlugin(ScrollTrigger);
	let revealLines = revealYsl.forEach((element) => {
		const lines2 = element.querySelectorAll(".split-item");
		let ysl = gsap.timeline({
			scrollTrigger: {
				trigger: element,
				start: "top+=100px bottom"
			}
		});
		ysl.from(lines2, 0.6, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		}) 
	});
});	

/*Одиночные кнопки*/
$(function(){
	let revealYsl = document.querySelectorAll(".btn-anim");
	gsap.registerPlugin(ScrollTrigger);
	let revealLines = revealYsl.forEach((element) => {
		const btn = element.querySelectorAll(".btn");
		let ysl = gsap.timeline({
			scrollTrigger: {
				trigger: element,
				start: "top+=100px bottom"
			}
		});
		ysl.from(btn, 0.3, {
			autoAlpha: 0,  
			ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
			delay: 0.1,
			stagger:0.1
		},0.1) 
	});
});

/*Стр Карьера*/	
if($('.section_career').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.to(".pagetop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.from(".subtitle-anim-h2 .split-item", 0.6, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
	});   

	$(function(){
		let revealYsl = document.querySelectorAll(".abpoints__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines = element.querySelectorAll(".abpoints__item--top");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines, 0.3, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.1) 				
		});
	});  

	$(function(){
		let revealYsl = document.querySelectorAll(".abpoints__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll(".abpoints__item--text .split-item");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				yPercent: 80,
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.1) 
		});
	}); 		

	/*Блок Вакансии - пункты*/
	$(function(){
		let revealYsl = document.querySelectorAll(".vacancy__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines = element.querySelectorAll("span");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top+=100px bottom"
				}
			});
			ysl.from(lines, 0.3, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 				
		});
	});  
}


/*Стр Кейсы*/	
if($('.section_case').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.to(".pagetop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.from(".subtitle-anim-h2 .split-item", 0.6, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.to(".pagetop__sub", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.4)			
	});  
};

/* Кнопки-фильтры */
if($('.filter-anim').length) { 
	$(function(){
		let revealYsl = document.querySelectorAll(".filter-anim");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines3 = element.querySelectorAll("a");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top+=100px bottom"
				}
			});
			ysl.to(lines3, 0.3, {
				autoAlpha: 1,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	});	
};

/*Отдельная страница кейса*/	
if($('.section-one-case').length) { 
	$(function(){
		$(function(){
			let tt = gsap.timeline();
			tt.to(".preloader", {
				autoAlpha: 0,
				ease: "epower4.out",
				duration: 0.2,
				onComplete: function() {
					$('.preloader').addClass('onComplete');
				}
			})
			tt.to(".pagetop__prev .link", 0.6, {
				autoAlpha: 1,
				ease: "cubic-bezier(.12,.46,.47,.99)",
				delay: 0.1,
				stagger:0.1
			},0.2)
			tt.from(".subtitle-anim-h2 .split-item", 0.6, {
				yPercent: 100,
				ease: "cubic-bezier(.12,.46,.47,.99)",
				delay: 0.1,
				stagger:0.1
			},0.2)			
			tt.from(".pagetop__term--text .split-item", 0.5, {
				autoAlpha: 0,  
				yPercent: 80,
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.2) 
			/*	tt.from(".pagetop__attr--item:last-child", 1, {
					autoAlpha: 0, 
					transform: "scale(0)",
					ease: Power4.easeOut
				})	*/
				tt.to(".pagetop__term--date", 0.6, {
					autoAlpha: 1,
					ease: "cubic-bezier(.12,.46,.47,.99)",
					delay: 0.1,
					stagger:0.1
				},0.4)
				tt.from(".pagetop__attr--num", 0.3, {
					autoAlpha: 0,  
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
					delay: 0.1
				},0.4) 	
				tt.from(".pagetop__attr--text", 0.5, {
					autoAlpha: 0,  
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
					delay: 0.1
				},0.5) 
			});  
	});


	$(function(){
		let revealYsl = document.querySelectorAll(".attr__item--data");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};


/*Стр. Услуги*/	
if($('.service-anim').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.to(".pagetop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.from(".subtitle-anim-h2 .split-item", 0.6, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
	});  
};

/*Стр. Контекстная реклама для B2B*/	
if($('.service-item-anim').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.to(".pagetop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.from(".subtitle-anim-h2 .split-item", 0.6, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)		
		tt.from(".pagetop__descr--text .split-item", 0.5, {
			autoAlpha: 0,  
			yPercent: 80,
			ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
			delay: 0.1,
			stagger:0.2
		},0.3) 	
		tt.to(".pagetop__descr--btn a", 0.3, {
			autoAlpha: 1,  
			ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
			delay: 0.1,
			stagger:0.1
		},0.4)
	});  

	$(function(){
		let revealYsl = document.querySelectorAll(".plus__item accord");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};


/* Блок О нас*/	
if($('.aboute-list-anim').length) { 
	$(function(){
		let revealYsl = document.querySelectorAll(".abpoints__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines = element.querySelectorAll(".abpoints__item--top");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines, 0.3, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.1) 				
		});
	});  

	$(function(){
		let revealYsl = document.querySelectorAll(".abpoints__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll(".abpoints__item--text .split-item");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				yPercent: 80,
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.1) 
		});
	}); 		
};


/* Блок Отзывы клиентов*/	
if($('.review__slide').length) {
	$(function(){
		let revealYsl = document.querySelectorAll(".review__slide");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};

/* Блок Преимущества */
if($('.section_plus').length) {
	$(function(){
		let revealYsl = document.querySelectorAll(".section_plus");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll(".plus__item div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};

/* Блок Отвечаем на вопросы*/	
if($('.faq__data').length) {
	$(function(){
		let revealYsl = document.querySelectorAll(".faq__data");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const faq = element.querySelectorAll(".faq__item.accord");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(faq, 0.5, {
				autoAlpha: 0,  
				yPercent: 100,
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};

/*Стр. Мы в эфире*/	
if($('.air-list-anim').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.to(".pagetop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.from(".subtitle-anim-h2 .split-item", 0.6, {
			yPercent: 100,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.to(".pagetop__sub", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.4)	
	});  
};

/*Стр. Мы в эфире - item*/	
if($('.air-item-anim').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.to(".pagetop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.from(".air-item-anim h1", 1.2, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.to(".pagetop__date", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.4)	
	});  

	$(function(){
		let revealText = document.querySelectorAll(".subtitle-anim-about");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealText.forEach((element) => {
			const lines = element.querySelectorAll(".split-item");
			let h2 = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "bottom bottom"
				}
			});
			h2.set(element, { autoAlpha: 1 });
			h2.from(lines, 0.6, {
				yPercent: 100,
				ease: "cubic-bezier(.12,.46,.47,.99)",
				delay: 0.1,
				stagger:0.1
			})  
		});

		let sub = gsap.timeline({
			scrollTrigger: {
				trigger: ".subtitle-anim-about",
				start: "bottom bottom"
			}
		});      
		sub.from(".subtitle-anim-about-before", 0.8, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1 
		}) 
	});
};

/* Форма */
$(function(){
	const list = document.querySelectorAll('.form');
	if(!list.length) {return;}

	list.forEach( form => {
		let mainTimeline = gsap.timeline();
		let pause = 0;
		let outers = form.querySelectorAll('.form__outer:not(.form__bottom)');

		outers.forEach( (outer, index) => {
			let tl = gsap.timeline();

			let inp = outer.querySelector('.form__inp, .form__select, .form__info, .form__file, .form__subm--btn');
			let line = outer.querySelector('.form__line');
			let agree = outer.querySelector('.form__subm--agree');

			if(inp) {
				tl.from(inp, {
					autoAlpha: 0,  
					duration: .6,
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				}) 
			}
			if(line) {
				tl.from(line, {
					duration: .6,
					width: 0
				}, '-=.4') 
			}
			if(agree) {
				tl.from(agree, {
					autoAlpha: 0,  
					duration: .6,
					ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				}, '-=.4') 
			}

			pause += .3;
			mainTimeline.add(tl, pause);
		});

		let subms = form.querySelectorAll('.form__subm--btn, .form__subm--agree');
		subms.forEach( (item, index) => {
			let tl = gsap.timeline();
			tl.from(item, {
				autoAlpha: 0,  
				duration: .8,
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
			}) 
			pause += .3;
			mainTimeline.add(tl, pause);
		})

		ScrollTrigger.create({  
			trigger: form,
			start: "top bottom",
			animation: mainTimeline,
		}); 

	})
})
if($('.form--').length) {
	$(function(){
		let revealYsl = document.querySelectorAll(".form");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top bottom"
				}
			});
			ysl.from(lines2, 0.2, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};

/* Видео */
if($('.airvideo__cont').length) {
	$(function(){
		let revealYsl = document.querySelectorAll(".airvideo__cont");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll(".airvideo__video");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};	


/* О нас - цифры */
if($('.abnum').length) {
	$(function(){
		let revealYsl = document.querySelectorAll(".abnum__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines = element.querySelectorAll(".abnum__num");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines, 0.3, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.1) 				
		});
	});  

	$(function(){
		let revealYsl = document.querySelectorAll(".abnum__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll(".abnum__name .split-item");
			const lines3 = element.querySelectorAll(".abnum__text");			
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				yPercent: 80,
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.1) 
			ysl.from(lines3, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.2
			},0.2) 					
		});
	}); 		

};	

/* 404 */	
if($('.section_nf').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})	
	}); 	
};

/* bid */	
if($('.section_bid').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.from(".section_bid-page h1", 1.2, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)
		tt.to(".bid-anim-text", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.4)
	});
};		

/* О нас */	
if($('.dark-header').length) { 
	$(function(){
		let tt = gsap.timeline();
		tt.to(".preloader", {
			autoAlpha: 0,
			ease: "epower4.out",
			duration: 0.2,
			onComplete: function() {
				$('.preloader').addClass('onComplete');
			}
		})
		tt.from(".abtop__img, .abtop__preview", 0.6, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.2)	
		tt.to(".abtop__prev .link", 0.6, {
			autoAlpha: 1,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.4)				
		tt.from(".abtop__tags span", 0.6, {
			autoAlpha: 0,
			ease: "cubic-bezier(.12,.46,.47,.99)",
			delay: 0.1,
			stagger:0.1
		},0.4)	
	}); 	

	$(function(){
		let revealYsl = document.querySelectorAll(".ablist__item");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};	

if($('.abquote__row').length) { 
	$(function(){
		let revealYsl = document.querySelectorAll(".abquote__row");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("div");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};	

/* 404 */	
if($('.nf__cont').length) { 
	$(function(){
		let revealYsl = document.querySelectorAll(".nf__cont");
		gsap.registerPlugin(ScrollTrigger);
		let revealLines = revealYsl.forEach((element) => {
			const lines2 = element.querySelectorAll("span");
			let ysl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "center bottom"
				}
			});
			ysl.from(lines2, 0.5, {
				autoAlpha: 0,  
				ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
				delay: 0.1,
				stagger:0.1
			},0.1) 
		});
	}); 
};
});


/*Плавный скролл*/
(function() { let isSafari = (function() { let ua = navigator.userAgent; if (/safari/gi.test(ua) && !/chrome/gi.test(ua)) return true; else return false; })(); if (!isSafari) { SmoothScroll ({ animationTime: /*!stop!*/500/*!/stop!*/, stepSize: /*!speed!*/100/*!/speed!*/, accelerationDelta: 40, accelerationMax: 2, keyboardSupport: true, arrowScroll: 50, pulseAlgorithm: true, pulseScale: 4, pulseNormalize: 1, fixedBackground : true, touchpadSupport: true }) } }());
