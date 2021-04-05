function GameType(id, name, description)
{
    this.id = id;
    this.name = name;
    this.description = description;
}

var recentGameTypes = [];
var mapsRequest = new XMLHttpRequest();
gameTypesRequest.onload = function () {
    var data = JSON.parse(this.response)
    data.forEach((r_gt) => {
        recentGameTypes.push(new GameType(r_gt.id, r_gt.name, r_gt.description))
    })
    drawRecentGT();
}


function loadRecentGT()
{
    gameTypesRequest.open('GET', 'https://api.madbomber.net/gametype/list/recent', true);
    gameTypesRequest.send();
}

function drawRecentGT()
{
    $("#mbf-recent-gts").empty();
    recentGameTypes.forEach((gt) => {
        $("#mbf-recent-gts").append(
            '<div class="col-md"><div class="card"><div class="card"><div class="card-body"><h5 class="card-title">' +
            gt.name +
            '</h5><p class="card-text">' + 
            gt.description + 
            '</p><a href="/gametype.html?id=' +
            gt.id + 
            '" class="card-link">Details...</a></div></div></div></div>'
        );
    })
}