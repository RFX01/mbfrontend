var counter = 0;
var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - Match#" + data.id;
    $("#mbf-match-title").html("Match#" + data.id);
    $("#mbf-match-timestamp").html(data.timestamp);
    $("#mbf-match-playtime").html(data.playtime + " sec.");
    $("#mbf-match-winner").html('<a href="/player.html?id=' + data.winner_id + '">' + data.winner_name + '</a>');
    $("#mbf-match-map").html('<a href="/map.html?id=' + data.map_id + '">' + data.map_name + '</a>');
    $("#mbf-match-gametype").html('<a href="/gametype.html?id=' + data.game_type_id + '">' + data.game_type_name + '</a>');
    $("#mbf-match-server").html('<a href="/server.html?id=' + data.server_id + '">' + data.server_name + '</a>');
    counter = 0;
    data.kills.forEach((kill) => {
        counter++;
        $('#mbf-match-kills').html(
            '<tr><td>' + 
            kill.timestamp + " sec."+
            '</td><th scope="row">' + 
            '<a href="/player.html?id=' + kill.killer_id + '">' + kill.killer_name + '</a>' +
            '</th><td>&#8594;</td><th scope="row">' + 
            '<a href="/player.html?id=' + kill.killed_id + '">' + kill.killed_name + '</a>' +
            '</th></tr>'
        );
    })

    counter = 0;
    data.players.forEach((player) => {
        counter++
        $('#mbf-match-players').append(
            '<div class="col-md-4"><div class="card" style="margin-bottom:16px;"><div class="card-header">' + 
            '<a href="/player.html?id=' + player.id + '">' + player.name + '</a>' +
            '</div><ul class="list-group list-group-flush"><li class="list-group-item pt-1 pb-1"><b>Kills </b><p class="mb-0 float-right">' +
            player.kills + 
            '</p></li><li class="list-group-item pt-1 pb-1"><b>Deaths </b><p class="mb-0 float-right">' +
            player.deaths + 
            '</p></li><li class="list-group-item pt-1 pb-1"><b>K/D Ratio </b><p class="mb-0 float-right">' +
            player.kd_ratio +
            '</p></li><li class="list-group-item pt-1 pb-1"><b>Tiles Painted</b><p class="mb-0 float-right">' +
            player.painted_tiles +
            '</p></li><li class="list-group-item pt-1 pb-1"><b>Tiles Broken</b><p class="mb-0 float-right">' +
            player.broken_tiles + 
            '</p></li><li class="list-group-item pt-1 pb-1"><b>Bombs Placed</b><p class="mb-0 float-right">' +
            player.placed_bombs +
            '</p></li><li class="list-group-item pt-1 pb-1"><b>Abilities Used</b><p class="mb-0 float-right">' +
            player.used_abilities + 
            '</p></li><li class="list-group-item pt-1 pb-1"><b>Powerups Collected</b><p class="mb-0 float-right">' +
            player.collected_powerups +
            '</p></li></ul></div></div>'
        );
    })
}

function loadMatch(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/match/info/' + id, true);
    infoRequest.send();
}