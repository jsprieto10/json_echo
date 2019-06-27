var ods = {
	"ods_1": "Fin de la pobreza",
	"ods_2": "Hambre cero",
	"ods_3": "Salud y bienestar",
	"ods_4": "Educación de calidad",
	"ods_5": "Igualdad de género",
	"ods_6": "Agua limpia y saneamiento",
	"ods_7": "Energía asequible y no contaminante",
	"ods_8": "Trabajo y crecimiento económico",
	"ods_9": "Industria, innovación e infraestructura",
	"ods_10":"Reducción de las desigualdades",
	"ods_11":"Ciudades y comunidades sostenible",
	"ods_12":"Producción y consumo responsables",
	"ods_13":"Acción por el clima",
	"ods_14":"Vida submarina",
	"ods_15":"Vida de ecosistemas terrestres",
	"ods_16":"Paz, justicia e instituciones sólidas",
	"ods_17":"Alianzas para lograr los objetivos"
};

function tooltipHtml(n, d) {	/* function to create html content string in tooltip div. */
	return "<h4>" + 'Comuna ' + n.split(')')[0] + ': ' + n.split(')')[1] + "</h4><table>" +
		"<tr><td>1. </td><td>" + (ods[d.first]) + "</td></tr>" +
		"<tr><td>2. </td><td>" + (ods[d.second]) + "</td></tr>" +
		"<tr><td>3. </td><td>" + (ods[d.third]) + "</td></tr>" +
		"</table>";
}



fetch('http://165.227.124.98:5000/odsComuna')
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
		console.log(sampleData);
		uStates.draw("#statesvg", sampleData, tooltipHtml);
		d3.select(self.frameElement).style("height", "600px");
	})
