var fr = $("#french"),
	connection = $("#connection"),
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
			en: "arm",
			fr: "bras"
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
	total: 0
}

var app = new Vue ({
	el: "#app",

	data: data,

	ready: function(){
		fr.text(this._data.words[index].fr);
	},
	methods: {
		randomize: function(e){
			e.preventDefault();
			var wordCount = this._data.words.length;
			var i = Math.ceil(Math.random() * wordCount) - 1;

			fr.text(this._data.words[i].fr);
			connection.text(this._data.words[i].connection);

			this.getPhoto(this._data.words[i].en);
		},
		getPhoto: function(word){
			var word = word;
			var q = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + word + "&imgsz=xxlarge";
			var pronounceUrl = "http://translate.google.com/translate_tts?ie=UTF-8&q=" + word + "&tl=fr";
			var referrer = document.referrer;

			$.ajax({
			  url: q,
			  dataType: 'jsonp',
			  headers: {'Access-Control-Allow-Origin': referrer },
			  success: function(data){
			  	console.log(data);
			  	//$("#background").css('background', 'url("' + data.responseData.results[0].url + '") no-repeat center center fixed');
			    //$("#background").addClass("fadeIn");
			  }
			});
		},
		checkTranslation: function(e) {
			e.preventDefault();
			var english = this.english;
			if (this._data.words[index].en === english.toLowerCase()){
				this._data.color = "correct";
				this.correct++;
			} else {
				this._data.incorrectWords.push({fr: this._data.words[index].fr});
				this._data.color = "incorrect";
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
			fr.text(this._data.words[index].fr);
		},
		updateGuage: function() {
			var score = 1255 - (this.correct / this.total * 1255);
			$(".progress").css("stroke-dashoffset", score);
		}
	}
})