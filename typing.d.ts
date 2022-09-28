export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    photo: {
      url: string;
    };
    authorBio: string;
  };
  slug: string;
  title: string;
  updatedAt: string;
  excerpt: string;
  createdAt: string;
  image: {
    url: string;
  };
  categories: category[];
}

export interface category {
  name: string;
  slug: string;
}
