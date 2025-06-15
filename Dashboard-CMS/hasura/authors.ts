export const INSERT_AUTHOR = `mutation InsertAuthor($surname: String!, $name: String!) {
    insert_author(objects: {surname: $surname, name: $name}) {
      returning {
        id_author
        surname
        name
      }
    }
  }`

export const GET_ALL_AUTHORS = `query GetAllAuthors {
    author {
      id_author
      surname
      name
    }
  }`
