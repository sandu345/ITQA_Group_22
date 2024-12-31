module.exports = {
    default: {
        paths: ['src/features/'],
        require: ['src/step_definitions/*.js'],
        format: ['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json', 'summary']
    }
};
