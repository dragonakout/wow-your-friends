import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image';
import Helmet from "react-helmet"
import styled from "@emotion/styled"

import "./global.css"
import { breakpoints } from './design';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  @media screen and (${breakpoints.tablet}) {
    font-size: .9em;
  }

  @media screen and (${breakpoints.mobile}) {
    font-size: .8em;
  }
`

const Hero = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 600px;
  width: 100%;
  overflow: hidden;
`

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -1em;
  background: linear-gradient(to top, #291c47, transparent 75%);
`

const Layout = ({ set, children }) => {
  // GraphQL //
  const {
    site: { siteMetadata: { title, description, author, siteUrl, image, icon, twitterHandle }}
    // headerImage: { publicURL: headerURL }
  } = useStaticQuery(graphql`
    query {
      # Get site title
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          image
          icon
          twitterHandle
        }
      }
    }
  `)

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="author" content={author}/>
        <meta name="image" content={image}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={image}/>
        <meta property="og:url" content={siteUrl}/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content={twitterHandle}/>
        <meta name="twitter:creator" content={twitterHandle}/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={`${siteUrl}${icon}`}/>
        <script src="https://kit.fontawesome.com/a35b219d74.js" crossorigin="anonymous"></script>
      </Helmet>
      <Container>
        <Hero>
          <StaticImage
            src="../assets/header-bg.jpg"
            alt="An ethereal, golden background image"
            layout="fullWidth"
            objectPosition="center top"
            style={{ height: '100%', width: '100%' }}
            imgStyle={{ maskImage: 'linear-gradient(#000f 50%, #0008)' }}
            onLoad={() => set(true)}
          />
          <Gradient/>
        </Hero>
        {children}
      </Container>
    </>
  )
}

export default Layout
