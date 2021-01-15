import React from "react"
import { StaticQuery, graphql } from "gatsby";
import { Global } from "@emotion/core"
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import GlobalCSS from '../components/GlobalCSS'


export default function Layout({ children }) {
    return <StaticQuery
        query={pagesQuery}
        render={data => {
            const siteSettings = JSON.parse(data.siteData.siteData.siteSettings)
            return (
                <React.Fragment>
                    <Global styles={GlobalCSS(siteSettings)} />
                    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></link>
                    <NavigationBar content={siteSettings.NavigationBar} />
                    <div>
                        {children}
                    </div>
                    <Footer content={siteSettings.Footer} dealerInfo={siteSettings.dealerInfo} />
                </React.Fragment>
            )
        }}
    />
}

const pagesQuery = graphql`
{
  siteData {
      siteData {
      siteSettings
      siteMetadata {
          currentTemplateID
          siteName
      }
      pages
      }
  }
}
`