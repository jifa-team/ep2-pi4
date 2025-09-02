const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(import.meta.env.VITE_API_BASE_URL + path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
  }

  // Retorna a resposta para ser processada (ex: .json()) no local da chamada
  return response;
};

export default apiFetch;
