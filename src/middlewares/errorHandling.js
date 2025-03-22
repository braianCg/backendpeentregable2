//Error handler de un paso. Se agrega next y error en los params para indicarle a Express que será un manejador de error.
const errorHandler = (err, req, res, next) => {

    
    if (res.headersSent) {
    return next(err)
    }
    console.error('Entro al error handler!')
    console.error(err.stack)
    res.status(500).send('Something broke!')
}

export default errorHandler