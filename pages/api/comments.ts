import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;
const grachcmsToken = process.env.GRAPHCMS_TOKEN as string;
type Data = {
  name: string;
};

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { name, email, comment, slug } = req.body;
  const graphqlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${grachcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphqlClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error: any) {
    // console.log(error)
    return res.status(500).send(error);
  }
}
