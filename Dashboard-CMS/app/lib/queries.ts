import { gql } from '@apollo/client';

export const GET_GALLERY = gql`
  query GetGallery {
    page(order_by: { date_publication: desc }) {
      id_page
      title
      imageurl
      isactive
      date_publication
      lien_de_page
    }
  }
`;

export const PUBLISH_PAGE = gql`
  mutation PublishPage($id: Int!) {
    update_page_by_pk(
      pk_columns: { id_page: $id },
      _set: { isactive: true }
    ) {
      id_page
      isactive
    }
  }
`;
