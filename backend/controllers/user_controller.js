const User = require('../model/user')
module.exports.create = async function (req, res)
{

    try
    {
        
        const user = await User.create(req.body);
        return res.status(200).json({ mess: "user created" });
    }
    catch(err)
    {
        return res.status(404).json({ mess: "user not created" });
    }
}
module.exports.getUsers = async function (req, res)
{
    try
    {
        const user = await User.find({});
        return res.status(200).json({ mess: "user found", user: user });
    }
    catch(err)
    {
        return res.status(404).json({ mess: "user not found" });
    }
}    