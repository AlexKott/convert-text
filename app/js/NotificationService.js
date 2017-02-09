export default ['$timeout', function($timeout) {
    return {
        isVisible: false,
        message: 'alert',
        type: 'confirm',
        show(type, message) {
            this.message = message;
            this.type = type;
            this.isVisible = true;
            $timeout(() => this.isVisible = false, 2000);
        }
    };
}]
