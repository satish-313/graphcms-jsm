import { GetStaticProps, NextPage } from "next";
import React from "react";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "../../components";
import { getAllPosts, getPostDetails } from "../../services";
import { Post } from "../../typing";

interface Props {
  post: Post;
}

interface params {}

const PostDetails: NextPage<Props> = ({ post }) => {
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post}/>
          <Author author={post.author}/>
          <CommentsForm slug={post.slug}/>
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export const getStaticPaths = async () => {
  const posts: Post[] = await getAllPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let post;
  if (params !== undefined) post = await getPostDetails(params.slug as string);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};
