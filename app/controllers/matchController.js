


const Match = require('../models/match');
const logger = require('../utils/logger');

//GET
module.exports.getAllMatches = function (request, response) {

    Match.find()
        .then(matches => {
            logger.info( "SUCCESS: GET /matches")
            response.send(matches);
        }).catch(err => {
            logger.error("ERROR: GET /matches , Some error occurred while retrieving matches")
            response.status(500).send({
                message: err.message || "Some error occurred while retrieving matches."
            });
        })
};

module.exports.getMatchById = function (request, response) {

    Match.findById(request.params.match_id)
        .then(match => {
            if (!match) {
                logger.error(`ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`);
                return response.status(404).send({
                    message: "Match not found with id " + request.params.match_id
                });
            }
            logger.info(`SUCCESS: -GET /match/${request.params.match_id}`)
            response.send(match);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                logger.error(` ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`)
                return response.status(404).send({
                    message: "Match not found with id " + request.params.match_id
                });
            }
            log.error(`ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`)
            return response.status(500).send({
                message: "Error retrieving match with id " + request.params.match_id
            });
        });

};

//PUT
module.exports.updateMatch = function (request, response) {
    // console.log(Date() + ` -PUT /match/${request.params.match_id}`)

    // // Validate request
    // if(!checkTransfer(request.body)) {
    //     console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - The transfer not match with the expected input ` + JSON.stringify(request.body));
    //     return response.status(400).send({
    //         message: "Transfer not match with the expected input"
    //     });
    // }

    // // Find Transfer and update it with the request body
    // Transfer.findByIdAndUpdate(request.params.transfer_id, {
    //     origin_team_id: request.body.origin_team_id, 
    //     destiny_team_id: request.body.destiny_team_id,
    //     transfer_date: request.body.transfer_date, 
    //     contract_years: request.body.contract_years, 
    //     cost: request.body.cost, 
    //     player_id: request.body.player_id, 
    // }, {new: true})
    // .then(transfer => {
    //     if(!transfer) {
    //         console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
    //         return response.status(404).send({
    //             message: "Transfer not found with id " + request.params.transfer_id
    //         });
    //     }
    //     console.log(Date() + ` SUCCESS: -PUT /transfer/${request.params.transfer_id}`)
    //     response.send(transfer);
    // }).catch(err => {
    //     if(err.kind === 'ObjectId') {
    //         console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
    //         return response.status(404).send({
    //             message: "Transfer not found with id " + request.params.transfer_id
    //         });                
    //     }
    //     console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Error updating transfer with id: ${request.params.transfer_id}`);
    //     return response.status(500).send({
    //         message: "Error updating transfer with id " + request.params.transfer_id
    //     });
    // });
};

module.exports.updateMatchStats = function (request, response) {
};

module.exports.deleteMatchById = function (request, response) {
};

module.exports.deleteAllMatchesByTournamentId = function (request, response) {
};

function checkMatch(match) {
    // Una transferencia es válida si contiene todos sus atributos
    // return transfer.destiny_team_id!=null 
    //     && transfer.origin_team_id!=null 
    //     && transfer.transfer_date!=null 
    //     && transfer.cost!=null 
    //     && transfer.player_id!=null;
}