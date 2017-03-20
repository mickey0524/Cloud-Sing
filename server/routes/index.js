module.exports = function(app) {
    app.use(require('./song'));
    app.use(require('./playlist'));
    app.use(require('./singer'));
    app.use(require('./album'));
}
