import type { NextPage } from "next";
import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts } from "../services";
import { Post } from "../typing";

interface Node {
  node: Post;
}

interface PostType {
  nodes: Node[];
}

const Home: NextPage<PostType> = ({ nodes }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>graph csm blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {nodes.map(({node},idx) => (
            <PostCard post={node} key={idx} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const nodes = (await getPosts()) || [];
  return { props: { nodes } };
}

export default Home;
