const allowedOrigins = [
    'https://pmarshal-frontend.vercel.app',
    'https://pmarshal-frontend.vercel.app/'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
