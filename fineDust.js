Module.register("fineDust",{
	// Default module config.
	defaults: {
		apiKey: "",
		updateInterval: 10 * 60 * 1000, // every 10 minutes
		animationSpeed: 1000,
	},
	getStyles: function() {
		return ["fineDust.css"];
	},
	// No translations
	getTranslations: function() {
		return false;
	},
	start: function() {
		Log.info("Starting module: " + this.name);
		this.apiBase = "http://api.airvisual.com/v2/nearest_city?key=";
		this.aqius = null;
		this.type = null;
		this.level = null;
		this.updateFineDust();
		this.scheduleUpdate();
	},
	getDom: function(){
		let wrapper = document.createElement("div");
		wrapper.className = "container";

		if (this.config.apiKey === "") {
			wrapper.innerHTML = "Please set the apiKey in the config for module: " + this.name;
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		let small = document.createElement("div");
		small.className = "normal medium fineDust";

		let fineDust = document.createElement("span");

		switch(this.type){
			case "p1" : fineDust.innerHTML = "Fine Dust: "; break;
			case "p2" : fineDust.innerHTML = "Ultrafine Dust: "; break;
			default: fineDust.innerHTML = "Air Pollution "; break;
		}
		small.appendChild(fineDust);

		let fineDustInfo = document.createElement("span");
		switch(this.level){
			case "Very Unhealthy :(": fineDustInfo.className = "veryBad"; break;
			case "Unhealthy": fineDustInfo.className = "bad"; break;
			case "Moderate": fineDustInfo.className = "notBad"; break;
			case "Good :)": fineDustInfo.className = "good"; break;
		}
		fineDustInfo.innerHTML = this.level;
		small.appendChild(fineDustInfo);

		wrapper.appendChild(small);
		return wrapper;
	},
	updateFineDust: async function(){
		if (this.config.apiKey === "") { //정확하게 같다
			Log.error("FineDust: APIKEY not set!");
			return;
		}
		const url = this.apiBase + this.config.apiKey;

		let data = await fetch(url)
			.then(result => result.status < 400 ? result : Promise.reject())
			.then(result => result.status === 200 ? result.json() : result)
			.catch(error => Log.error(error));

		if(!data){
			Log.error("failed to load data");
			return;
		}
		this.processFineDust(data);
	},
	scheduleUpdate: function(){
		const self = this;
		let loadDelay = this.config.updateInterval;

		setInterval(function(){
			self.updateFineDust();
		}, loadDelay);
	},
	processFineDust: function(data){
		this.aqius = data.data.current.pollution.aqius;
		this.type = data.data.current.pollution.mainus;

		let aqius = this.aqius;
		if(this.type === "p2"){
			if(aqius >= 76){
				this.level = "Very Unhealthy :(";
			}
			else if(aqius >= 36){
				this.level = "Unhealthy";
			}
			else if(aqius >= 16){
				this.level = "Moderate";
			}
			else{
				this.level = "Good :)";
			}
		}
		else if(this.type === "p1"){
			if(aqius >= 151){
				this.level = "Very Unhealthy :(";
			}
			else if(aqius >= 81){
				this.level = "Unhealthy";
			}
			else if(aqius >= 31){
				this.level = "Moderate";
			}
			else{
				this.level = "Good :)";
			}
		}
		else{
			this.level = "Good :)";
		}

		this.updateDom(this.config.animationSpeed);
	},
});
