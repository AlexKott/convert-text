import { API_URL, CONFIRM, ERROR } from './constants';

export default {
    templateUrl: './templates/newConversion.html',
    controller: ['$http', 'NotificationService', function($http, NotificationService) {
        const quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: [['bold', 'italic', 'underline']]
            }
        });
        NotificationService.show(CONFIRM, 'confirmed');
        this.convert = (type) => {
            $http
                .post(API_URL, {
                    type,
                    name: this.convName,
                    content: quill.root.innerHTML
                })
                .then((data) => {
                    NotificationService.show(CONFIRM, 'New conversion posted!');
                });
        }
    }]
};
