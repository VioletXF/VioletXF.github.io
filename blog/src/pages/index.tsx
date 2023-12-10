import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useIntl } from "gatsby-plugin-intl"
import getPostPath from "../utils/getPostPath"
import { LanguageSwitcher } from "../components/LanguageSwitcher"
type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    nodes: {
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        lang: string
        date: string
        title: string
        description: string
      }
    }[]
  }
}
function BlogIndex({ data, location }: { data: Data; location: Location }) {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const intl = useIntl()
  const language = intl.locale
  const posts = data.allMarkdownRemark.nodes.filter(
    node => node.frontmatter.lang === language
  );
  data.allMarkdownRemark.nodes.forEach((node) => {
    if(node.frontmatter.lang !== language && (node.frontmatter.lang === "en" || !node.frontmatter.lang)) {
      const removeLang = (str: string)=>str.replace(/^\/.*?\//, ``);
      const hasDuplicate = posts.find(post => removeLang(post.fields.slug) === removeLang(node.fields.slug));
      if(!hasDuplicate) {
        posts.push(node);
      }
    }
  });
  // sort by date
  posts.sort((a, b)=>new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <LanguageSwitcher />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={getPostPath(post)} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          lang
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
