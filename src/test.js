import $ from 'jquery';

class WaveText{
	constructor(selector, run = true){
		console.log("WaveText!", selector);
		
		this.letters = [];
		let _this = this;
		this.sineId = 0.085 * 20;
		this.phaseProgress = 0.1;
		
		$(selector).each( (i, el) => {
			
			let 
				$el = $(el),
				$output = $el.text().split('').reduce( (prevLetter, letter, letterI) => {
					
					let $outputEl = $(`<span class="letter-wrap">${letter}</span>`);
					
					_this.letters.push({
						mag:0,
						id:_this.letters.length,
						$el:$outputEl,
						maxMag:Math.random() * 38 + 8
					});
					
					return prevLetter.append($outputEl);
				}, $(`<div class="wrap"></div>`))
			;
			
			$el.empty().append($output);
		});
		
		if(run === true) this.run();
	}
	
	run(){
		console.log("WaveText.run...");
		
		this.runIntervalId = setInterval( () => {
			// console.log('run:'+this.sineId);
			
			this.letters.forEach( (obj, i) => {
				
				obj.mag = Math.min(obj.mag += 0.005, obj.maxMag);
				
				let 
					rad = this.sineId +i*this.phaseProgress,
					cos = Math.cos(rad),
					sin = Math.sin(rad)
					// opacity = 1 - .35*(1 + sin)
			;
				obj.$el.css({
					left:obj.mag *cos,
					top:1.5 * obj.mag *sin,
					opacity:1 - .45*(1 + sin) *(obj.mag / obj.maxMag)
				});
			});
		},3);
	}
}

var wave0 = new WaveText('.wave-text', true);

export default WaveText;