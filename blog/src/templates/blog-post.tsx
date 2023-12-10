import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import getPostPath from "../utils/getPostPath"
import { PageProps } from "gatsby"
import { LanguageSwitcher } from "../components/LanguageSwitcher"
const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
  pageContext
}: PageProps<Queries.BlogPostBySlugQuery>) => {
  const siteTitle = site?.siteMetadata.title || `Title`
  if (!post?.frontmatter ) {
    return null
  }
  return (
    <Layout location={location} title={siteTitle}>
      
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <LanguageSwitcher translations={(pageContext as any).translations} />
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html || "" }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous?.frontmatter && (
              <Link to={getPostPath(previous)} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next?.frontmatter && (
              <Link to={getPostPath(next)} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: {markdownRemark: post} }: PageProps<Queries.BlogPostBySlugQuery>) => {
  return (
    <Seo
      title={post?.frontmatter?.title || ""}
      description={post?.frontmatter?.description || post?.excerpt || ""}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        lang
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        lang
      }
    }
  }
`
