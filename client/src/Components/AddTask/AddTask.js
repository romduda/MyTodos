import './AddTask.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AutocompleteItem } from '../AutocompleteItem/AutocompleteItem';
import {
  addNewTaskAsync,
  addExistingTaskAsync,
} from '../../Containers/AllLists/allListsSlice';

// Mock to be replaced with state in redux store
const tasksInOtherLists = [
  {
    title: 'Task to add to multiple lists',
    _id: '6086928db8d557603201e2d4',
  },
];
// TODO: Maybe move into Containers / Features since this is doing stuff now?

export function AddTask({ listId, sectionId }) {
  const dispatch = useDispatch();

  const [taskTitle, setTask] = useState('');
  const [matchingTasks, setMatchingTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setTask(value);
    if (value === '') {
      setMatchingTasks([]);
    } else {
      setMatchingTasks(() => tasksInOtherLists.filter((task) => (
        task.title.toLowerCase().includes(value.toLowerCase())
      )));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(addNewTaskAsync({ title: taskTitle, listId, sectionId }));
    console.log(res);
    if (res) {
      setShowAlert(false);
      setTask('');
    } else {
      setShowAlert(true);
    }
  }

  async function handleAddExistingTask(e, taskDetails) {
    try {
      await dispatch(addExistingTaskAsync(taskDetails));
      setTask('');
      setMatchingTasks([]);
    } catch (error) {
      console.log(error);
    }
  }
  // TODO: Set this to appear if error with adding task
  const alert = !showAlert ? '' : (
    <div className="alert alert-danger" role="alert">
      There was a problem creating the task, please try again.
    </div>
  );

  const autocompleteResults = (
    <div className="AddTask__autocomplete-results">
      {matchingTasks.map((task) => (
        <AutocompleteItem
          className="AddTask__autocomplete-item"
          key={task._id}
          taskId={task._id}
          listId={listId}
          sectionId={sectionId}
          handleAddExistingTask={handleAddExistingTask}
          taskTitle={task.title}
        />
      ))}
    </div>
  );

  return (
    <div className="AddTask">
      <form onSubmit={handleSubmit}>
        <div className="AddTask__plus-icon">+ </div>
        <input
          onChange={handleChange}
          value={taskTitle}
          type="text"
          placeholder="Add To-Do"
          onFocus={(e) => (e.target.placeholder = 'New To-Do')} // eslint-disable-line
          onBlur={(e) => (e.target.placeholder = 'Add To-Do')} // eslint-disable-line
        />
      </form>
      {autocompleteResults}
      {alert}
    </div>
  );
}
