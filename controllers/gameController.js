import asyncHandler from 'express-async-handler'
import Game from '../models/gameModel.js'
import generateToken from '../utils/generateToken.js';

const registerGame = asyncHandler (async (req, res) => {
    const { player_x, player_o, mode, games } = req.body;

    const game = await Game.create({
        player_x, 
        player_o,
        mode,
        games
    })

    if(game){
        generateToken(res, game._id)
        res.status(201).json({
            _id: game._id,
            player_x: game.player_x,
            player_o: game.player_o,
            mode: game.mode
        })
    } else {
        res.status(400)
        throw new Error('Invalid Game data')
    }
});

const getGame = asyncHandler( async(req, res) => {
    const { gameId } = req.body;

    try {
        const game = await Game.findById(gameId)
    
        if(game) {
            res.status(200).json(game);
        } else {
            res.status(404)
        throw new Error('no game found')
        }
    } catch (error) {
        res.status(400)
        throw new Error('game is invalid')
    }
});

const getGameHistory = asyncHandler( async(req, res) => {
    try {
        const game = await Game.find()
    
        if(game) {
            res.status(200).json(game);
        } else {
            res.status(404)
            throw new Error('no games found')
        }
    } catch (error) {
        res.status(400)
        throw new Error('error on getting game history')
    }
})

const updateGame = asyncHandler( async(req, res) => {
    // res.status(200).json({
    //     gameOn: req.game,
    //     bodyOn: req.body
    // })
    let game = await Game.findById(req.game._id);

    if(game) {
        game.games.push({
            winner:  req.body.winner
        })

        const updatedGame = await game.save()
        res.status(200).json({
            _id: updatedGame._id,
            player_o: updatedGame.player_o,
            player_x: updatedGame.player_x,
            games: updatedGame.games,
        })
    } else {
        res.status(404)
        throw new Error('Error on saving for game updates')
    }
})

const endGame = asyncHandler (async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'game ended'})
});

export {
    registerGame,
    getGame,
    updateGame,
    endGame,
    getGameHistory
}