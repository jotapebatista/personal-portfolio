import Menu from "./menu/Menu"
import StickyDiv from "./socialicons/socialicons"
 
export default function Layout({ children }) {
  return (
    <>
      <Menu />
      <StickyDiv />
      <main>{children}</main>
   
    </>
  )
}