import {NextPage} from "next"
import {Header} from './'

interface Props {
  name ?: string,
  children ?: React.ReactNode
}

const Layout:NextPage<Props> = ({children}) => {
  return (
    <>
      <Header/>
      {children} 
    </>
  )
} 

export default Layout