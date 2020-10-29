  /**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `مدونة AHMINA Marouan`,
    siteUrl: `https://localhost:8000`,
    description: `Test description sitemeta`,
    author: 'Merro'
  },  
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/portfolio`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
      plugins: [{
        resolve: `gatsby-remark-prismjs`,
      },
      {
        resolve: `gatsby-remark-images`,
        options: {
          maxWidth: 800,
          
        },
      },
      ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark (
                  sort: { order: DESC, fields: [frontmatter___id] }
                  filter: { fileAbsolutePath: { regex: "//posts//" } }
                ){
                  edges {
                    node {
                      html
                      frontmatter {
                        id
                        slug
                        title
                        date
                        author
                        keyword
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "AhminaMar1 Blog RSS Feed",
          },
        ],
      },
    },
  ],
}