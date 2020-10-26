# Gov Tech Project
### API Assignment

#### Database Setup (Docker)

    $ cd docker
    $ docker-compose up

#### Configuration

in the configuration `config` folder create a `test` env file

    $ cd config
    $ touch test.json
    
open the `config/test.json` file add following configuration json

    {
      "db": {
        "connection": "mongodb://root:root@127.0.0.1:27017",
        "database": "<DATABASE_NAME>"
      },
      "server": {
        "port": <PORT>
      },
      "decrypt": {
        "algorithm": "<ALGORITHM>",
        "key": "<KEY>"
      },
      "corn": {
        "schedule": "*/30 * * * *"
      }
    }

and replace the values in `<VARIABLES>`

#### Start Test Server

    $ npm run test-server
