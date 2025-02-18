const logger = (req, res, next) => { // without req and next function this code will not work
    console.log(req.url);
    console.log(req.method); // get put post or delete
    // console.log(req.headers); // which browser you using
    console.log(Date());
    next(); // Use this so after the function your web is not loading infinitely
};

export default logger