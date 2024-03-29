import { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { category, Post } from "../typing";
import { NextPage } from "next";
import { getRecentPost, getSimilarPosts } from "../services";

interface Props {
  categories?: category[];
  slug?: string;
}

const PostWidget: NextPage<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // if (slug && categories ) {
    //   getSimilarPosts(slug, categories).then((result) =>
    //     setRelatedPosts(result)
    //   );
    // } else {
    //   getRecentPost().then((result) => setRelatedPosts(result));
    // }
    getRecentPost().then((result) => setRelatedPosts(result));
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b  pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post: Post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              src={post.image.url}
              alt={post.title}
              height="60px"
              width="60px"
              className="line-middle rounded-full"
            />
          </div>
          <div className="flex-grow ml-4 ">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
          <Link
            href={`/post/${post.slug}`}
            key={post.title}
            className="text-md"
          >
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
