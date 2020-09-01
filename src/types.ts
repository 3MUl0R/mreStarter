/**
 * holds the defaults for app configuration
 * only used to create the .env file on the first start
 */
export default class DefaultEnv {
    //define the index type so we can access it
    [key: string]: string

    BASE_URL = 'http://127.0.0.1'
    PORT = '3901'

    //possible db parameters
    // PG_USER = 'postgres'
    // PG_HOST = '127.0.0.1'
    // PG_DATABASE = 'dbNameHere'
    // PG_PASSWORD = 'postgres'
    // PG_PORT = '5432'
}