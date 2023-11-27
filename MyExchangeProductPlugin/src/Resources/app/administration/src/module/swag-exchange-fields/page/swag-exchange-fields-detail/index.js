const { Component, Mixin } = Shopware;

import template from './index.html.twig';

Component.register('swag-exchange-fields-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification')
    ],
    data() {
        return {
           
        };
    },
    computed: {
        
    },
    created(){

    },
    methods:{

    },
    metaInfo() {
        return {
            title: this.$createTitle(this.identifier)
        };
    }
})
