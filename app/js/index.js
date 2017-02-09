import conversionList from './conversionList';
import newConversion from './newConversion';
import notifyBox from './notifyBox';
import NotificationService from './NotificationService';
import { WEBSOCKET_URL, UPDATE } from './constants';

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
    }])

    .run(['$rootScope', 'NotificationService', ($rootScope, NotificationService) => {
        const ws = new WebSocket(WEBSOCKET_URL);

        ws.onmessage = (message) => {
            const msg = JSON.parse(message.data);
            NotificationService.show(msg.type, msg.content);
            if (msg.type === UPDATE) {
                $rootScope.$broadcast('updateList');
            }
        };
    }]);
