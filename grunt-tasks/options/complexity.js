module.exports = {
    generic: {
        src: [
            'src/**/*.js',
            '!src/**/*.spec.js',
            '!src/**/*.page.js'
        ],
        options: {
            breakOnErrors: false
        }
    },
    pageObjects: {
        src: [
            'src/**/*.page.js'
        ],
        options: {
            breakOnErrors: false
        }
    }
};
