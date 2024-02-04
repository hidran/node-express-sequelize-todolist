const {compare} = require('bcrypt');
const User = require('../models').User;

async function register({name, email, password}) {

    return User.create({name, email, password});
}

async function login({email, password}) {

    const user = await User.findOne({where: {email}});
    if (!user) {
        throw new Error('User not found by email');
    }
    const res = await compare(password, user.password);
    console.log(res, password, user.password)
    if (!res) {
        throw new Error('Password does not match');
    }
    return user;
}

module.exports = {
    register, login
}
