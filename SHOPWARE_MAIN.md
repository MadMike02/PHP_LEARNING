# INSTALLATION
## DEVELOPMENT (6.4.20.2)
step 1- git clone https://github.com/shopware/development.git .
step 2 - dev-ops/docker/containers/app -- update dockerfile
step 3- ./psh.phar docker:start
step 4- delete composer.lock file at dev-ops/analyze
step 5 - enter in container -- ./psh.phar docker:ssh
step 6- ./psh.phar install (first time install)

## PRODUCTION
production installer---
step 1- https://www.shopware.com/en/changelog/ (download version here)
step 2- open in browser -  http://localhost/SHOPWARE/production/public (public directory)
step 3- install and enjoy


## THOUGH CMD (LATEST INSTALL)--
composer create-project shopware/production <project-name>
same process as above

# OTHERS
## Critrtia for discounted products
`$criteria->addFilter(
    new NotFilter(NotFilter::CONNECTION_AND,
        [
            new EqualsFilter('product.price.listPrice', null)
            
        ]
        ),
    new RangeFilter('product.price.percentage.gross', [
        RangeFilter::GTE => 0
    ]) 
);`

## Email Validation Regex
`
const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

return regex(value, emailValidation);
`

## FILTERS IN ADMINISTRATION
- criteria.addFilter(Criteria.not('AND',[Criteria.equals('parentId', null)])); -- not equals
- criteria.addFilter(Criteria.equals('parentId', null)); --- equals

## JS AND VUE EVENTS 
### JS EVENTS ---- 

- window.eventEmitter.publish("deleteMedia",[])
- window.eventEmitter.subscribe("deleteMedia",this._onDeleteMedia);

or by $emitter(shopware)

### ---VUE EVENTS---

- events emit in child method
	this.$emit('modal-save', this.newProperties);
- in parent-
	add event binding in calling of child 
	```
    <sw-product-add-properties-modal
		v-if="showAddPropertiesModal"
		:new-properties="newProperties"
		@modal-cancel="onCancelAddPropertiesModal"
		@modal-save="onSaveAddPropertiesModal"
	    />
    ```
## HOW TO ADD REACAPTCHA
- open https://www.google.com/recaptcha/admin/create
- fill details 
- copy both keys - client side integration key and server side integration key.


#  SCHEDULE TASK
REFERENCE ---- https://developer.shopware.com/docs/guides/plugins/plugins/plugin-fundamentals/add-scheduled-task

create Task `ExampleTask` and its handler `ExampleTaskHandler` then register both in services.xml
    ```
    <service id="Swag\BasicExample\Service\ScheduledTask\ExampleTask">
            <tag name="shopware.scheduled.task" />
        </service>
    <service id="Swag\BasicExample\Service\ScheduledTask\ExampleTaskHandler">
        <argument type="service" id="scheduled_task.repository" />
        <tag name="messenger.message_handler" />
    </service>
    ```
- `bin/console scheduled-task:register` -- registering task without uninstalling and installing plugin again
- `bin/console scheduled-task:run` -- running task
- `bin/console messenger:consume`

# GET DATA FROM SYSTEM CONFIGURATION
```
// <plugin root>/src/Service/ExampleService.php
<?php declare(strict_types=1);

namespace Swag\BasicExample\Service;

use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;

class ExampleService
{
    private SystemConfigService $systemConfigService;

    public function __construct(SystemConfigService $systemConfigService)
    {
        $this->systemConfigService = $systemConfigService;
    }

    public function getShopname(SalesChannelContext $context): string
    {
        return $this->systemConfigService->getString('core.basicInformation.shopName', $context->getSalesChannel()->getId());
    }
}
```

# INSTALL STATIC PLUGIN (i.e. ORGANIZATION BASED)
- Connect plugin using static-plugins
- step1: you need to upload the plugin folder into statc-plugin.
- step2: do the entry in composer.json that is present in the root.
- step3 entry will be like:-
- "require": {
 
"webkul/webkul-show-price-after-login": "^v1.1.9"
},
- step4: run composer require webkul/webkul-show-price-after-login
- Step 5: done

# SYMFONY SERVICES ARGUMENTS
# <argument> TAG attributes

## <iterator> (optional): Nested element used to define an iterator for arguments of a service.
```
<argument>
    <iterator>
        <argument>value1</argument>
        <argument>value2</argument>
    </iterator>
</argument>

```
## <collection> (optional): Nested element used to define an array or collection of values.
```
<argument>
    <collection>
        <argument>value1</argument>
        <argument>value2</argument>
    </collection>
</argument>

```
## <default> (optional): Nested element used to define a default value for the argument.
```
<argument>
    <default>default_value</default>
</argument>

```
## env (optional): Allows you to use environment variables as the argument's value

```
<argument env="SOME_ENV_VARIABLE" />
```
## on-invalid (optional): Defines what to do if the argument is invalid. Options include null, ignore, exception, and others, depending on Symfony's version.
```
<argument type="service" id="my_dependency_service" on-invalid="null" />

```

## default (optional): Sets a default value for the argument if it's not provided.

```
<argument type="string" default="default_value" />
```

## key (optional): Specifies the key for an associative array argument.

```
<argument type="collection">
    <argument key="key1">value1</argument>
    <argument key="key2">value2</argument>
</argument>

```

## index (optional): Indicates the index of the constructor argument if it's an array. Indexing starts at 0 for the first argument.

```
<argument type="collection" index="1">
    <!-- ... -->
</argument>

```

## id (optional): Specifies the identifier of a service or parameter to use as the argument's value.

```
<argument type="service" id="my_dependency_service" />

```

## type (optional): Specifies the type of the argument. This is typically used when the argument is a service or parameter, and the type hints are required.

```
<argument type="service" id="my_dependency_service" />

```

# <service> TAG attributes

## id (required): Specifies a unique identifier for the service. This is used to reference the service throughout your application.

```
<service id="my_service_id" class="MyClass">
    <!-- ... -->
</service>

```
## class (required): Defines the fully-qualified class name of the service.

```
<service id="my_service_id" class="MyClass">
    <!-- ... -->
</service>

```

## public (optional): Indicates whether the service is public or private. By default, services are public. If set to false, the service cannot be accessed directly from the container.
```
<service id="my_private_service" class="MyClass" public="false">
    <!-- ... -->
</service>


```

## parent (optional): Specifies another service as the parent of this service. This allows for inheritance of configuration settings.
```
<service id="my_child_service" class="MyChildClass" parent="my_parent_service">
    <!-- ... -->
</service>
```

## shared (optional): Determines if the service is shared or not. By default, services are shared. If set to false, a new instance of the service is created for each request.
```
<service id="my_non_shared_service" class="MyClass" shared="false">
    <!-- ... -->
</service>
```
## abstract (optional): Indicates that the service is an abstract definition and should not be instantiated directly.
```
<service id="my_abstract_service" class="MyClass" abstract="true">
    <!-- ... -->
</service>
```

## <argument> (optional): Specifies constructor arguments for the service. You can nest <argument> elements to provide multiple arguments.

```
<service id="my_service" class="MyClass">
    <argument>value1</argument>
    <argument>value2</argument>
</service>
```
## <call> (optional): Defines method calls to be executed on the service after instantiation. This is often used for dependency injection of method arguments.

```
<service id="my_service" class="MyClass">
    <call method="setDependency">
        <argument type="service" id="my_dependency_service" />
    </call>
</service>

```

## <tag> (optional): Adds a tag to the service, which can be used for various purposes, such as event subscribers, event listeners, and more.
```
<service id="my_event_listener" class="MyEventListener">
    <tag name="kernel.event_listener" event="my_event" method="onEvent" />
</service>
```

# SHOPWARE COMPONENTS
```
https://component-library.shopware.com/

## RADIO FIELD
- ```
<sw-radio-field 
label="Radio field example"
bordered
:options="radioOptions"
></sw-radio-field>
```
- ```
 radioOptions(){
            return [
                {'value': 2, 'name': 'Label #1'},
                {'value': 3, 'name': 'Label #2'},
                {'value': 4, 'name': 'Label #3'},
                {'value': 5, 'name': 'Label #4'},
                {'value': 6, 'name': 'Label #5'}
                ];
        }
	```
```