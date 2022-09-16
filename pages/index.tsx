import type { NextPage } from "next";
import Head from "next/head";

import { Categories, PostCard, PostWidget } from "../components";

interface postType {
  title: string;
  excerpt: string;
}

const posts: postType[] = [
  { title: "react testing:", excerpt: "learn react testing" },
  { title: "react with tailwindcss", excerpt: "Learn react with tailwind" },
];

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>graph csm blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 bg-red-400">
          {posts.map((post: postType) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1 bg-lime-400">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
