import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// function ImageFactor(path="") {
//         return (
//             <div><img src="aa.jpg" /></div>
//         )
// }

// 画像ファイルパスをプロパティに取るようなコンポーネントを定義
export default  ({ filename, picWidh, height }) => (

    // ページじゃないコンポーネントでもGraphQLが使えるように
    // StaticQueryタグを使う
    <StaticQuery
  
      // GraphQLのクエリ引数には何も指定しない！
    //   query={graphql`
    //     query {
    //       images: allFile {
    //         edges {
    //           node {
    //             relativePath
    //             name
    //             childImageSharp {
    //               sizes(maxWidth: 800) {
    //                 ...GatsbyImageSharpSizes
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   `}

      query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}
  
      // 全画像情報がdataに代入されている
      render={(data) => {
  
        // 指定した画像ファイルパス（コンポーネントのプロパティ）と
        // 一致するgatsby-image用の情報を取得
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(filename)
        })
  
        if (!image) return
        
        // Imgタグでgatsby-imageで最適化された画像を表示する
        const imageSizes = image.node.childImageSharp.sizes
        return <Img style={{ width: picWidh }} sizes={ imageSizes } />
      }}
    />
)

// export default ImageFactor;

// export const fluidImage = graphql`
// query {
//     imageOne: file(relativePath: {eq: "aa.jpg"}) {
//       childImageSharp {
//         fluid(maxWidth: 1000) {
//           base64
//           tracedSVG
//           aspectRatio
//           src
//           srcSet
//           srcWebp
//           srcSetWebp
//           sizes
//           originalImg
//           originalName
//         }
//       }
//     }
//   }
// `