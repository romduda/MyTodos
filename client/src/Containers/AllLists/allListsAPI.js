const baseUrl = 'http://localhost:3001';
const userId = '60871178721df63b1cbd1593';

export async function fetchAllLists() {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`);
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addList(title) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function deleteList(listId) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addSection({ title, listId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function deleteSection({ listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addNewTask({ title, listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addExistingTask({ taskId, listId, sectionId }) {
  console.log('inside addExistingTask');
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateTask({ taskId, payload }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}
