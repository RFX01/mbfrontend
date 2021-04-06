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
    $("#mbf-recent-maps").empty();
    recentMaps.forEach((map) => {
        $("#mbf-recent-maps").append(
            '<div class="col-md-3"><div class="card"><div class="card"><img class="card-img-top" src="' + 
            map.image +
            '"><div class="card-body"><h5 class="card-title">' +
            map.name +
            '</h5><p class="card-text">' + 
            map.description.replace(/(?:\r\n|\r|\n)/g, '<br>') + 
            '</p><a href="/map.html?id=' +
            map.id + 
            '" class="card-link">Details...</a></div></div></div></div>'
        );
    })
}

var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - " + data.name;
    $("#mbf-map-name").html(data.name);
    $('#mbf-map-uuid').html(data.uuid);
    $('#mbf-map-checksum').html("SHA256: " + data.checksum);
    $('#mbf-map-download').html('<button type="button" class="btn btn-primary btn-block" onclick="location.href=\'' + data.mbm + '\'">Download v' + data.version + '</button>');
    $("#mbf-map-description").html(data.description.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    $('#mbf-map-creator').html('<a href="/player.html?id=' + data.creator_id + '">' + data.creator_name + '</a>');
    $('#mbf-map-timestamp').html(data.timestamp);
    $('#mbf-map-filesize').html(data.file_size + " Byte");
    $('#mbf-map-tilesize').html(data.tile_size);
    $('#mbf-map-spawns').html(data.spawns);
    $('#mbf-map-powerups').html(data.powerups);
    $('#mbf-map-teleporters').html(data.teleporters);
    $('#mbf-map-timebombs').html(data.time_bombs);
    $('#mbf-map-keys').html(data.keys);
    $('#mbf-map-ms-triggers').html(data.map_script_triggers);
    $('#mbf-map-ms-commands').html(data.map_script_commands);
    $('#mbf-map-ms-variables').html(data.map_script_variables);
    $("#mbf-map-image").html('<img class="mx-auto d-block" style="width:100%;" src="' + data.image + '">');
    loadVersions(data.uuid);
}

function loadMap(mapid)
{
    infoRequest.open('GET', 'https://api.madbomber.net/map/info/' + mapid, true);
    infoRequest.send();
}

var versionCount = 0;
var versionRequest = new XMLHttpRequest();
var versionUUID = "";
versionRequest.onload = function () {
    versionCount = 0;
    var data = JSON.parse(this.response)
    data.forEach((version) => {
        versionCount++;
        $("#mbf-map-versions").append(
            '<tr><td><a style="font-size:14px;" href="/map.html?id=' + version.id + '">' + 
            versionUUID + "/v" + version.version + 
            '</a><p style="font-size:10px;margin-bottom:0px;">' +
            "SHA256: " + version.checksum +
            '</p></td></tr>'
        );
    })
}

function loadVersions(uuid)
{
    versionUUID = uuid;
    versionRequest.open('GET', 'https://api.madbomber.net/map/versions/' + uuid, true);
    versionRequest.send();
}