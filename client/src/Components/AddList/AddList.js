import './AddList.css';
import { useState } from 'react';

export function AddList({addListHandler}) {
  const [list, setList] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    setList(value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await addListHandler(list);
    if (res) {
      setShowAlert(false);
      setList('');
    } else {
      setShowAlert(true);
    }
  }

  const alert = !showAlert ? '' : (
    <div class="alert alert-danger" role="alert">
      There was a problem creating the list, please try again.
    </div>);

  return (
    <div className="AddList">
      <form onChange={handleChange} onSubmit={handleSubmit} >
        <input value={list} type="text"/>
      </form>
      {alert}
    </div>
  );
}