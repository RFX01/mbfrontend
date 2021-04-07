var counter = 0;
var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - Match#" + data.id;
    $("#mbf-match-id").html(data.id);
    $("#mbf-match-playtime").html(data.playtime + " sec.");
    $("#mbf-match-winner").html('<a href="/player.html?id=' + data.winner_id + '">' + data.winner_name + '</a>');
    $("#mbf-match-map").html('<a href="/map.html?id=' + data.map_id + '">' + data.map_name + '</a>');
    $("#mbf-match-gametype").html('<a href="/gametype.html?id=' + data.game_type_id + '">' + data.game_type_name + '</a>');
    $("#mbf-match-server").html('<a href="/server.html?id=' + data.server_id + '">' + data.server_name + '</a>');
    counter = 0;
    data.forEach((kill) => {
        counter++;
        $('#mbf-match-kills').html(
            '<tr><td>' + 
            kill.timestamp +
            '</td><th scope="row">' + 
            '<a href="/player.html?id=' + data.killer_id + '">' + data.killer_name + '</a>' +
            '</th><td>&#8594;</td><th scope="row">' + 
            '<a href="/player.html?id=' + data.killed_id + '">' + data.killed_name + '</a>' +
            '</th></tr>'
        );
    })
}

function loadMatch(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/match/info/' + id, true);
    infoRequest.send();
}