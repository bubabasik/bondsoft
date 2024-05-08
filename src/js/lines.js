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

(function(){
	for(const node of document.getElementsByClassName('line-splitting')) { 
		LineWrapper(node); 
	}
})();