import { AppDataSource } from './connection';
import "reflect-metadata";
import * as hapi from '@hapi/hapi'

const init = async () => {

    const server = hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([require('./plugin/router/EasynoteRouter'),require('./plugin/controller/EasynoteController')])
    await AppDataSource
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();