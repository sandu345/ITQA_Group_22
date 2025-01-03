module.exports = {
  default: '--publish-quiet',
  ui: [
    '--require-module @babel/register',
    '--require src/ui/step_definitions/**/*.js',
    '--format json:reports/ui-cucumber-report.json',
    '--format progress',
    'src/ui/features/**/*.feature'
  ].join(' '),
  api: [
    '--require-module @babel/register',
    '--require src/api/step_definitions/**/*.js',
    '--format json:reports/api-cucumber-report.json',
    '--format progress',
    'src/api/features/**/*.feature'
  ].join(' ')
};