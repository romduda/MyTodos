import './AddTask.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTaskAsync,
} from '../../Containers/AllLists/allListsSlice';

// TODO: Maybe move into Containers / Features since this is doing stuff now?

export function AddTask({ listId, sectionId }) {
  const dispatch = useDispatch();

  const [task, setTask] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setTask(value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(addTaskAsync({ title: task, listId, sectionId }));
    console.log(res);
    if (res) {
      setShowAlert(false);
      setTask('');
    } else {
      setShowAlert(true);
    }
  }
  // TODO: Set this to appear if error with adding task
  const alert = !showAlert ? '' : (
    <div className="alert alert-danger" role="alert">
      There was a problem creating the task, please try again.
    </div>
  );

  return (
    <div className="AddTask">
      <form onSubmit={handleSubmit}>
        <div className="AddTask__plus-icon">+ </div>
        <input
          onChange={handleChange}
          value={task}
          type="text"
          placeholder="Add To-Do"
          onFocus={(e) => (e.target.placeholder = 'New To-Do')} // eslint-disable-line
          onBlur={(e) => (e.target.placeholder = 'Add To-Do')} // eslint-disable-line
        />
      </form>
      {alert}
    </div>
  );
}
