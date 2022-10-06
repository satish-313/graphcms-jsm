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

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getAllPosts = async () => {
  const query = gql`
    query getAllPost {
      posts {
        id
        title
        slug
        excerpt
        createdAt
        updatedAt
        featurePost
        image {
          url
        }
        categories {
          id
          slug
        }
        content {
          raw
        }
        author {
          id
          name
          photo {
            url
          }
          authorBio
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
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
    }`;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (slug: string, categories: category[]) => {
  const query = gql`
    query GetPostDetails($slug: string!, $categories: [string!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { categories, slug });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const submitComment = async (obj: any) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug:string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where:{post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI,query,{slug})
  return result.comments
}