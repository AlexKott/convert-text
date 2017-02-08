import { API_URL } from './constants';

export default {
    templateUrl: './templates/conversionList.html',
    controller: ['$http', function($http) {
        this.fileList = [];
        $http
            .get(API_URL)
            .then((response) => {
                const fileList = response.data;
                fileList.forEach((file) => {
                    file.huTime = moment(file.createdAt).format('MMM Do YYYY');
                })
                this.fileList = fileList;
            })
    }]
};
