import conversionList from './conversionList';
import newConversion from './newConversion';

angular
    .module('app', ['ngRoute'])

    .component('conversionList', conversionList)
    .component('newConversion', newConversion)
    .component('svgTemplates', { templateUrl: './templates/svgTemplates.html' })

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', { template: '<conversion-list />' })
            .when('/new/', { template: '<new-conversion />' })
            .otherwise('/');
    }]);
