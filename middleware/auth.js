//actua como un autorizador para realizar ciertas acciones, ej dar like

import jwt from 'jsonwebtoken'

const auth = async(req, res, next) => {
    try {
        //check if user is who he is claiming to be
        const token = req.headers.authorization.split(" ")[1]
        const isCustomToken = token.length < 500
        let decodedData;

        if(token && isCustomToken){
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id

        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }

        next();
        
    } catch (error) {
        console.log(error)
    }
}

export default auth