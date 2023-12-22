# Optimize database connection and decrease load time.

## DATABASE OPTIMIZE:
- Server configs-
    - Adjusting parameters such as query cache size, buffer pool size, and thread concurrency can have a significant impact on performance. Ensure these settings are optimized based on the specific workload and resources available.

- Indexing - 
    - https://www.digitalocean.com/community/tutorials/how-to-use-indexes-in-mysql
    - create indexes in database to decrease the query results time.

- Replications 
    - https://www.digitalocean.com/community/tutorials/how-to-set-up-replication-in-mysql
    - Create replica sets to improve availability, scalabilty and overall performance.
    - Make copy of data in number of mysql instances
    - Do update, create, delete operations in master(source) node.
    - Do read operations in slave (replica) node.
    - Update connections in application according to new setup.

- Shardings/ partitioning
    - consider partitioning your database to distribute the load across multiple servers. This helps to scale horizontally and improves overall performance, especially for large datasets.
    - For large-scale applications, consider sharding the database, which involves partitioning data across multiple database servers. This approach can enhance read and write performance.

## APPLICATION OPTIMIZE:
- Caching
    - REDIS - symfony/cache component with redis adapter.
    - Cache data coming from database so next time when user requests new data then the results will be returned from cache instead of making new request to database.

- Queries optimize
    - optimize your queries by avoiding unnecessary joins and using appropriate filters to narrow down the data being retrieved
    - `Avoid N+1 Queries`: Be mindful of N+1 query problems, where an application generates multiple database queries for each item in a loop, resulting in a large number of queries. Use eager loading or batch queries to fetch data efficiently.

- Use cloud
    - AWS RDS and other services to manage load and availabilty with serveral services named RDS proxy server, Load balancing or AWS Aurora (costly but effective).

## MYSQL COMMANDS
- INSERT INTO database2.table2 SELECT * from database1.table1


## MYSQL INDEXING 
- `create index index_name on tableName (column1, column2 ..)`;
    Index will work on equal queries and the index will be used only if the query is using first column.
- `drop index index_name on tableName`;
- `SHOW INDEX FROM tableName;` -- list indexes on table