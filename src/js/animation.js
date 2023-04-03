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

	$(function(){
		$('.line_title').each(function(){
		   $(this).splitLines({ keepHtml:true});  
		});
	});

	/*Курсор*/
	$(function(){
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
				pinType: "fixed",
				pinReparent: true
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

		/*SUB одиночные*/		
		$(document).ready(function() {
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
		});
	};

	
	/*Курсор с притяжением*/
	$(function(){
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
	});
	var windowWidth = $(window).width();
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
		if($('.numb-anim').length) { 
			const items = document.querySelectorAll(".numb-anim");		
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
});


/*Плавный скролл*/
(function() { let isSafari = (function() { let ua = navigator.userAgent; if (/safari/gi.test(ua) && !/chrome/gi.test(ua)) return true; else return false; })(); if (!isSafari) { SmoothScroll ({ animationTime: /*!stop!*/500/*!/stop!*/, stepSize: /*!speed!*/100/*!/speed!*/, accelerationDelta: 40, accelerationMax: 2, keyboardSupport: true, arrowScroll: 50, pulseAlgorithm: true, pulseScale: 4, pulseNormalize: 1, fixedBackground : true, touchpadSupport: true }) } }());
