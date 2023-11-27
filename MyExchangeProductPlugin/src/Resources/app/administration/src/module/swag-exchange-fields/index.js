import './page/swag-exchange-fields-list';
import './page/swag-exchange-fields-detail';
import './page/swag-exchange-fields-create';
import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

Shopware.Module.register('swag-exchange-fields', {
    type: 'plugin',
    name: 'Example',
    title: 'swag-exchange-fields.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    color: '#655696',
    icon: 'regular-exchange-alt-s',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'swag-exchange-fields-list',
            path: 'list',
            meta: {
                parentPath: 'sw.settings.index.plugins'
            }
        },
        detail: {
            component: 'swag-exchange-fields-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'swag.exchange.fields.list'
            }
        },
        create: {
            component: 'swag-exchange-fields-create',
            path: 'create',
            meta: {
                parentPath: 'swag.exchange.fields.create'
            }
        }
    },

    settingsItem: [{
        name: 'swag-exchange-fields',
        label: 'swag-exchange-fields.general.mainMenuItemGeneral',
        to: 'swag.exchange.fields.list',
        icon: '#655696',
        icon: 'regular-exchange-alt-s',
        group:'plugins'
    }]
});
