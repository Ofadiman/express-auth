import { APP_CONFIG } from 'app/app.config'
import { app } from 'app/app'
import { databaseService } from 'database/database.service'

databaseService.connect()

const server = app.listen(APP_CONFIG.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port: ${APP_CONFIG.PORT}!`)
})

process
  .on('uncaughtException', (error) => {
    // eslint-disable-next-line no-console
    console.log('Error: ', error)
    process.exit(1)
  })
  .on('unhandledRejection', (error) => {
    // eslint-disable-next-line no-console
    console.log('Error: ', error)
    // Gracefully shut down the server.
    server.close(() => {
      process.exit(1)
    })
  })
  .on('SIGTERM', () => {
    // eslint-disable-next-line no-console
    console.log('"Ctrl + C" pressed. Shutting down the server gracefully!')
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('Process terminated!')
    })
  })
