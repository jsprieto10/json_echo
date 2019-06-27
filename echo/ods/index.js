var ods = {
	"ods_1": { "name": "Fin de la pobreza", "color": "rgb(231, 56, 65)" },
	"ods_2": { "name": "Hambre cero", "color": "rgb(224, 164, 60)" },
	"ods_3": { "name": "Salud y bienestar", "color": "rgb(78, 160, 73)" },
	"ods_4": { "name": "Educación de calidad", "color": "rgb(200, 46, 51)" },
	"ods_5": { "name": "Igualdad de género", "color": "rgb(236, 63, 51)" },
	"ods_6": { "name": "Agua limpia y saneamiento", "color": "rgb(77, 191, 234)" },
	"ods_7": { "name": "Energía asequible y no contaminante", "color": "rgb(248, 195, 70)" },
	"ods_8": { "name": "Trabajo y crecimiento económico", "color": "rgb(167, 40, 70)" },
	"ods_9": { "name": "Industria, innovación e infraestructura", "color": "rgb(239, 105, 55)" },
	"ods_10": { "name": "Reducción de las desigualdades", "color": "rgb(224, 58, 104)" },
	"ods_11": { "name": "Ciudades y comunidades sostenible", "color": "rgb(244, 157, 63)" },
	"ods_12": { "name": "Producción y consumo responsables", "color": "rgb(191, 138, 50)" },
	"ods_13": { "name": "Acción por el clima", "color": "rgb(67, 126, 74)" },
	"ods_14": { "name": "Vida submarina", "color": "rgb(54, 150, 215)" },
	"ods_15": { "name": "Vida de ecosistemas terrestres", "color": "rgb(93, 184, 72)" },
	"ods_16": { "name": "Paz, justicia e instituciones sólidas", "color": "rgb(35, 105, 157)" },
	"ods_17": { "name": "Alianzas para lograr los objetivos", "color": "rgb(21, 71, 108)" }
};

var comunas = {
	"C1": 1,
	"C2": 1,
	"C3": 1,
	"C4": 1,
	"C5": 1,
	"C6": 1,
	"C7": 1,
	"C8": 1,
	"C9": 1,
	"C10": 1,
	"C11": 1,
	"C12": 1,
	"C13": 1,
	"C14": 1,
	"C15": 1,
	"C16": 1
}

this.ods = ods;

this.mapaCalor = function (item) {
	fetch('http://165.227.124.98/echo/json_echo/todos_comunas_ods.json')
		.then(function (res) {
			return res.json();
		}).then(function (data) {
			var opcs = [];
			var mayor = 0;
			data.forEach(function (dd) {
				var opc = dd.datos[item.text];
				if (opc > mayor) {
					mayor = opc;
				}
			})
			data.forEach(function (dd) {
				var opc = dd.datos[item.text];
				opc = opc/mayor;
				var min = 0.0625;
				var plus = 1;
				while(opc > min){
					min = min * plus;
					plus ++;
				}
				comunas[dd.id] = min;
			});
			return comunas;
		}).then(function (opacidades) {
			console.log(opacidades);
			d3.select("#statesvg").selectAll(".state")
				.style("fill", function (d) {
					random_value = true;
					return opacidades[d.id]>=0.0625*2?ods[item.text].color:"rgb(237,237,237)";
				}).style('opacity', function(dd){
					return opacidades[dd.id]>=0.0625*3?opacidades[dd.id]:opacidades[dd.id]+0.0625;
				});
		});


};

function tooltipHtml(n, d) {	/* function to create html content string in tooltip div. */
	return "<h4>" + 'Comuna ' + n.split(')')[0] + ': ' + n.split(')')[1] + "</h4><table>" +
		"<tr><td>1. </td><td>" + (ods[d.first].name) + "</td></tr>" +
		"<tr><td>2. </td><td>" + (ods[d.second].name) + "</td></tr>" +
		"<tr><td>3. </td><td>" + (ods[d.third].name) + "</td></tr>" +
		"</table>";
}



fetch('http://165.227.124.98/echo/json_echo/comuna_vs_ods.json')
	.then(function (res) {
		return res.json();
	}).then(function (data) {
		var sampleData = {};	/* Sample random data. */
		["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15", "C16"]
			.forEach(function (dd) {
				var d = data.find(function (ele) {
					return ele.id == dd;
				});
				if (d.comuna != undefined && d.comuna != null && d.comuna != "") {
					var first = d.datos[0].name,
						second = d.datos[1].name,
						third = d.datos[2].name;
					sampleData[dd] = {
						first: first,
						second: second,
						third: third
					};
				}
			});
		//console.log(sampleData);
		uStates.draw("#statesvg", sampleData, tooltipHtml);
		d3.select(self.frameElement).style("height", "600px");

		setTimeout(function () {
			document.getElementById('nav').style.visibility = "visible";
			document.getElementById('loading').style.visibility = "hidden";
		}, 3000);
	})
