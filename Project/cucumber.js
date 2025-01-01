module.exports = {
   default: {
       paths: ['src/features/'],
       require: ['src/step_definitions/*.js'],
       format: ['html:cucumber-report.html', 'summary']
   }
};