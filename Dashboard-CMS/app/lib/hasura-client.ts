
export async function queryHasura(
  query: string,
  variables?: Record<string, unknown>
) {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const jwt      = process.env.NEXT_PUBLIC_HASURA_JWT!;

  // build headers
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
  };

  // Prefer JWT auth
  if (jwt) {
    headers['Authorization'] = `Bearer ${jwt}`;
  }
 
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}
