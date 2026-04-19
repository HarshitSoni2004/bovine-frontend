const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

async function parseJson(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error('Invalid server response');
  }
}

export async function predictImage(file) {
  const payload = new FormData();
  payload.append('file', file);

  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    body: payload,
  });

  if (!response.ok) {
    const payload = await parseJson(response);
    const message = payload?.detail || 'Prediction failed. Please try another image.';
    throw new Error(message);
  }

  return parseJson(response);
}

export async function fetchBreedInfo(breedName) {
  const response = await fetch(`${API_BASE}/breed-info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ breed_name: breedName }),
  });

  const data = await parseJson(response);
  if (!data) {
    throw new Error('Invalid breed info response.');
  }

  if (!data.success) {
    const info = data.info || {};
    return { info, warning: data.error || 'Breed details returned with a warning.' };
  }

  return { info: data.info };
}

export async function sendChatMessage(message) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await parseJson(response);
  if (!data) {
    throw new Error('Invalid chat response.');
  }

  if (!data.success) {
    throw new Error(data.response || 'Chat request failed.');
  }

  return data.response;
}
