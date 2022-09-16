import {NextPage} from "next"

export interface postType {
  title : string,
  excerpt : string,
}

export interface Props {
  post : postType
}

const PostCard:NextPage<Props> = ({post}) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  )
}

export default PostCard