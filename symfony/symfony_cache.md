# SYMFONY CACHE
`composer require symfony/cache`

- The Cache component provides features covering simple to advanced caching needs. It natively `implements PSR-6` and the `Cache Contracts` for greatest interoperability. It is designed for performance and resiliency, ships with ready to use adapters for the most common caching backends. It enables `tag-based invalidation` and `cache stampede protection` via `locking` and `early expiration`.

## Cache Stampede or Dogpile Problem
https://www.geeksforgeeks.org/cache-stempede-or-dogpile-problem-in-system-design/

The Cache Stempede or Dogpile Problem is defined as a situation `where the system receives` `multiple requests` for a `cached resource simultaneously` for which `the cache has already expired` or has become invalid.

Cache Stampede or Dogpile Problem in System Design is a phenomenon that can occur in systems that rely on caching to improve performance. As a result, the system experiences a sudden surge in demand, often overwhelming the backend resources and causing a performance degradation.

## Configuring Cache with FrameworkBundle
https://symfony.com/doc/current/cache.html

- Pool
    This is a service that you will interact with. Each pool will always have its own namespace and cache items. There is never a conflict between pools.

- Adapter
    An adapter is a template that you use to create pools.

- Provider
    A provider is a service that some adapters use to connect to the storage. Redis and Memcached are examples of such adapters. If a DSN is used as the provider then a service is automatically created.

There are `two pools that are always enabled` by default. They are` cache.app` and `cache.system`. The `system cache` is used for things like `annotations`, `serializer`, and `validation`. The `cache.app can be used in your code`. 

You can configure which adapter (template) they use by using the app and system key like:
### configuration for default pools
```
# config/packages/cache.yaml
framework:
    cache:
        app: cache.adapter.filesystem
        system: cache.adapter.system

```

### Available adapters in symfony
- cache.adapter.apcu
- cache.adapter.array
- cache.adapter.doctrine_dbal
- cache.adapter.filesystem
- cache.adapter.memcached
- cache.adapter.pdo
- cache.adapter.psr6
- cache.adapter.redis
- cache.adapter.redis_tag_aware (Redis adapter optimized to work with tags)

`Some of these adapters could be configured via shortcuts.`

```
# config/packages/cache.yaml
framework:
    cache:
        directory: '%kernel.cache_dir%/pools' # Only used with cache.adapter.filesystem

        default_doctrine_dbal_provider: 'doctrine.dbal.default_connection'
        default_psr6_provider: 'app.my_psr6_service'
        default_redis_provider: 'redis://localhost'
        default_memcached_provider: 'memcached://localhost'
        default_pdo_provider: 'app.my_pdo_service'

services:
    app.my_pdo_service:
        class: \PDO
        arguments: ['pgsql:host=localhost']
```

## Creating Custom (Namespaced) Pools

```
# config/packages/cache.yaml
framework:
    cache:
        default_memcached_provider: 'memcached://localhost'

        pools:
            # creates a "custom_thing.cache" service
            # autowireable via "CacheInterface $customThingCache"
            # uses the "app" cache configuration
            custom_thing.cache:
                adapter: cache.app

            # creates a "my_cache_pool" service
            # autowireable via "CacheInterface $myCachePool"
            my_cache_pool:
                adapter: cache.adapter.filesystem

            # uses the default_memcached_provider from above
            acme.cache:
                adapter: cache.adapter.memcached

            # control adapter's configuration
            foobar.cache:
                adapter: cache.adapter.memcached
                provider: 'memcached://user:password@example.com'

            # uses the "foobar.cache" pool as its backend but controls
            # the lifetime and (like all pools) has a separate cache namespace
            short_cache:
                adapter: foobar.cache
                default_lifetime: 60
```
- Each pool manages a set of independent cache keys: keys from different pools never collide, even if they share the same backend.

## USING CACHE POOLS IN METHOD

```
use Symfony\Contracts\Cache\CacheInterface;

// from a controller method
public function listProducts(CacheInterface $customThingCache): Response
{
    // ...
}
```

## Creating a Cache Chain
`Different cache adapters` have different `strengths and weaknesses`. Some might be `really quick` `but optimized` to store small items and some may be able to contain a `lot of data` `but are quite` slow. To get the `best of both` worlds you may use a `chain of adapters`.

A cache chain `combines several cache pools into a single one`. When storing an item in a cache chain, Symfony `stores it in all pools sequentially`. When retrieving an item, Symfony tries to get it from the first pool. If it's not found, it tries the next pools until the item is found or an exception is thrown. Because of this behavior, it's recommended to `define the adapters` in the chain in `order from fastest to slowest`.

```
# config/packages/cache.yaml
framework:
    cache:
        pools:
            my_cache_pool:
                default_lifetime: 31536000  # One year
                adapters:
                  - cache.adapter.array
                  - cache.adapter.apcu
                  - {name: cache.adapter.redis, provider: 'redis://user:password@example.com'}
```

## Using Cache Tags
In applications with `many cache keys` it could be useful to `organize` the data stored to be able to `invalidate` the cache more efficiently.

- `Cache invalidation` refers to process during which web cache proxies declare cached content as invalid, meaning it will not longer be served as the most current piece of content when it is requested.

```
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\Cache\TagAwareCacheInterface;

class SomeClass
{
    // using autowiring to inject the cache pool
    public function __construct(
        private TagAwareCacheInterface $myCachePool,
    ) {
    }

    public function someMethod(): void
    {
        $value0 = $this->myCachePool->get('item_0', function (ItemInterface $item): string {
            $item->tag(['foo', 'bar']);

            return 'debug';
        });

        $value1 = $this->myCachePool->get('item_1', function (ItemInterface $item): string {
            $item->tag('foo');

            return 'debug';
        });

        // Remove all cache keys tagged with "bar"
        $this->myCachePool->invalidateTags(['bar']);
    }
}

# config/packages/cache.yaml
framework:
    cache:
        pools:
            my_cache_pool:
                adapter: cache.adapter.redis
                tags: true
```

## Clearing the Cache
https://symfony.com/doc/current/cache.html#clearing-the-cache

To clear the cache you can use the `bin/console cache:pool:clear [pool]` command. That will remove all the entries from your storage and you will have to recalculate all the values. You can also group your pools into "cache clearers". 
There are 3 cache clearers by default:

- list all pools:
    `php bin/console cache:pool:list`
- Clear one pool:
    `php bin/console cache:pool:clear my_cache_pool` 
- Clear all custom pools:
    `php bin/console cache:pool:clear cache.app_clearer`
- Clear all cache pools:
    `php bin/console cache:pool:clear --all`
- Clear all cache pools except some:
    `php bin/console cache:pool:clear --all --exclude=my_cache_pool --exclude=another_cache_pool`
- Clear all caches everywhere:
    `php bin/console cache:pool:clear cache.global_clearer`
- Clear cache by tag(s):
    `php bin/console cache:pool:invalidate-tags tag1`
    `php bin/console cache:pool:invalidate-tags tag1 tag2`
    invalidate tag1 & tag2 from cache.app pool
    `php bin/console cache:pool:invalidate-tags tag1 tag2 --pool=cache.app`
    invalidate tag1 & tag2 from cache1 & cache2 pool
    `php bin/console cache:pool:invalidate-tags tag1 tag2 -p cache1 -p cache2`

## Computing Cache Values Asynchronously
https://symfony.com/doc/current/cache.html#computing-cache-values-asynchronously

## CUSTOM MANAGE CACHE ITEMS FROM OUTSIDE SYMFONY FRAMEWORK
https://symfony.com/doc/current/components/cache/cache_items.html

## OUTSITE SYMFONY CACHE COMPONENT FROM FRAMEWORK
https://symfony.com/doc/current/components/cache.html#installation