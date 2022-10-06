import { NextPage } from "next";
import Image from "next/image";
import { author } from "../typing";

interface Props {
  author: author;
}

const Author: NextPage<Props> = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          className="align-middle rounded-full"
          unoptimized
          src={author.photo.url}
          alt={author.name}
          height="100px"
          width="100px"
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.authorBio}</p>
    </div>
  );
};

export default Author;
