import conversionList from './conversionList';
import newConversion from './newConversion';
import notifyBox from './notifyBox';
import NotificationService from './NotificationService';

angular
    .module('app', ['ngRoute'])

    .factory('NotificationService', NotificationService)

    .component('conversionList', conversionList)
    .component('newConversion', newConversion)
    .component('notifyBox', notifyBox)
    .component('svgTemplates', { templateUrl: './templates/svgTemplates.html' })

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', { template: '<conversion-list />' })
            .when('/new/', { template: '<new-conversion />' })
            .otherwise('/');
    }]);
