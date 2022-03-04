class Employee
{
    constructor (employeeID, name, position, salary){
        
        this.employeeID = employeeID;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
    describe(){
        return `Employee ID : ${this.emp_id}\nName : ${this.name}\nPosition : ${this.position}\nSalary : ${this.salary} `
    }
}

class Department
{
    constructor (name){
       
        this.name = name;
        this.staffs = [];  
        this.salary = [];  
    }
    addStaff(staff){
        if(staff instanceof Employee){  
            this.staffs.push(staff);
        }else{
            throw new Error(`you can only add an instance of Employee. Argument is not a Employee:${staff}`);
        }
    }
    
}


class Menu
{
    constructor() {
        this.departments =[];
        this.selectedDepartment = null; 
    }
    start(){
        let selection = this.showMainMenuOption();  

        while (selection != 0){
            switch(selection){
                case '1' :
                    this.createDepartment();
                    break;
                case '2' :
                    this.viewDepartment();
                    break;
                case '3' :
                    this.deleteDepartment();
                    break;
                case '4' : 
                    this.displayDepartment();
                    break;
                default :
                    selection = 0;
   
            }
            selection = this.showMainMenuOption();
        }
        alert('Goodbye!');
    }
    showMainMenuOption(){ //2nd method after start
        return prompt(`
        0) Exit
        1) Create new department
        2) View department
        3) Delete department
        4) Display all department
        `);
    }

    showDepartmentMenuOptions(departmentInfo){
        return prompt(`
        0) Back
        1) Create employee
        2) Delete employee
        --------------------
        ${departmentInfo}
        `);
    }
    displayDepartment(){
        let departmentString ='';
        for(let i =0; i<this.departments.length; i++){
            departmentString += i + ')' + this.departments[i].name + '\n';
        }
        alert(departmentString);
    }
    createDepartment(){
        let name = prompt('Enter name for new department :');
        this.departments.push(new Department(name)); 
    }                                                 
    viewDepartment(){
        let index = prompt ('Enter the index of the department you wish to view:');

        if(index > -1 && index < this.departments.length){
            this.selectedDepartment = this.departments[index];

            let description = 'Department name : ' + this.selectedDepartment.name + '\n';
            
            for(let i=0; i<this.selectedDepartment.staffs.length; i++){
                description += i + ')'+ 'EmployeeID : ' + this.selectedDepartment.staffs[i].employeeID +'\n'
                + 'Employee Name : ' + this.selectedDepartment.staffs[i].name +'\n'
                + 'Position : ' + this.selectedDepartment.staffs[i].position+'\n'
                + 'Annual Salary : ' + this.selectedDepartment.staffs[i].salary+'\n'
            }
            let selection = this.showDepartmentMenuOptions(description);
            switch(selection){
                case '1' :
                    this.createEmployee();
                    break;
                case '2' :
                    this.deleteEmployee();

            }
        }
    }
    deleteDepartment() {

        let index = prompt ('Enter the index of the department you wish to delete:');
        if(index > -1 && index < this.departments.length){
            this.departments.splice(index, 1);
        }
    }
             
    createEmployee(){
        
        let employeeID = prompt ('Enter employee ID');
        let name = prompt('Enter employee name :');
        let position=prompt ('Enter employee position : ');
        let salary = prompt ('Enter employee annual salary :');
        this.selectedDepartment.staffs.push(new Employee(employeeID, name, position, salary));
    }
    deleteEmployee(){

        let index = prompt('Enter the index of the employee you wish to delete:');
        if(index >-1 && index < this.selectedDepartment.staffs.length){
            this.selectedDepartment.staffs.splice(index, 1);
        }
    }
}
let menu = new Menu();
    menu.start();
