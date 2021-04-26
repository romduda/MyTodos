import './Task.css';
import React, { useState, useEffect, useRef } from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useDispatch } from 'react-redux';
import { setTaskTitle, updateTaskAsync } from '../../Containers/AllLists/allListsSlice';

export function Task({
  id,
  title,
  complete,
  sectionId,
}) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const textInput = useRef(null);
  useEffect(() => {
    if (editing) {
      textInput.current.focus();
    }
  }, [editing]);

  function checkboxClickHandler() {
    dispatch(updateTaskAsync({
      taskId: id,
      payload: {
        complete: !complete,
      },
    }));
  }

  function enableEditingClickHandler() {
    setEditing(true);
  }

  function handleTextInputKeyDown(e) {
    if (e.keyCode === 27) {
      setEditing(false);
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    dispatch(setTaskTitle({
      title: value,
      sectionId,
      taskId: id,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(updateTaskAsync({
      taskId: id,
      payload: {
        title,
      },
    }));
    if (res) {
      setEditing(false);
    } else {
      console.warn('Problem editing task title');
    }
  }

  let renderedCompletion;
  if (complete) {
    renderedCompletion = (
      <div
        className="Task__checkbox-wrap"
        id={id}
        role="button"
        onClick={checkboxClickHandler}
        onKeyPress={checkboxClickHandler}
        tabIndex={0}
      >
        <CheckBoxIcon />
      </div>
    );
  } else {
    renderedCompletion = (
      <div
        className="Task__checkbox-wrap"
        id={id}
        role="button"
        onClick={checkboxClickHandler}
        onKeyPress={checkboxClickHandler}
        tabIndex={0}
      >
        <CheckBoxOutlineBlankIcon />
      </div>
    );
  }

  let renderedTask;
  if (!editing) {
    renderedTask = (
      <div className="Task__view-wrap">
        {renderedCompletion}
        <div
          className="Task__main-wrap"
          id={id}
          role="button"
          onClick={enableEditingClickHandler}
          onKeyPress={enableEditingClickHandler}
          tabIndex={0}
        >
          <div className="Task__title">{title}</div>
        </div>
      </div>
    );
  } else {
    renderedTask = (
      <div className="Task__editing-wrap">
        {renderedCompletion}
        <form onSubmit={handleSubmit} className="Task__form-edit-title">
          <input
            ref={textInput}
            onChange={handleChange}
            onKeyDown={handleTextInputKeyDown}
            value={title}
            type="text"
          />
        </form>
      </div>
    );
  }

  return (
    <div className="Task">
      {renderedTask}
    </div>
  );
}
