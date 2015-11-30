var fr = $("#french"),
	index = 0;

var data = {
	words: [
		{
			en: "dog",
			fr: "chien"
		},
		{
			en: "cat",
			fr: "chat"
		},
		{
			en: "fish",
			fr: "poisson"
		},
		{
			en: "bird",
			fr: "oiseau"
		},
		{
			en: "adult",
			fr: "adulte"
		},
		{
			en: "afternoon",
			fr: "après midi"
		},
		{
			en: "air",
			fr: "air"
		},
		{
			en: "airport",
			fr: "aéroport"
		},
		{
			en: "alive",
			fr: "vivant"
		},
		{
			en: "animal",
			fr: "animal"
		},
		{
			en: "apartment",
			fr: "appartement"
		},
		{
			en: "apple",
			fr: "pomme"
		},
		{
			en: "april",
			fr: "avril"
		},
		{
			en: "army",
			fr: "armée"
		},
		{
			en: "art",
			fr: "art"
		},
		{
			en: "artist",
			fr: "artiste"
		},
		{
			en: "attack",
			fr: "attaque"
		},
		{
			en: "august",
			fr: "août",
		},
		{
			en: "author",
			fr: "auteur"
		},
		{
			en: "baby",
			fr: "bébé"
		}
	],
	incorrectWords: [],
	overlay: false,
	english: '',
	color: '',
	next: false,
	correct: 0,
	total: 0,
	showFrench: false
}

Vue.transition('roll', {
	afterLeave: function () {
	   fr.text(this._data.words[index].fr);
	   this._data.showFrench = true;
	}
});

var app = new Vue ({
	el: "#app",

	data: data,

	ready: function(){
		this.shuffleArray(this.words);
		fr.text(this._data.words[index].fr);
		this._data.showFrench = true;
	},
	methods: {
		shuffleArray: function(array) {
		  	var m = array.length, t, i;

			while (m) {

				i = Math.floor(Math.random() * m--);

				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}

			this.words = array;
		},
		checkTranslation: function(e) {
			e.preventDefault();
			var english = this.english;
			if (this._data.words[index].en === english.toLowerCase()){
				this._data.color = "correct";
				// moves word to back of deck
				this.words.push(this._data.words[index]);
				this.correct++;
			} else {
				// adds word to the list of incorrect words
				this._data.incorrectWords.push({fr: this._data.words[index].fr});
				this._data.color = "incorrect";
				// moves word three places back in the deck so the user gets another try
				this.words.splice(index + 3, 0, this._data.words[index]);
				this.english = this.words[index].en;
			}
			this._data.next = true;
			this.total++;
			this.updateGuage();
		},
		nextWord: function() {
			this.english = '';
			this._data.next = false;
			this._data.color = '';
			index++;
			this._data.showFrench = false;
		},
		updateGuage: function() {
			var score = 1255 - (this.correct / this.total * 1255);
			$(".progress").css("stroke-dashoffset", score);
		}
	}
})