function GameType(id, name, description)
{
    this.id = id;
    this.name = name;
    this.description = description;
}

var recentGameTypes = [];
var gameTypesRequest = new XMLHttpRequest();
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

var gtInfoRequest = new XMLHttpRequest();
gtInfoRequest.onload = function () {
    var data = JSON.parse(this.response)
    document.title = "MadBomber.NET - " + data.name;
    $("#mbf-gt-name").html(data.name);
    $('#mbf-gt-uuid').html(data.uuid);
    $('#mbf-gt-checksum').html("SHA256: " + data.checksum);
    $('#mbf-gt-download').html('<button type="button" class="btn btn-primary btn-block" onclick="location.href=\'' + data.xml + '\'">Download v' + data.version + '</button>');
    $("#mbf-gt-description").html(data.description);
    $('#mbf-gt-creator').html('<a href="/player.html?id=' + data.creator_id + '">' + data.creator_name + '</a>');
    $('#mbf-gt-timestamp').html(data.timestamp);
    $('#mbf-gt-paintbomb').html(data.meta.paint_bomb);
    $('#mbf-gt-goalrush').html(data.meta.goal_rush);
    $('#mbf-gt-respawns').html(data.meta.respawns);
    $('#mbf-gt-respawndelay').html(data.meta.respawn_delay + " sec.");
    $('#mbf-gt-timelimit').html(data.meta.time_limit + " min.");
    $('#mbf-gt-fixedspawns').html(data.meta.fixed_spawns);
    $('#mbf-gt-maploop').html(data.meta.map_loop);
    $('#mbf-gt-healthbar').html(data.meta.health_bar);
    $('#mbf-gt-healthbarsize').html(data.meta.health_bar_size + " HP");
    $('#mbf-gt-posthitinvincibility').html(data.meta.post_hit_invincibility + " sec.");
    $('#mbf-gt-powerupplacement').html(data.meta.powerup_placement);
    $('#mbf-gt-openpowerups').html(data.meta.open_powerups);
    $('#mbf-gt-powerupconcentration').html(data.meta.powerup_concentration + "%");
    $('#mbf-gt-openpowerupconcentration').html(data.meta.open_powerup_concentration + "%");
}

function loadGameType(gtid)
{
    gtInfoRequest.open('GET', 'https://api.madbomber.net/gametype/info/' + gtid, true);
    gtInfoRequest.send();
}