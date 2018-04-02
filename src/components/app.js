class App {
  constructor(){
    this.lists = []
    this.initalizeEventListeners()
  }

  initalizeEventListeners(){
    //new list form
    this.createListForm = document.getElementById('create-list-form')
    this.newListTitle = document.getElementById("new-list-title")
    this.listsSection = document.getElementById('lists')
    this.parentListDropdown = document.getElementById("parent-list") //dropdown select

    //new task form
    this.createTaskForm = document.getElementById("create-task-form")
    this.newTaskDescription = document.getElementById("new-task-description")
    this.newTaskPriority = document.getElementById("new-task-priority")

    //event listeners
    this.createListForm.addEventListener("submit",this.createNewList.bind(this))
    this.createTaskForm.addEventListener("submit", this.createNewTask.bind(this))
  }

  createNewList() {
   event.preventDefault() //event implicitly passed to handler by listener
   const newList = new List(this.newListTitle.value)
   this.lists.push(newList)
   event.target.reset()
   this.render()
 }

 createNewTask() {
    event.preventDefault()
    const parentId = this.parentListDropdown.options[this.parentListDropdown.selectedIndex].dataset.id //we can find the selected option then grab the id stored as a dataset
    const parentList = this.lists.find(list => list.id == parentId) //because parentId is a string, we can utilize JS == type coersion to compare int to string
    const newTask = new Task(this.newTaskDescription.value, this.newTaskPriority.value) //create a new Task instance
    parentList.tasks.push(newTask) //.push() that onto the correct list
    console.log('PARENT LIST', parentList.tasks)
    event.target.reset() //clear the form inputs
    this.render() //re-render the app
  }


 render() {
    //this.lists.length === 0 ? this.createTaskForm.style.display = "none" : this.createTaskForm.style.display = "block" //hide the new task form if there are no lists to associate it with

     let listHTML = [];
     let dropdownHTML = [];

     this.lists.forEach(list => {
       listHTML.push(list.render())
       dropdownHTML.push(`<option data-id="${list.id}">${list.title}</option>`)
     })

     console.log(listHTML)

     this.parentListDropdown.innerHTML = dropdownHTML.join("")
     this.listsSection.innerHTML = listHTML.join("")
     console.log(this)
   }



}
