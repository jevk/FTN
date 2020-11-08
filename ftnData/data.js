

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
        {"x": 4774, "y": -11592, "name": "Central Helsinki"},
        {"x": 4531, "y": -11584, "name": "Southern Jyväskylä"},
        {"x": 4774, "y": -11893, "name": "Varkaus"},
        {"x": 4543, "y": -11424, "name": "Lahti"},
        {"x": 4388, "y": -11424, "name": "Suur-Helsinki"},
        {"x": 5209, "y": -12770, "name": "Inari"},
        {"x": 4440, "y": -12400, "name": "Kingsland"},
        {"x": 4440, "y": -12088, "name": "Northern Jyväskylä"},
        {"x": 4666, "y": -12260, "name": "Ylikiiminki"},
        {"x": 3785, "y": -11610, "name": "Pori"},
        {"x": 3785, "y": -11765, "name": "Vaasa"},
        {"x": 3876, "y": -10856, "name": "Super-Alko"},
        {"x": 3785, "y": -12204, "name": "Haaparanta"},
        {"x": 4774, "y": -11333, "name": "Southern Helsinki"},
        {"x": 4990, "y": -11646, "name": "Kekkoslinna"},
        {"x": 4990, "y": -12316, "name": "Posio"},
        {"x": 5590, "y": -12000, "name": "Ivangorod"},
        {"x": 5590, "y": -12300, "name": "Kouta"},
        {"x": 4246, "y": -11244, "name": "Northern Tallinn"},
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
    "blue": {
        name: "Blue Line",
        stroke: "#5E61CF",
        strokeDasharray: "0.2 0",
    },
    "green": {
        name: "Green Line",
        stroke: "#17A800",
        strokeDasharray: "0.2 0",
    },
    "red": {
        name: "Red Line",
        stroke: "#C91D11",
        strokeDasharray: "0.2 0",
    },
    "pink": {
        name: "Pink Line",
        stroke: "#F891F2",
        strokeDasharray: "0.2 0",
    },
    "yellow": {
        name: "Yellow Line",
        stroke: "#F0ED31",
        strokeDasharray: "0.2 0",
    },
    "wip": {
        name: "WIP Ice Road",
        stroke: "#766146",
        strokeDasharray: "0.2 0.5"
    }
}

speedObj = {
    
    "blue": 60,
    "red": 60,
    "green": 60,
    "yellow": 60,
    "pink": 60,
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