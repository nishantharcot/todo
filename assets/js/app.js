(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const model = {
        tasks: {

        },
      };
      const view = {
        init: () => {
          view.render();
        },
        render: () => {
          const addtaskbutton = document.getElementById('addtodo');
          addtaskbutton.onclick = () => {
            controller.addTask();
          };
          const taskList = document.getElementById('taskstore');
          taskList.innerHTML = '';
          const fortask = Object.keys(model.tasks);
          if (fortask.length === 0) {
            taskList.innerHTML = `
              <h1 class="title is-1">
                No tasks to show!!
              </h1>
            `;
          }
          for (let i = 0; i < fortask.length; i++) {
            const item = document.createElement('div');
            item.innerHTML = `
              <div class="table-container">
                <table class="table">
                  ${i === 0 ?
                  `
                      <thead>
                        <tr is-size-2>
                          <th>Tasks</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                  `:
                  `
                      <thead>
                        
                      </thead>
                  `
  }
                  <tbody>
                    <tr>
                      <td>
                        ${fortask[i]}
                      </td>
                      <td>
                        ${model.tasks[fortask[i]].status}
                      </td>
                      <td>
                        <a id="done${fortask[i]}" class="button is-small">
                          <i class="fas fa-check-circle">
                          </i>
                        </a>
                      </td>
                      <td>
                        <a id="remove${fortask[i]}" class="button is-small">
                          <i class="fas fa-trash-alt">
                          </i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>

                  </tfoot>
                </table>
              </div>
            `;
            taskList.appendChild(item);
            const completeButton = document.getElementById(
                'done' + `${fortask[i]}`);
            completeButton.onclick = () => {
              model.tasks[fortask[i]].status = 'done';
              view.render();
            };
            const deleteButton = document.getElementById(
                'remove' + `${fortask[i]}`);
            deleteButton.onclick = () => {
              delete model.tasks[fortask[i]];
              view.render();
            };
          }
        },
      };
      const controller = {
        addTask: () => {
          const taskData = document.getElementById('writetask').value;
          if (model.tasks[taskData] === undefined) {
            model.tasks[taskData] = {status: 'incomplete'};
            alert(`Task ${taskData} is added`);
          } else {
            alert('Task is already present');
          }
          view.render();
        },
        init: () => {
          view.init();
        },
      };
      controller.init();
    }
  }
)();
