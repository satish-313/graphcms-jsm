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
  featurePost: boolean;
  image: {
    url: string;
  };
  categories: category[];
  content: any;
}

export interface author {
  id: string;
  name: string;
  photo: {
    url: string;
  };
  authorBio: string;
}

export interface category {
  name: string;
  slug: string;
}

export interface comment {
  name: string;
  createdAt: string;
  comment: string;
}
