import { API_URL } from './constants';

export default {
    templateUrl: './templates/conversionList.html',
    controller: ['$scope', '$http', function($scope, $http) {
        function triggerReload() {
            loadFiles($http).then((files) => {
                $scope.fileList = files;
                $scope.$digest();
            });
        }

        $scope.fileList = [];
        triggerReload();
        $scope.$on('updateList', triggerReload);
    }]
};

function loadFiles(http) {
    return new Promise((resolve, reject) => {
        http
            .get(API_URL)
            .then((response) => {
                const fileList = response.data;
                fileList.forEach((file) => {
                    file.huTime = moment(file.createdAt).format('MMM Do YYYY');
                });
                resolve(fileList);
            });
    });
}
