const baseUrl = 'http://localhost:3001';
const userId = '6082bc9b79cecad6de997c64';

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

export async function addTask({ title, listId, sectionId }) {
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
