let Hapi = require('@hapi/hapi')
let mongoose = require('mongoose')
let RestHapi = require('rest-hapi')

async function api () {
  try {

    let server = Hapi.Server({
      port: 8080,
      routes: {
        validate: {
          failAction: async (request, h, err) => {
            RestHapi.logger.error(err);
            throw err;
          }
        }
      }
    })

    let config = {
      appTitle: 'rest-hapi-demo',
      enableTextSearch: true,
      logRoutes: true,
      docExpansion: 'list',
      swaggerHost: 'https://rest-hapi-demo.vercel.app:80',
      mongo: {
        URI: 'mongodb+srv://ntc:Cong711996%40@cluster1.sg6pb.mongodb.net'
      },
    }

    await server.register({
      plugin: RestHapi,
      options: {
        mongoose: mongoose,
        config: config,
      },
    })

    await server.start()

    RestHapi.logUtil.logActionComplete(RestHapi.logger, 'Server Initialized', server.info)

    return server
  } catch (err) {
    console.log('Error starting server:', err)
  }

}

module.exports = api()
