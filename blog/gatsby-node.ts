/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
import { CreateBabelConfigArgs, CreateNodeArgs, CreatePagesArgs, CreateSchemaCustomizationArgs, GatsbyNode } from 'gatsby'
// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }: CreatePagesArgs) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql<Queries.AllMarkdownQuery>(`
    query AllMarkdown{
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            lang
          }
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  const removeLang = (slug: string) => slug.replace(/^\/[a-z]{2}/, '')
  const findPrevNextPost = (idx: number, direction: "prev"|"next") => {
   
    const current = posts[idx];
    const currentLang = current.frontmatter?.lang || 'en'
    for (let i = direction === 'prev' ? idx - 1 : idx + 1; i >= 0 && i < posts.length; i += direction === 'prev' ? -1 : 1) {
      const post = posts[i]
      const lang = post.frontmatter?.lang || 'en'
      // if current language is english, ignore all other languages
      if (currentLang === "en" && lang !== "en") continue
      // if current language is not english, include english but ignore same post
      if (currentLang !== "en" && lang === "en" && removeLang(post.fields.slug) === removeLang(current.fields.slug)) continue
      return post.id
    }
    return null
  }
  if (posts.length > 0) {
    const postsToCreate: Record<string, Record<string, {
      path: string
      component: string
      context: {
        id: string
        previousPostId: string | null
        nextPostId: string | null
        lang: string
        translations?: string[]
      }
    }>> = {}
    posts.forEach((post, index) => {
      const previousPostId = findPrevNextPost(index, 'prev')
      const nextPostId = findPrevNextPost(index, 'next')
      const language = post.frontmatter?.lang || 'en'
      console.log(post.id)
      const slugWithoutLang = removeLang(post.fields.slug)
      postsToCreate[slugWithoutLang] = postsToCreate[slugWithoutLang] || {}
      postsToCreate[slugWithoutLang][language] = ({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          lang: language,
          translations: [...Object.keys(postsToCreate[slugWithoutLang] || {}), language]
        },
      });
      // update translations
      Object.values(postsToCreate[slugWithoutLang]).forEach((post) => {
        post.context.translations = [...Object.keys(postsToCreate[slugWithoutLang] || {})]
      })
    })
    Object.values(postsToCreate).forEach((post) => {
      Object.values(post).forEach((post) => {
        createPage(post)
      })
    })


  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }
    type SiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      lang: String
    }

    type Fields {
      slug: String!
    }
  `)
}
exports.onCreateBabelConfig = ({ actions }:CreateBabelConfigArgs) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};