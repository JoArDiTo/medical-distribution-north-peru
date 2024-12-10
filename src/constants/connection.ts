export const query = async (map_data: any) => {
  const url = `http://localhost:5000/calculate_route`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ map_data }),
  }).then((res) => res.json())
}