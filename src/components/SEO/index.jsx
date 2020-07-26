import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { isNil } from "utility";

import Helmet from "react-helmet";

// Adds all meta/link tags to the document <head> using Helmet, including those
// geared towards SEO
function SEO({ description, lang, meta, title }) {
  const { siteMetadata, pathPrefix } = useStaticQuery(
    graphql`
      query {
        site {
          pathPrefix
          siteMetadata {
            title
            description
            author
            themeColor
            msTileColor
          }
        }
      }
    `
  ).site;
  const {
    title: globalTitle,
    description: globalDescription,
    author,
    themeColor,
    msTileColor
  } = siteMetadata;

  const withoutTrailing =
    pathPrefix.slice(-1) === "/" ? pathPrefix.slice(0, -1) : pathPrefix;
  const withoutLeading = path =>
    path.slice(0, 1) === "/" ? path.slice(1) : path;
  const withPathPrefix = path => `${withoutTrailing}/${withoutLeading(path)}`;

  const metaDescription = description || globalDescription;
  const formattedTitle = isNil(title)
    ? globalTitle
    : `${title} | ${globalTitle}`;
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={formattedTitle}
      meta={[
        {
          "http-equiv": "Content-Type",
          content: "text/html; charset=UTF-8"
        },
        // Web crawler
        {
          name: "robots",
          content: "index, follow"
        },
        // Misc. display meta
        {
          name: "msapplication-square150x150logo",
          content: withPathPrefix("/img/mstile-150x150.png")
        },
        {
          name: "msapplication-config",
          content: "none"
        },
        {
          name: "msapplication-TileColor",
          content: msTileColor
        },
        // Open Graph (Facebook)
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:image",
          content: withPathPrefix("/img/logo_hex.png")
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:site_name`,
          content: globalTitle
        },
        // Twitter
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: `twitter:creator`,
          content: author
        },
        {
          name: `twitter:title`,
          content: formattedTitle
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        // Other
        {
          name: `description`,
          content: metaDescription
        },
        // Disable indexing for staging
        ...(process.env.GATSBY_PUBLIC === "true"
          ? []
          : [
              {
                name: `robots`,
                content: `noindex`
              }
            ]),
        ...meta
      ]}
      link={[
        // Favicons
        {
          rel: "mask-icon",
          color: themeColor,
          href: withPathPrefix("/img/safari-pinned-tab.svg")
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: withPathPrefix("/img/apple-touch-icon.png")
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: withPathPrefix("/img/favicon-32x32.png")
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: withPathPrefix("/img/favicon-16x16.png")
        },
        {
          rel: "shortcut icon",
          href: withPathPrefix("/img/favicon.ico")
        }
      ]}
    />
  );
}

export default SEO;

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  title: null
};

SEO.displayName = "SEO";
