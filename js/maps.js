function Map(id, name, description, image)
{
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
}

var recentMaps = [];
var mapsRequest = new XMLHttpRequest();
mapsRequest.onload = function () {
    var data = JSON.parse(this.response)
    data.forEach((r_map) => {
        recentMaps.push(new Map(r_map.id, r_map.name, r_map.description, r_map.image))
    })
    drawRecent();
}


function loadRecent()
{
    mapsRequest.open('GET', 'https://api.madbomber.net/map/list/recent', true);
    mapsRequest.send();
}

function drawRecent()
{
    recentMaps.forEach((map) => {
        $("#mbf-recent-maps").append(
            '<div class="col-3"><div class="card"><div class="card"><img class="card-img-top" src="' + 
            map.image +
            '"><div class="card-body"><h5 class="card-title">' +
            map.name +
            '</h5><p class="card-text">' + 
            map.description + 
            '</p><a href="/map.html?id=' +
            map.id + 
            '" class="card-link">Details...</a></div></div></div></div>'
        );
    })
}

function loadMap(mapid)
{
    infoRequest.open('GET', 'https://api.madbomber.net/map/info/' + mapid, true);
    infoRequest.send();
}