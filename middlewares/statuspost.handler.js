const User = require('../schemas/user.schema');

const userStatus = async (req, res, next, config) => {
    const id = req.user.sub;
    const { search } = config;
    try {
        const result = await User.findById(id, { status: 1 });
        const validation = result.status;
        if (validation.length === 0) {
            next();
        } else {
            const searchValue = validation.find(item => item.name === search);
            if(searchValue){
                if(searchValue.value === true){
                    next();
                }else{
                    res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
                }
            }else{
                next();
            }
        } 
    } catch (error) {
        // Manejo de errores si la consulta falla
        console.error(error);
        res.status(500).json({ error: 'Ups! Algo a salido mal' });
    }
};

module.exports = { userStatus };