export const errorHandler = (statuscode, message) => {
    return (err, req, res, next) => {
        
        res.status(statuscode).json({ message });
    };
};

