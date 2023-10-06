const bodyParser = async (req, res, next) => {
    try {
        const bodyData = JSON.parse(req.body.data);
        req.body = { ...req.body, ...bodyData };
        next();
    }
    catch(error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export { bodyParser };