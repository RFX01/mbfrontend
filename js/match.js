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
            '<div class="col-md-4"><div class="card"><div class="card-header">' + 
            '<a href="/player.html?id=' + player.id + '">' + player.name + '</a>' +
            '</div><ul class="list-group list-group-flush"><li class="list-group-item"><b>Kills </b>' +
            player.kills + 
            '</li><li class="list-group-item"><b>Deaths </b>' +
            player.deaths + 
            '</li><li class="list-group-item"><b>K/D Ratio </b>' +
            player.kd_ratio +
            '</li><li class="list-group-item"><b>Painted </b>' +
            player.painted_tiles +
            '</li><li class="list-group-item"><b>Tiles </b>' +
            player.broken_tiles + 
            '</li><li class="list-group-item"><b>Bombs </b>' +
            player.placed_bombs +
            '</li><li class="list-group-item"><b>Abilities </b>' +
            player.used_abilities + 
            '</li><li class="list-group-item"><b>Powerups </b>' +
            player.collected_powerups +
            '</li></ul></div></div>'
        );
    })
}

function loadMatch(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/match/info/' + id, true);
    infoRequest.send();
}