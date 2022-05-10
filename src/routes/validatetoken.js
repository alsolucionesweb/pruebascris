const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = {};

verifyToken.admin = async (req, res, next) => {
    const token = req.header('token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        const info = jwt.decode(token);
        if(info.rol == "Admin"){
            req.user = verified
            next() // continuamos
        }else{
            res.status(400).json({error: 'token no es Admin'})
        }
        
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

verifyToken.vendor = async (req, res, next) => {
    const token = req.header('token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        const info = jwt.decode(token);
        if(info.rol == "Vendor"){
            req.user = verified
            next() // continuamos
        }else{
            res.status(400).json({error: 'token no es Vendor'})
        }
        
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;