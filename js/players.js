function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;
    return h + " hrs. " + (m < 10 ? '0' + m : m) + " min. ";
  }

var infoRequest = new XMLHttpRequest();
infoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - " + data.name;
    $("#mbf-player-name").html(data.name);
    $('#mbf-player-trustimg').attr('src', 'img/' + data.trust_rank + '.png');
    $('#mbf-player-trustscore').html("(" + data.trust_score + ")");
    $('#mbf-player-trustrank').append(data.trust_rank);
    $('#mbf-player-registertime').html(data.register_time);
    $('#mbf-player-lastactivity').html(data.last_activity);
    $('#mbf-player-playcount').html(data.play_count);
    $('#mbf-player-playtime').html(secondsTimeSpanToHMS(data.cumulative_playtime));
    $('#mbf-player-submissions').html(data.submission_count + " / <b>" + data.submission_limit + "</b>");
    $('#mbf-player-avgkd').html(data.avg_kd_ratio);
    $('#mbf-player-winpercent').html(data.win_percentage + "%");
    if (data.server_id != null)
    {
        $('#mbf-player-currentserver').html('<a href="/server.html?id=' + data.server_id + '">' + data.server_name + '</a>');
    }
    else
    {
        $('#mbf-player-currentserver').html(data.server_name);
    }
    data.recent_matches.forEach((match) => {
        $('#mbf-player-matches').append(
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

    $('#mbf-player-mapcount').html("Maps (" + data.map_count + ")");
    $("#mbf-player-maps").empty();
    data.maps.forEach((map) => {
        $("#mbf-player-maps").append(
            '<div class="col-md-3"><div class="card" style="margin-bottom:16px;"><div class="card"><img class="card-img-top" src="' + 
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

    $('#mbf-player-gtcount').html("Game Types (" + data.gt_count + ")");
    $("#mbf-player-gametypes").empty();
    data.game_types.forEach((gt) => {
        $("#mbf-player-gts").append(
            '<div class="col-md-3"><div class="card" style="margin-bottom:16px;"><div class="card"><div class="card-body"><h5 class="card-title">' +
            gt.name +
            '</h5><p class="card-text">' + 
            gt.description.replace(/(?:\r\n|\r|\n)/g, '<br>') + 
            '</p><a href="/gametype.html?id=' +
            gt.id + 
            '" class="card-link">Details...</a></div></div></div></div>'
        );
    })
}

function loadPlayer(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/player/info/' + id, true);
    infoRequest.send();
}