<?php declare(strict_types=1);

namespace SwagExchange\Core\Content\ExchangeInputFields;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(ExchangeInputFieldsEntity $entity)
 * @method void set(string $key, ExchangeInputFieldsEntity $entity)
 * @method ExchangeInputFieldsEntity[] getIterator()
 * @method ExchangeInputFieldsEntity[] getElements()
 * @method ExchangeInputFieldsEntity|null get(string $key)
 * @method ExchangeInputFieldsEntity|null first()
 * @method ExchangeInputFieldsEntity|null last()
 */
class ExchangeInputFieldsCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ExchangeInputFieldsEntity::class;
    }
}
