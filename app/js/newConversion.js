import { API_URL } from './constants';

export default {
    templateUrl: './templates/newConversion.html',
    controller: ['$http', function($http) {
        const quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: [['bold', 'italic', 'underline']]
            }
        });
        this.convert = (type) => {
            $http
                .post(API_URL, {
                    type,
                    name: this.convName,
                    content: quill.root.innerHTML
                })
                .then((data) => console.log(data));
        }
    }]
};
