module.exports = {
    urls: {
        login: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        dashboard: '**/dashboard/index',
        pim: 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList',
        recruitment: 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy',
        addJobVacancy: 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy',
        leaveList: 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList',
        defineLeavePeriod: 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/defineLeavePeriod',
        admin: '**/admin/viewSystemUsers',
        addEmployee: 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee'
    },
    credentials: {
        admin: {
            username: 'admin',
            password: 'admin123'
        }
    },
    selectors: {
        usernameInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input',
        passwordInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input',
        loginButton: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button',
        pimModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a',
        addEmployeeForm: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]',
        saveButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]',
        successMessage: '.oxd-text.oxd-text--toast-message.oxd-toast-content-text',
        timeModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[4]/a/span',
        timesheetSearchBar: '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[1]/div/div/div/div[2]/div/div/input',
        timesheetViewButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[2]/button',
        pendingActionViewButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[3]/div/button',
        timesheetDetails: '//*[@id="app"]/div[1]/div[2]/div[2]/div',
        recordsMessage: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span',
        searchInput: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input',
        adminMenu: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a',
        addButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button',
        cancelButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/button[1]',
        profileButton: 'xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p',
        logoutButton: 'xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a',
        pimPage: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a',
        employmentStatus: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div/div[1]',
        fullTimePermanent: 'text=Full-Time Permanent',
        searchButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]',
        employeeNameInput: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input',
        employeeIdInput: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/input',
        resetButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[1]',
        leaveApplication: 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList',
        fromDateInput: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input',
        toDateInput: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/div/div/input',
        leaveTypeDropdown: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div[1]/div[1]',
        leaveRequests: '.oxd-table-card',
        noRecordsMessage: 'span.oxd-text--span:has-text("No Records Found")',
        recordFoundMessage: 'span:has-text("Record Found"), span:has-text("Records Found")',
        startMonthDropdown: 'div.oxd-input-group:has(label:has-text("Start Month")) div.oxd-select-text-input',
        startDateDropdown: 'div.oxd-input-group:has(label:has-text("Start Date")) div.oxd-select-text-input',
        endDateElement: 'div.oxd-input-group:has(label:has-text("End Date")) p.oxd-text--subtitle-2.orangehrm-leave-period',
        currentLeavePeriodElement: 'div.oxd-input-group:has(label:has-text("Current Leave Period")) p.oxd-text--subtitle-2.orangehrm-leave-period',
        addEmployeeButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button'
    }
};
