

function addCity(coords, title) {

    var city = cities.mapImages.create();
    if (stars.includes(title)) {
        city.disposeChildren()
        cityc = city.createChild(am4plugins_bullets.Star);
        cityc.radius = 12
        cityc.zIndex = 10
        city.zIndex = 11
        city.fill = chart.colors.getIndex(0).brighten(-0.5);
    }
    city.longitude = coords.x * MAP_SCALE + 2;
    city.latitude = coords.y * -MAP_SCALE - 1;
    city.tooltipText = title;
    city.connections = []
    city.events.on("hit", addroad_pick_city)
    return city;
}

function loadData() {



    connections = {}
    
    citiesD = [
        //Finland
        {"x": 4774, "y": -11592, "name": "Helsinki"},
        {"x": 4531, "y": -11584, "name": "Jyvaskyla"},
        {"x": 4774, "y": -11893, "name": "Varkaus"},
        {"x": 4543, "y": -11424, "name": "Lahti"},
        {"x": 4388, "y": -11424, "name": "Suur-Helsinki"},
        {"x": 5209, "y": -12770, "name": "Inari"},
        {"x": 4440, "y": -12400, "name": "Kingsland"},
        {"x": 4666, "y": -12260, "name": "Ylikiiminki"},
        {"x": 3785, "y": -11610, "name": "Pori"},
        {"x": 3785, "y": -11765, "name": "Vaasa"},
        {"x": 3876, "y": -10856, "name": "Super-Alko"},

        // Sweden

        {"x": 2718, "y": -11337, "name": "Vasteras Central"},
        {"x": 2807, "y": -11254, "name": "Vasteras South"},
        {"x": 2848, "y": -10984, "name": "Nya Asgard Central"},
        {"x": 2822, "y": -10839, "name": "Kalmar North"},
        {"x": 2822, "y": -10620, "name": "Kalmar Central"},
        {"x": 2724, "y": -10512, "name": "Karlskrona"},

        {"x": 2072, "y": -11314, "name": "Kongsvinger Kungsgatan"},
        {"x": 2533, "y": -11058, "name": "Nordfold"},
        {"x": 2622, "y": -10984, "name": "Nya Asgard West"},
        {"x": 2848, "y": -10984, "name": "Nya Asgard Central"},
        {"x": 3324, "y": -10852, "name": "New Lechia North"},

        {"x": 2072, "y": -11314, "name": "Kongsvinger Kungsgatan"},
        {"x": 2072, "y": -11224, "name": "Kongsvinger South"},
        {"x": 2208, "y": -10900, "name": "Karlstad"},

        //Terra Mariana (CTM)

        {"x": 3876, "y": -11032, "name": "Hiiumaa"},
        {"x": 4247, "y": -11235, "name": "Tallinn North"}, 
        {"x": 4265, "y": -11077, "name": "Tallinn Central"},
        {"x": 4616, "y": -11077, "name": "Tallinn East"},
        {"x": 4785, "y": -11077, "name": "Sillamae Central"},
        {"x": 5052, "y": -11077, "name": "Sillamae Castle"},
        {"x": 3876, "y": -10746, "name": "Arensburg"},
        {"x": 3980, "y": -10540, "name": "Siauliai North"},
        {"x": 3980, "y": -10402, "name": "Rietavas-Siauliai"},
        {"x": 3725, "y": -10402, "name": "Klaipeda"},
        {"x": 3656, "y": -10278, "name": "Krolewiec"},
        {"x": 4658, "y": -10684, "name": "Cesis"},
        {"x": 4658, "y": -10842, "name": "Valga"},
        {"x": 5104, "y": -10684, "name": "Pskov"},
        {"x": 3512, "y": -10439, "name": "Blaskog"},
        {"x": 3167, "y": -10691, "name": "New Lechia Central"},
        {"x": 2875, "y": -10902, "name": "Nya Asgard South"},
        {"x": 4483, "y": -10492, "name": "Jelgava"},
        {"x": 4237, "y": -10906, "name": "Parnu Beach"},
        {"x": 4439, "y": -10906, "name": "Dorbat Palace"},
        {"x": 4658, "y": -10906, "name": "Ex-Tartu"},
        {"x": 5016, "y": -10906, "name": "Pskov North"},

        //Dania
        {"x": 1415, "y": -10339, "name": "Kongsmark W"},
        {"x": 1515, "y": -10290, "name": "Kongsmark C"},
        {"x": 1389, "y": -10428, "name": "Esbjerg"},
        {"x": 1366, "y": -10680, "name": "Thisted"},
        {"x": 1196, "y": -10056, "name": "Bremen"},
        {"x": 1222, "y": -9802, "name": "Cologne"},
        {"x": 1412, "y": -9602, "name": "Bielefeld"},
        {"x": 1496, "y": -9175, "name": "Ulm"},
        {"x": 1381, "y": -8911, "name": "Zurich"},
        {"x": 2027, "y": -9208, "name": "Munich"},
        {"x": 2058, "y": -9681, "name": "Leipzig"},

        //Other
        
        {"x": 4000, "y": -15000, "name": "Jordetbyen"},
        {"x": 2758, "y": -14714, "name": "Pyramiden"},
        {"x": 2758, "y": -14552, "name": "Longyearbyen"},
    ]



connections = extra_connections
citiesD = citiesD.concat(extra_cities);


citiesL = {

}


stars = [
]
connectedTowns = new Set([]);
Object.values(connections).forEach(function (cities) {
    for (var i = 0; i < cities.length; i++) {
        connectedTowns.add(cities[i][0])
        connectedTowns.add(cities[i][1])
    }
});

citiesLAll = {}

for (var i = citiesD.length - 1; i >= 0; i--) {
    citiesLAll[citiesD[i].name] = { x: citiesD[i].x, y: citiesD[i].y, name: citiesD[i].name }
}

for (var i = citiesD.length - 1; i >= 0; i--) {
    if (connectedTowns.has(citiesD[i].name) && citiesL[citiesD[i].name] == undefined) {
        citiesL[citiesD[i].name] = addCity({ x: citiesD[i].x, y: citiesD[i].y }, citiesD[i].name)
    }
}


var connectedTownsArray = Array.from(connectedTowns)
for (var i = 0; i < connectedTownsArray.length; i++) {
    console.log(connectedTownsArray[i])
    $("#city_list").append($("<option></option>").val(connectedTownsArray[i]))
}

for (var i = citiesD.length - 1; i >= 0; i--) {
    $("#all_city_list").append($("<option></option>").val(citiesD[i].name))
}



lineSeries = {
}

lineAttrs = {
    "ftn": {
        name: "Finland (FTN)",
        stroke: "#0088ff",
        strokeDasharray: "0.1 0",
    },
    "ctm": {
        name: "Terra Mariana (CTM) - Packed Ice",
        stroke: "#d1c700",
        strokeDasharray: "0.5 0.2",
    },
    "ctmb": {
        name: "Terra Mariana (CTM) - Blue Ice",
        stroke: "#d1c700",
        strokeDasharray: "0.1 0",
    },
    "sweden": {
        name: "Sweden (VY)",
        stroke: "#248687",
        strokeDasharray: "0.5 0.2"
    },
    "haiti": {
        name: "Haiti",
        stroke: "#3449eb",
        strokeDasharray: "0.5 0.2",
    },

    "wip": {
        name: "WIP Ice Road",
        stroke: "#bfbfbf",
        strokeDasharray: "0.1 0.5"
    }
}

speedObj = {
    "ctm": 40,
    "ctmb": 60,
    "ftn": 60,
    "sweden": 40,
    "haiti": 40,
    "wip": -1,

}
// Add lines
window.updateMapLines = function () {

    Object.keys(lineSeries).forEach(function (k) {
        lineSeries[k].mapLines.each(function (item) {
            item.line = lineSeries[k].mapLines.template.line
        })

    });
}
for (var i = 0; i < Object.keys(lineAttrs).length; i++) {
    var k = Object.keys(lineAttrs)[i]

    $("#addroad-checkpoint-type").append($("<option></option>").text(lineAttrs[k].name).val(k))

    lineSeries[k] = chart.series.push(new am4maps.MapLineSeries());
    lineSeries[k].mapLines.template.shortestDistance = false;
    lineSeries[k].mapLines.template.line.strokeWidth = 2;
    lineSeries[k].mapLines.template.line.strokeOpacity = 1;
    lineSeries[k].mapLines.template.line.stroke = "#000000";
    lineSeries[k].mapLines.template.line.strokeDasharray = "1 0.5"
    lineSeries[k].mapLines.template.line.nonScalingStroke = true;
    lineSeries[k].zIndex = 10;
    for (var j = 0; j < Object.keys(lineAttrs[k]).length; j++) {
        var key = Object.keys(lineAttrs[Object.keys(lineAttrs)[i]])[j]
        var val = lineAttrs[Object.keys(lineAttrs)[i]][key]
        lineSeries[k].mapLines.template.line[key] = val
    }
}

for (var i = 0; i < Object.keys(lineAttrs).length; i++) {
    let key = Object.keys(lineAttrs)[i]
    let col = lineAttrs[key].stroke
    let name = lineAttrs[key].name
    let namee = $("<span></span>").text(name).css("background-color", col).css("padding", 4)
    let speede = $("<span></span>").text("Speed: " + speedObj[key] + " m/s")
    $("#legend").append(namee).append("<br/>").append(speede).append("<br/>")


}

}