import { Link, PageProps } from "gatsby"

function Layout({ location, title, children }: { title: string; children: React.ReactNode; location: Location }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath || location.pathname === `${rootPath}ko/` || location.pathname === `${rootPath}en/`
  // extract home path from current path (including language)
  const homePath = "/"+location.pathname.split("/")[1]
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to={homePath}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to={homePath}>
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      {/* <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer> */}
    </div>
  )
}

export default Layout
