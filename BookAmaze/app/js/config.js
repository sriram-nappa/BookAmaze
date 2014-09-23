require.config({
    paths: {
        jquery: '../../vendor/jquery/jquery.min',
        templates: '../templates',
        underscore: '../../vendor/templateLibs/underscore-min',
        backbone: '../../vendor/backboneLibs/backbone-min',
        globals: 'globals',
        text: '../../vendor/requireLibs/text',
        modernizer: '../../vendor/sliderLib/modernizr.custom.28468',
        slider: '../../vendor/sliderLib/jquery.cslider'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }

    }
});