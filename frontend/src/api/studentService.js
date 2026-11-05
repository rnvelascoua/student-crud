const BASE_URL = '/velasco/students';

/**
 * Fetch all students from backend
 */
export async function getStudents() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch students (${response.status})`);
  }
  return response.json();
}

/**
 * Fetch single student by id
 */
export async function getStudentById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch student #${id} (${response.status})`);
  }
  return response.json();
}

/**
 * Create a new student
 * Payload: { firstname, lastname, course, section }
 */
export async function createStudent(studentData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student by id
 * Payload: { firstname, lastname, course, section }
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student #${id} (${response.status})`);
  }
  return response.json();
}

/**
 * Delete a student by id
 */
export async function deleteStudent(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(responseText || `Failed to delete student #${id} (${response.status})`);
  }
  return responseText;
}
