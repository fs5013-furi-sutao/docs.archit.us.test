const sass = require("node-sass");
const dotenv = require("dotenv");

const themeColor = "#6496c4";
const bgColor = "#496D8F";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

const title = process.env.APP_NAME ?? "Architus Docs";
const description = `General purpose Discord bot supporting advanced role management, custom emotes for non-nitro users, configurable response commands, and more.`;
const basePath = process.env.BASE_PATH ?? "/";

const withoutTrailing =
  basePath.slice(-1) === "/" ? basePath.slice(0, -1) : basePath;
const withoutLeading = path =>
  path.slice(0, 1) === "/" ? path.slice(1) : path;
const withPathPrefix = path => `${withoutTrailing}/${withoutLeading(path)}`;

module.exports = {
  siteMetadata: {
    title,
    description,
    author: `architus`,
    siteUrl: process.env.SITE_ROOT ?? "https://docs.archit.us",
    themeColor,
    msTileColor: "#2b5797",
    github: {
      owner: "architus",
      name: "docs.archit.us",
      docsRoot: "docs/",
      branch: process.env.GITHUB_BRANCH ?? "master"
    },
    api: {
      restVersion: "v1 RESTful API",
      gatewayVersion: "v1 Gateway API"
    }
  },
  pathPrefix: basePath,
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/docs/`,
        name: "docs"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/data/`,
        name: "data"
      }
    },
    ...(process.env.GITHUB_TOKEN == null
      ? []
      : [
          {
            resolve: "gatsby-source-graphql",
            options: {
              typeName: "GitHub",
              fieldName: "github",
              url: "https://api.github.com/graphql",
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
              },
              fetchOptions: {}
            }
          }
        ]),
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-smartypants",
            options: {}
          },
          {
            resolve: "gatsby-remark-slug",
            options: {}
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {}
          },
          {
            resolve: "gatsby-remark-embed-snippet",
            options: {
              directory: `${__dirname}/docs/`
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1500,
              withWebp: true,
              backgroundColor: bgColor,
              linkImagesToOriginal: true
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {}
            }
          }
        ],
        // ! remove plugins when https://github.com/gatsbyjs/gatsby/issues/16242 gets merged
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1500,
              withWebp: true,
              backgroundColor: bgColor,
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: title,
        description,
        homepage_url: "https://docs.archit.us",
        start_url: basePath,
        background_color: bgColor,
        theme_color: themeColor,
        display: `minimal-ui`,
        icons: [
          {
            // Path prefixes are automatically added to these paths
            src: "/img/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/img/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/img/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 6,
        functions: {
          "with-path-prefix($path)": path =>
            new sass.types.String(withPathPrefix(path.getValue()))
        }
      }
    },
    // `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-use-dark-mode`,
    `gatsby-plugin-theme-ui`,
    {
        resolve: 'gatsby-plugin-web-font-loader',
        options: {
          google: {
            families: ['Noto Sans JP:100,400,900', 'Nunito Sans:400,700,900', 'Inter:400,700']
          },
        }
    }
  ]
};
