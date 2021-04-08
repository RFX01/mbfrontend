var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - " + data.name;
    $("#mbf-player-name").html(data.name);
    $('#mbf-player-trustimg').attr('src', 'img/' + data.trust_rank + '.png');
    $('#mbf-player-trustscore').html("(" + data.trust_score + ")");
    $('#mbf-player-trustrank').html(data.trust_rank)
}

function loadPlayer(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/player/info/' + id, true);
    infoRequest.send();
}