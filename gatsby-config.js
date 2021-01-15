module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Gatsby Test For Kaleb',
    site_id: '<Input Site ID Here>',
    api_base_url: 'https://portal-backend.mxsapi.com'
  },
  plugins: [
    {
      resolve: "gatsby-disable-404"
    }, 
    {
      resolve: "gatsby-plugin-emotion"
    }, 
    {
      resolve: "gatsby-transformer-json"
    },
    {
      resolve: "gatsby-plugin-sass"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: '<BUCKET_NAME>'
      }
    }
  ]
}

