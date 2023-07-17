import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const roundsSchema = mongoose.Schema({
    winner: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const gameSchema = mongoose.Schema({
    player_x: {
        type: String,
        required: true
    },
    player_o: {
        type: String,
        required: true
    },
    mode: {
        type: Number,
        required: true
    },
    games: [roundsSchema]
}, {
    timestamps: true
});

// gameSchema.pre('save', async function(next) {
//     if(!this.isModified('password')){
//         next();
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// });

// gameSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

const Game = mongoose.model('Game', gameSchema);

export default Game;