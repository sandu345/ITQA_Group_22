module.exports = {
   default: {
      paths: ['src/ui/features/', 'src/api/features/'],
      require: ['src/ui/step_definitions/*.js', 'src/api/step_definitions/*.js'],
      format: ['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json', 'summary'],
      formatOptions: { snippetInterface: 'async-await' },
      timeout: 60000
   },
   ui: {
      paths: ['src/ui/features/'],
      require: ['src/ui/step_definitions/*.js'],
      format: ['html:reports/ui-cucumber-report.html', 'json:reports/ui-cucumber-report.json', 'summary']
   },
   api: {
      paths: ['src/api/features/'],
      require: ['src/api/step_definitions/*.js'],
      format: ['html:reports/api-cucumber-report.html', 'json:reports/api-cucumber-report.json', 'summary']
   }
};