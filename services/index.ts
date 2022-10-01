import { request, gql } from "graphql-request";
import { category } from "../typing";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              id
              name
              photo {
                url
              }
              authorBio
            }
            slug
            title
            updatedAt
            excerpt
            createdAt
            image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI,query)
  return result.postsConnection.edges;
};


export const getRecentPost = async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title 
        image{ url}
        createdAt
        slug
      }
    }`
  
  const result = await request(graphqlAPI,query);

  return result.posts;
}

export const getSimilarPosts = async (slug:string, categories:category[]) => {
  const query = gql`
    query GetPostDetails($slug: string!, $categories: [string!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ){
        title 
        image{ url}
        createdAt
        slug
      }
    }`

  const result = await request(graphqlAPI,query);

  return result.posts;
}

export const getCategories = async() => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }`

  const result = await request(graphqlAPI,query) 
  return result.categories
}