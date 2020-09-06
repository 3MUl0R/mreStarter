/**
 * Holds the parameters for app configuration.
 * The defaults can be used to create the .env file on first start.
 */
export default class DefaultEnv {
    //define the index type so we can access it
    [key: string]: string

    BASE_URL = 'http://127.0.0.1'
    PORT = '3901'

    //db parameters
    PG_USER = 'postgres'
    PG_HOST = '127.0.0.1'
    PG_DATABASE = 'dbNameHere'
    PG_PASSWORD = 'postgres'
    PG_PORT = '5432'


    /**
     * pass in env vars to override defaults
     * @param env 
     */
    constructor(env?:DefaultEnv){
        if (env){
            this.BASE_URL = env.BASE_URL
            this.PORT = env.PORT
            this.PG_USER = env.PG_USER
            this.PG_HOST = env.PG_HOST
            this.PG_DATABASE = env.PG_DATABASE
            this.PG_PASSWORD = env.PG_PASSWORD
            this.PG_PORT = env.PG_PORT
        }
    }
}