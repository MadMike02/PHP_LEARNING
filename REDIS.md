# REDIS
Redis is an `open source` (BSD licensed), `in-memory data structure` store used as a database, `cache`, `message broker`, and `streaming engine`.

# Redis as a document database 
- https://redis.io/docs/get-started/document-database/
- install and connect
- Document  to insert
    ```
    {
    "brand": "brand name",
    "condition": "new | used | refurbished",
    "description": "description",
    "model": "model",
    "price": 0
    }
    ```

## Create index

The following example shows an FT.CREATE command that creates an index with some text fields, a numeric field (price), and a tag field (condition). The text fields have a weight of 1.0, meaning they have the same relevancy in the context of full-text searches. The field names follow the JSONPath notion. Each such index field maps to a property within the JSON document.

- https://redis.io/commands/ft.create/

- > FT.CREATE idx:bicycle ON JSON PREFIX 1 bicycle: SCORE 1.0 SCHEMA $.brand AS brand TEXT WEIGHT 1.0 $.model AS model TEXT WEIGHT 1.0 $.description AS description TEXT WEIGHT 1.0 $.price AS price NUMERIC $.condition AS condition TAG SEPARATOR ,

## Set json document

- https://redis.io/commands/json.set/

> JSON.SET "bicycle:0" "." "{\"brand\": \"Velorim\", \"model\": \"Jigger\", \"price\": 270, \"description\": \"Small and powerful, the Jigger is the best ride for the smallest of tikes! This is the tiniest kids\\u2019 pedal bike on the market available without a coaster brake, the Jigger is the vehicle of choice for the rare tenacious little rider raring to go.\", \"condition\": \"new\"}"
OK

## Search and query
- https://redis.io/commands/ft.search/

You can retrieve all indexed documents using the FT.SEARCH command. Note the LIMIT clause below, which allows result pagination.

> FT.SEARCH "idx:bicycle" "*" LIMIT 0 10

- `Single-term full-text query`

- The following command shows a simple single-term query for finding all bicycles with a specific model:

> FT.SEARCH "idx:bicycle" "@model:Jigger" LIMIT 0 10

- `Exact match query`
Below is a command to perform an exact match query that finds all bicycles with the brand name Noka Bikes. You must use double quotes around the search term when constructing an exact match query on a text field.

> FT.SEARCH "idx:bicycle" "@brand:\"Noka Bikes\"" LIMIT 0 10

# INSTALLATION ON LOCAL
https://redis.io/docs/install/install-redis/install-redis-on-linux/

# CONNECT
https://redis.io/docs/connect/

## REDIS-CLI
https://redis.io/docs/connect/cli/

### Command line usage
- `redis-cli INCR mycounter` or `redis-cli --no-raw INCR mycounter` -->> no-raw output that containes datatype along with data `(integer)1`
- `redis-cli --raw INCR mycounter` -->> raw output that containes data `1`

### String quoting and escaping

- `SET mykey "Hello\nWorld"` -- `GET mykey` print hello new line world
- `AUTH some_admin_user ">^8T>6Na{u|jp>+v\"55\@_;OU(OR]7mbAYGqsfyu48(j'%hQH7;v*f1H${*gD(Se'"` ---password escaping

### Host, port, password, and database
By `default`, redis-cli connects to the server at the address `127.0.0.1` with port `6379`. You can change the port using several command line options. To specify a different host name or an IP address, use the -h option. In order to set a different port, use -p.

- `redis-cli -h redis15.localnet.org -p 6390 PING`

If your instance is password protected, the` -a <password>` option will perform authentication saving the need of explicitly using the AUTH command:

- `redis-cli -a myUnguessablePazzzzzword123 PING`

### SSL/TLS
By default, redis-cli uses a plain TCP connection to connect to Redis. You may enable SSL/TLS using the --tls option, along with --cacert or --cacertdir to configure a trusted root certificate bundle or directory.

If the target server requires authentication using a client side certificate, you can specify a certificate and a corresponding private key using --cert and --key.

### Continuously run the same command
This feature is controlled by two options: -r <count> and -i <delay>. The -r option states how many times to run a command and -i sets the delay between the different command calls in seconds (with the ability to specify values such as 0.1 to represent 100 milliseconds).

- `redis-cli -r 5 INCR counter_value`

