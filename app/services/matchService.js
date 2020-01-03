const Match = require('../models/match');
// const req = require('request');
const req = require("request-promise");
const dbConfig = require('../../conf/dbConfig');
const logger = require('../utils/logger');
const moment = require('moment');



module.exports.generateMatches = async function (tournamentId, teams) {
    // teams = [
    //     {
    //         "team_id": 541,
    //         "name": "Real Madrid",
    //         "code": 123,
    //         "logo": "https://media.api-football.com/teams/541.png",
    //         "country": "Spain",
    //         "founded": 1902,
    //         "venue_name": "Estadio Santiago Bernabéu",
    //         "venue_surface": "grass",
    //         "venue_address": "Avenida de Concha Espina 1, Chamartín",
    //         "venue_city": "Madrid",
    //         "venue_capacity": 85454,
    //         "budget": 14423432,
    //         "value": 9999999999999999999
    //     },
    //     {
    //         "team_id": 542,
    //         "name": "Barca",
    //         "code": 123,
    //         "logo": "https://media.api-football.com/teams/541.png",
    //         "country": "Spain",
    //         "founded": 1902,
    //         "venue_name": "camp nou",
    //         "venue_surface": "grass",
    //         "venue_address": "Avenida de Concha Espina 1, Chamartín",
    //         "venue_city": "Barcelona",
    //         "venue_capacity": 85454,
    //         "budget": 14423432,
    //         "value": 9999999999999999999
    //     },
    //     {
    //         "team_id": 543,
    //         "name": "Betis",
    //         "code": 123,
    //         "logo": "https://media.api-football.com/teams/541.png",
    //         "country": "Spain",
    //         "founded": 1902,
    //         "venue_name": "villamarin",
    //         "venue_surface": "grass",
    //         "venue_address": "Avenida de Concha Espina 1, Chamartín",
    //         "venue_city": "Sevilla",
    //         "venue_capacity": 85454,
    //         "budget": 14423432,
    //         "value": 9999999999999999999
    //     }
    //     ,
    //     {
    //         "team_id": 544,
    //         "name": "Sevilla",
    //         "code": 123,
    //         "logo": "https://media.api-football.com/teams/541.png",
    //         "country": "Spain",
    //         "founded": 1902,
    //         "venue_name": "pizjuan",
    //         "venue_surface": "grass",
    //         "venue_address": "Avenida de Concha Espina 1, Chamartín",
    //         "venue_city": "Sevilla",
    //         "venue_capacity": 85454,
    //         "budget": 14423432,
    //         "value": 9999999999999999999
    //     }];
    // tournamentId = 1;
    try {
        let matches = []
        let firstRoundLastMatchDate = new Date();
        for (i = 0; i < teams.length; i++) {
            let date = new Date();
            for (t = i + 1; t < teams.length; t++) {
                match = new Match({
                    tournamentUuid: tournamentId,
                    visitorTeamUuid: teams[t].team_id,
                    visitorTeamName: teams[t].name,
                    localTeamUuid: teams[i].team_id,
                    localTeamName: teams[i].name,
                    matchDate: new Date(date),
                    venue_city: teams[i].venue_city
                });
                date.setDate(date.getDate() + 7);
                await match.save();
                matches.push(match);
            }
            if (i == 0) {
                firstRoundLastMatchDate = date;
            }
        }
        for (i = teams.length - 1; i >= 0; i--) {
            let date = new Date(firstRoundLastMatchDate);
            for (t = i - 1; t >= 0; t--) {
                match = new Match({
                    tournamentUuid: tournamentId,
                    visitorTeamUuid: teams[t].team_id,
                    visitorTeamName: teams[t].name,
                    localTeamUuid: teams[i].team_id,
                    localTeamName: teams[i].name,
                    matchDate: new Date(date),
                    venue_city: teams[i].venue_city
                });
                date.setDate(date.getDate() + 7);
                await match.save();
                matches.push(match);
            }
        }
        logger.debug(matches);
    } catch (error) {
        logger.error(`ERROR: generateMatches - ${error}`);
    }

}


module.exports.insertMatches = async function () {
    tournament = { id: 1 };
    teams = [
        {
            "team_id": 541,
            "name": "Real Madrid",
            "code": 123,
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1902,
            "venue_name": "Estadio Santiago Bernabéu",
            "venue_surface": "grass",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Madrid",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 9999999999999999999
        },
        {
            "team_id": 542,
            "name": "Barca",
            "code": 123,
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1902,
            "venue_name": "Estadio Santiago Bernabéu",
            "venue_surface": "grass",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Barcelona",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 9999999999999999999
        },
        {
            "team_id": 543,
            "name": "Betis",
            "code": 123,
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1902,
            "venue_name": "Estadio Santiago Bernabéu",
            "venue_surface": "grass",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Sevilla",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 9999999999999999999
        }
        ,
        {
            "team_id": 544,
            "name": "Sevilla",
            "code": 123,
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1902,
            "venue_name": "Estadio Santiago Bernabéu",
            "venue_surface": "grass",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Sevilla",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 9999999999999999999
        }];


    teams.forEach((element, i) => {
        console.log(`team ${i}: ${teams[i].name}`);
    });

    var match = new Match({
        tournamentUuid: '1',
        visitorTeamUuid: '1',
        localTeamUuid: '2',
        matchDate: new Date(),
        stats: {
            localScore: 3,
            visitorScore: 1,
            goals: [{
                player: "Joaquin",
                type: "free-kick",
                time: "15",
            },
            {
                player: "Joaquin",
                type: "penalty-kick",
                time: "90",
            }],
            cards: [{
                player: "Assunçao",
                type: "Yellow",
                time: 22,
            }]
        }
    });

    // match = await match.save();
    return match.id;
}

module.exports.deleteAllByTournament = async function (tournamentId) {
    result = true;
    try {
        Match.deleteMany({ tournamentUuid: tournamentId });
    } catch (error) {
        result = false;
    }
    return result;
}

module.exports.getWeather = async function (match) {
    try {
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${match.venue_city}&appid=${dbConfig.weatherApiKey}&units=metric`
        let result;
        logger.debug(`Getting ${match.matchDate} weather in ${match.venue_city} from openweathermap`);
        await req(url, function (err, response, body) {
            if (err) {
                logger.error(`Error retriving weather info: ${error}`);
            } else {
                let weather = JSON.parse(body);
                let weatherFiltered = weather.list ? weather.list.filter(day => {
                    let matchDate = moment(match.matchDate).format('YYYY-MM-DD');
                    return day.dt_txt.includes(matchDate);
                }) : [];
                if (Array.isArray(weatherFiltered) && weatherFiltered.length) {
                    result = weatherFiltered;
                } else {
                    result = 'no weather data';
                }
            }
        });
        logger.debug("Retrieved weather");
        return result;
    } catch (err) {
        logger.error(`ERROR: GET /weather , Some error occurred while retrieving ${match.venue_city} weather`)
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving matches."
        });
    }
}
