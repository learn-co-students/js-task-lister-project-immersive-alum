/*
task is responsible for creating a single task object
*/

function Task(description,priority){

    console.log('IN TASK')
    this.id = 1;
    this.description = description;
    this.priority = priority;

    this.id++;

    return (
      `<li data-id=${this.id}">Task: ${this.description} <br> Priority: ${this.priority}</li>"`
    )
}
