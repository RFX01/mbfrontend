var serverCount = 0;
var serverListRequest = new XMLHttpRequest();
serverListRequest.onload = function () {
    var data = JSON.parse(this.response)
    data.forEach((server) => {
        serverCount++;
        $("#mbf-server-list").append(
            '<tr><th scope="row">' + 
            server.name + 
            '</th><td>' + 
            server.region + 
            '</td><td>' + 
            server.lobby_state + 
            '</td><td>' + 
            server.map_count + 
            '</td><td>' + 
            server.game_type_count + 
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