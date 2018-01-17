class App {
  constructor() {
    this.lists = []
    this.initializeEventListeners()
  }

  initializeEventListeners() {
    this.createListForm = document.getElementById("create-list-form")
    this.newListTitle = document.getElementById("new-list-title")
    this.createTaskForm = document.getElementById("create-task-form")
    this.parentListDropdown = document.getElementById("parent-list")
    this.newTaskDescription = document.getElementById("new-task-description")
    this.newTaskPriority = document.getElementById("new-task-priority")
    this.listsSection = document.getElementById("lists")
    this.createListForm.addEventListener("submit", this.createNewList.bind(this))
    this.createTaskForm.addEventListener("submit", this.createNewTask.bind(this))
    this.listsSection.addEventListener("click", this.deleteList.bind(this))
  }

  createNewList() {
    event.preventDefault()
    const newList = new List(this.newListTitle.value)
    this.lists.push(newList)
    event.target.reset()
    this.render()
  }

  createNewTask() {
    event.preventDefault()
    const parentId = this.parentListDropdown.options[this.parentListDropdown.selectedIndex].dataset.id
    const parentList = this.lists.find(list => list.id == parentId)
    const newTask = new Task(this.newTaskDescription.value, this.newTaskPriority.value)

    parentList.tasks.push(newTask)
    event.target.reset()
    this.render()
  }

  deleteList() {
    if (event.target.className === "delete-list") {
      const listId = parseInt(event.target.dataset.id)
      this.lists = this.lists.filter(list => list.id !== listId)
    }
    this.render()
  }

  render() {
    this.lists.length === 0 ? this.createTaskForm.style.display = "none" : this.createTaskForm.style.display = "block"

    let listHTML = []
    let dropdownHTML = []

    this.lists.forEach(list => {
      listHTML.push(list.render())
      dropdownHTML.push(`<option data-id="${list.id}">${list.title}</option>`)
    })

    this.parentListDropdown.innerHTML = dropdownHTML.join('')
    this.listsSection.innerHTML = listHTML.join('')
    console.log(this)
  }

}