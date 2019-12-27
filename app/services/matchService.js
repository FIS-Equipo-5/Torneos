const Match = require('../models/match');
// const req = require('request');
const req = require("request-promise");
const dbConfig = require('../../conf/dbConfig');
const logger = require('../utils/logger');
const moment = require('moment');






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

module.exports.getWeather = async function (match) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${match.location}&appid=${dbConfig.weatherApiKey}&units=metric`
    let result;
    logger.debug(`Getting ${match.matchDate} weather in ${match.location} from openweathermap`);
    await req(url, function (err, response, body) {
        if (err) {
            logger.error(`Error retriving weather info: ${error}`);
        } else {
            let weather = JSON.parse(body);
            let weatherFiltered = weather.list.filter(day => {
                let matchDate = moment(match.matchDate).format('YYYY-MM-DD');
                return day.dt_txt.includes(matchDate);
            });
            if (Array.isArray(weatherFiltered) && weatherFiltered.length) {
                result = weatherFiltered;
            } else {
                result = 'no weather data';
            }
        }
    });
    logger.debug("Retrieved weather");
    return result;
}