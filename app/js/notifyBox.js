export default {
    templateUrl: './templates/notifyBox.html',
    controller: ['$scope', 'NotificationService', function($scope, NotificationService) {
        $scope.NotificationService = NotificationService;
        $scope.$watch('NotificationService', (newVal, oldVal, scope) => {
            console.log('notify');
            if (newVal) {
                scope.message = newVal.message;
                scope.isVisible = newVal.isVisible;
                scope.type = newVal.type;
            }
        }, true);
    }]
}
