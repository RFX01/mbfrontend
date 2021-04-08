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
    if (data.server_id != null)
    {
        $('#mbf-player-currentserver').html('<a href="/server.html?id=' + data.server_id + '">' + data.server_name + '</a>');
    }
    else
    {
        $('#mbf-player-currentserver').html(data.server_name);
    }
}

function loadPlayer(id)
{
    infoRequest.open('GET', 'https://api.madbomber.net/player/info/' + id, true);
    infoRequest.send();
}