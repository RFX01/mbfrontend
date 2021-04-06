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

var counter = 0;
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
    $('#mbf-gt-bombswitch').html(data.meta.bomb_switch);
    $('#mbf-gt-infiniteabilities').html(data.meta.infinite_abilities);
    $('#mbf-gt-abilitycooldown').html(data.meta.ability_cooldown);
    $('#mbf-gt-invincibilitytimer').html(data.meta.invincibility_timer + " sec.");
    $('#mbf-gt-bombfreezetimer').html(data.meta.bomb_freeze_timer + " sec.");
    $('#mbf-gt-powerupradartimer').html(data.meta.powerup_radar_timer + " sec.");
    $('#mbf-gt-bombkickcooldown').html(data.meta.bomb_kick_cooldown + " sec.");
    $('#mbf-gt-linebombcooldown').html(data.meta.line_bomb_cooldown + " sec.");
    $('#mbf-gt-invincibilitycooldown').html(data.meta.invincibility_cooldown + " sec.");
    $('#mbf-gt-bombfreezecooldown').html(data.meta.bomb_freeze_cooldown + " sec.");
    $('#mbf-gt-powerupradarcooldown').html(data.meta.powerup_radar_cooldown + " sec.");
    $('#mbf-gt-basespeedmultiplier').html(data.meta.base_speed_multiplier + " x");
    $('#mbf-gt-bombspeedmultiplier').html(data.meta.bomb_speed_multiplier + " x");
    $('#mbf-gt-basefireradiusmultiplier').html(data.meta.base_fire_radius_multiplier + " x");
    $('#mbf-gt-baseburntimemultiplier').html(data.meta.base_burn_time_multiplier + " x");
    $('#mbf-gt-fireupmultiplier').html(data.meta.fire_up_multiplier + " x");
    $('#mbf-gt-bombupmultiplier').html(data.meta.bomb_up_multiplier + " x");
    $('#mbf-gt-speedupmultiplier').html(data.meta.speed_up_multiplier + " x");
    $('#mbf-gt-burntimeupmultiplier').html(data.meta.burn_time_up_multiplier + " x");
    $('#mbf-gt-ignitionspeedupmultiplier').html(data.meta.ignition_speed_up_multiplier + " x");
    $('#mbf-gt-abilitypickupmultiplier').html(data.meta.ability_pickup_multiplier + " x");
    $('#mbf-gt-capsuleradiusmultiplier').html(data.meta.capsule_radius_multiplier + " x");
    $('#mbf-gt-fastignitiondivider').html(data.meta.fast_ignition_divider + " /");
    $('#mbf-gt-longignitiondivider').html(data.meta.long_ignition_divider + " /");
    $('#mbf-gt-speedlimit').html(data.meta.speed_limit + " pps");
    $('#mbf-gt-burntimelimit').html(data.meta.burn_time_limit) + " ms";
    $('#mbf-gt-fastignitionlimit').html(data.meta.fast_ignition_limit + " ms");
    $('#mbf-gt-fireradiuslimit').html(data.meta.fire_radius_limit + " Tile/s");
    $('#mbf-gt-bombcountlimit').html(data.meta.bomb_count_limit + " Bomb/s");
    processPowerupSet(data.meta.powerup_set, '#mbf-gt-powerupset');
    processPowerupSet(data.meta.open_powerup_set, '#mbf-gt-openpowerupset');
    counter = 0;
    data.meta.initial_ability_selection.forEach((ability) => {
        counter++;
        $('#mbf-gt-initialabilityselection').append(
            '<tr><th scope="row">' + 
            '<img src="/img/' + ability.ability +'.png">' +
            ability.ability + 
            '</td><td>' + 
            ability.uses + 
            '</td><td></tr>'
        );
    })
}

function processPowerupSet(set, element)
{
    counter = 0;
    set.forEach((pup) => {
        counter++;
        $(element).append(
            '<tr><th scope="row">' + 
            '<img src="/img/' + pup.powerup +'.png">' +
            pup.powerup + 
            '</td><td>' + 
            pup.weight + 
            '</td><td>' + 
            pup.limit + 
            '</td><td></tr>'
        );
    })
}

function loadGameType(gtid)
{
    gtInfoRequest.open('GET', 'https://api.madbomber.net/gametype/info/' + gtid, true);
    gtInfoRequest.send();
}