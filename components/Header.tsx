import { useContext } from "react";
import { NextPage } from "next";
import Link from "next/link";

interface categoriesType {
  name: string;
  slug: string;
}

const Categories: categoriesType[] = [
  { name: "react", slug: "react" },
  { name: "web development", slug: "web-development" },
];

interface Props {}

const Header: NextPage<Props> = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              GraphCms
            </span>
          </Link>
        </div>

        <div className="hidden md:float-left md:contents">
          {Categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div> 
  );
};

export default Header;
