var counter = 0;
var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - Match#" + data.id;
    $("#mbf-match-title").html("Match#" + data.id);
    $("#mbf-match-timestamp").html(new Date(data.timestamp).toLocaleString());
    $("#mbf-match-playtime").html(data.playtime + " sec.");
    $("#mbf-match-winner").html('<a href="/player.html?id=' + data.winner_id + '">' + escapeHtml(data.winner_name) + '</a>');
    $("#mbf-match-map").html('<a href="/map.html?id=' + data.map_id + '">' + escapeHtml(data.map_name) + '</a>');
    $("#mbf-match-gametype").html('<a href="/gametype.html?id=' + data.game_type_id + '">' + escapeHtml(data.game_type_name) + '</a>');
    $("#mbf-match-server").html('<a href="/server.html?id=' + data.server_id + '">' + escapeHtml(data.server_name) + '</a>');
    counter = 0;
    data.kills.forEach((kill) => {
        counter++;
        var startString ='<tr><td>' + 
        kill.timestamp + " sec."+
        '</td><th scope="row">';
        var endString = '</th><td>&#8594;</td><th scope="row">' + 
        '<a href="/player.html?id=' + kill.killed_id + '">' + escapeHtml(kill.killed_name) + '</a>' +
        '</th></tr>';
        if (kill.killer_id == null)
        {
            $('#mbf-match-kills').append(
                startString + 
                escapeHtml(kill.killer_name) +
                endString
            );
        }
        else
        {
            $('#mbf-match-kills').append(
                startString + 
                '<a href="/player.html?id=' + kill.killer_id + '">' + escapeHtml(kill.killer_name) + '</a>' +
                endString
            );
        }
    })

    counter = 0;
    data.players.forEach((player) => {
        counter++
        $('#mbf-match-players').append(
            '<div class="col-md-4"><div class="card" style="margin-bottom:16px;"><div class="card-header">' + 
            '<a href="/player.html?id=' + player.id + '">' + escapeHtml(player.name) + '</a>' +
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

var recentMatches = [];
var matchesRequest = new XMLHttpRequest();
matchesRequest.onload = function () {
    var data = JSON.parse(this.response)
    data.forEach((match) => {
        $('#mbf-recent-matches').append(
            "<tr style=\"cursor: pointer;\" onclick=\"window.location = '/match.html?id=" +
            match.id +
            '\'"><th scope="row">' +
            "Match#" + match.id +
            '</th><td>' +
            match.player_count +
            '</td><td>' +
            match.playtime + " sec." +
            '</td></tr>'
        );
    })
}


function loadRecentMatches()
{
    matchesRequest.open('GET', 'https://api.madbomber.net/match/list/recent', true);
    matchesRequest.send();
}