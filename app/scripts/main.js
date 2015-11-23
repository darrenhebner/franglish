var fr = $("#french"),
	connection = $("#connection");

var data = {
	words: [
		{
			en: "dog",
			fr: "chien",
			gender: "le chien",
			connection: "leon"
		},
		{
			en: "cat",
			fr: "chat",
			gender: "le chat",
			connection: "sadie"
		},
		{
			en: "fish",
			fr: "poisson",
			gender: "le poisson",
			connection: "Gimli Fish"
		},
		{
			en: "bird",
			fr: "oiseau",
			connection: "Grandma's Hummingbird"
		},
		{
			en: "adult",
			fr: "adulte",
			connection: "checking ID at liqur store"
		},
		{
			en: "afternoon",
			fr: "après midi",
			connection: "lazy afternoon"
		},
		{
			en: "air",
			fr: "air",
			connection: "fresh air"
		},
		{
			en: "airport",
			fr: "aéroport",
			connection: "waiting in the airport and that annoying girl who was talking on the phone"
		},
		{
			en: "alive",
			fr: "vivant",
			connection: "frankenstein 'It's aliiiiive!'"
		},
		{
			en: "animal",
			fr: "animal",
			connection: "wildlife"
		},
		{
			en: "apartment",
			fr: "appartement",
			connection: "dylan mcdonald singing barenaked ladies"
		},
		{
			en: "apple",
			fr: "pomme",
			connection: ""
		},
		{
			en: "April",
			fr: "Avril",
			connection: "Sk8trboi"
		},
		{
			en: "arm",
			fr: "bras",
			connection: "You need arms to wear a bra"
		},
		{
			en: "army",
			fr: "armée",
			connection: "Grandpa"
		},
		{
			en: "art",
			fr: "art",
			connection: "garfunkle the painter"
		},
		{
			en: "artist",
			fr: "artiste",
			connection: "fancy way of saying artist"
		},
		{
			en: "attack",
			fr: "attaque",
			connection: "Joan of arc yelling 'attaque' while going in to battle"
		},
		{
			en: "August",
			fr: "août",
			connection: "Augustus Gloop from willy wanka eating a bunch of oats"
		},
		{
			en: "Author",
			fr: "auteur",
			connection: "trying to pronounce kai's roomates name"
		},
		{
			en: "baby",
			fr: "bébé",
			connection: "A french bro talking to his girlfriend"
		}
	]
}

var app = new Vue ({
	el: "#app",

	data: data,

	ready: function(){
		this.randomize();
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
		}
	}
})