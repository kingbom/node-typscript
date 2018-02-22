import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

class Server {
    public app : express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() : void {
        //set connect mongodb
        const MONGO_URI = 'mongodb://localhost/resapi';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);

        //config
        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(cors());
    }

    routes() : void {
        let router : express.Router;
        router = express.Router();

        this.app.use('/', router);
    }
}

export default new Server().app;