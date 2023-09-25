const bodyParser = async (req, res, next) => {
    try {
        const bodyData = JSON.parse(req.body.data); //You have to put your json on a object called "data", from frontend
        req.body = { ...req.body, ...bodyData };
        next();
    }
    catch(error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export default bodyParser;