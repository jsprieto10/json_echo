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

this.ods = ods;

this.mapaCalor = function (item) {
	fetch('http://165.227.124.98/echo/json_echo/todos_comunas_ods.json')
		.then(function (res) {
			return res.json();
		}).then(function (data) {
			var opcs = [];
			data.forEach(function (dd) {
				var opc = dd.datos[item.text];
				opcs.push(opc/item.count);
			});
			return opcs;
		}).then(function (opacidades) {
			console.log(opacidades);
			d3.select("#statesvg").selectAll(".state")
				.style("fill", function (d) {
					random_value = true;
					return ods[item.text].color;
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
	})
