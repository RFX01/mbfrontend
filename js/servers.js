var serverCount = 0;
var serverListRequest = new XMLHttpRequest();
serverListRequest.onload = function () {
    var data = JSON.parse(this.response)
    data.forEach((server) => {
        serverCount++;
        $("#mbf-server-list").append(
            "<tr style=\"cursor: pointer;\" onclick=\"window.location = '/server.html?id=" +
            server.id +
            '\'"><th scope="row">' + 
            server.name + 
            '</th><td>' + 
            server.region + 
            '</td><td>' + 
            server.lobby_state + 
            '</td><td>' + 
            server.trust_requirement + 
            '</td><td>' + 
            server.client_version + 
            '</td><td>' + 
            server.current_players + '/' + server.max_players +
            '</td></tr>'
        );
    })
    $("#mbf-server-count").html(serverCount);
}

function loadServerList()
{
    serverListRequest.open('GET', 'https://api.madbomber.net/server/list', true);
    serverListRequest.send();
}

var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - " + data.name;
    $("#mbf-server-name").html(data.name);
    if(data.online)
    {
        $('#mbf-server-online').attr("class", "text-success");
        $('#mbf-server-online').html('Online <span class="text-dark" style="font-size:12px;">Since ' + data.online_since + '</span>');
    }
    else
    {
        $('#mbf-server-online').attr("class", "text-danger");
        $('#mbf-server-online').html('Offline');
    }
    if (data.owner_id == null)
    {
        $('#mbf-server-owner').html(data.owner_name);
    }
    else
    {
        $('#mbf-server-owner').html('<a href="/player.html?id=' + data.owner_id + '">' + data.owner_name + '</a>');
    }
    $('#mbf-server-registertime').html(data.register_time);
    $('#mbf-server-endpoint').html(data.endpoint);
    $('#mbf-server-clientversion').html(data.client_version);
    $('#mbf-server-players').html(data.connected_players + " / <b>" + data.max_players + "</b>");
    $('#mbf-server-trustrequirement').html(data.trust_requirement);
    $('#mbf-server-status').html(data.status);
    $('#mbf-server-mapcount').html(data.map_count);
    $('#mbf-server-gametypecount').html(data.game_type_count);
    $('#mbf-server-region').html(data.region);

    data.recent_matches.forEach((match) => {
        $('#mbf-server-matches').append(
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

function loadServer(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/server/info/' + id, true);
    infoRequest.send();
}
