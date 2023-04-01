
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

	mmenuHide = () => {
		// gsap.set(mmenuEl, {opacity: 0});
	}
	mmenuAnim = () => {
		/*const cont = document.querySelector('.mmenu__cont');
		const content = document.querySelector('.mmenu__content');


		const tl = gsap.timeline();

		tl.fromTo(cont, {
			x: "100%"
		}, {
			x: "0%",
			ease: "expo.out",
			duration: 1
		}, 0);

		tl.fromTo(content, {
			x: "-35%"
		}, {
			x: "0%",
			ease: "expo.out",
			duration: 1
		}, 0);
		tl.fromTo(content, {
			opacity: 0
		}, {
			opacity: 1,
			duration: .5
		}, .1);
*/
	}
	mmenuHide();

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