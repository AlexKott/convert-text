export default ['$timeout', function($timeout) {
    return {
        isVisible: false,
        message: '',
        type: '',
        show(type, message) {
            $timeout.cancel(this.timeout);
            $timeout(() => {
                this.message = message;
                this.type = type;
                this.isVisible = true;
            }, 0);
            this.timeout = $timeout(() => {
                this.isVisible = false;
                this.message = '';
            }, 2000);
        }
    };
}]
