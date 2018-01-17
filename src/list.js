/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1
  return class List {
    constructor(title) {
      if (!title) { throw new Error("New list title field cannot be empty") }
      this.id = id
      this.title = title
      this.tasks = []
      id++
    }

    render() {
      return (
        `<div class="list">
          <h2>
            <button data-id="${this.id}" class="delete-list">X</button>
            ${this.title}
          </h2>
          <ul>
            <li>${this.renderAllTasks()}</li>
          </ul>
        </div>
        `)
      }

      renderAllTasks() {
        return this.tasks.map(task => task.render()).join('')
      }
    }
})()
