const axios = require('axios');
const { siteMetadata } = require('./gatsby-config')

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const query = await graphql(
    `{
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
    }`
    )

    const pageData = JSON.parse(query.data.siteData.siteData.pages);
    const siteSettings = JSON.parse(query.data.siteData.siteData.siteSettings)
    let pages = await buildContent(pageData) // formats data into something readable for gatsby

    pages.forEach(page => { // loops through every page and inserts it into layout.js
        createPage({
            path: page.slug,
            component: require.resolve(`./src/templates/${page.pageType}.js`),
            context: {
                pageContent: page.content,
                title: page.pageTitle,
                theme: siteSettings.theme,
                dealerInfo: siteSettings.dealerInfo,
                footer: siteSettings.Footer
            }
        })
    })
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { site_id, api_base_url } = siteMetadata

    try {
        const siteData = await axios.get(`${api_base_url}/gatsby/${site_id}`);
        const { pages, siteSettings, ...otherData } = siteData.data
        const siteNode = {
            siteData: { ...otherData, pages: JSON.stringify(pages), siteSettings: JSON.stringify(siteSettings) },
            id: createNodeId(`my-data-${siteData.data.site_id}`),
            parent: null,
            children: [],
            internal: {
                type: `siteData`,
                contentDigest: createContentDigest(siteData.data)
            }
        }
        actions.createNode(siteNode)
    } catch (e) { console.log(e) }
}


function buildContent(allPages) {
    return new Promise((resolve, reject) => {
        let pages = []

        allPages.forEach(page => {
            let newPage = {} // loops through each page in the json and exports a built page object

            newPage._id = page._id
            newPage.templatePageID = page.templatePageID
            newPage.slug = page.slug
            newPage.description = page.description
            newPage.pageType = page.pageType
            newPage.pageTitle = page.pageTitle
            newPage.content = {}

            // takes the metadata from each page and assigns values from the site_data db
            for (let x = 0; x < page.metadata.length; x++) {
                if (page.metadata[x].type === 'array') {
                    let arr = page.content[page.metadata[x].identifier]

                    newPage.content[page.metadata[x].gatsbyComp] = {}
                    newPage.content[page.metadata[x].gatsbyComp].order = page.metadata[x].order
                    newPage.content[page.metadata[x].gatsbyComp].visible = page.metadata[x].visible
                    newPage.content[page.metadata[x].gatsbyComp][page.metadata[x].prop] = []

                    arr.forEach(value => {
                        let contentObject = {}

                        page.metadata[x].componentSet.forEach(comp => {
                            contentObject[comp.prop] = value.value[comp.identifier]
                        })

                        newPage.content[page.metadata[x].gatsbyComp][page.metadata[x].prop].push(contentObject)
                    })
                } else {
                    newPage.content[page.metadata[x].gatsbyComp] = {}
                    newPage.content[page.metadata[x].gatsbyComp].order = page.metadata[x].order
                    newPage.content[page.metadata[x].gatsbyComp].visible = page.metadata[x].visible

                    page.metadata[x].content.forEach(comp => {
                        if (comp.type === 'group') {
                            newPage.content[page.metadata[x].gatsbyComp][comp.identifier] = {}

                            comp.content.forEach(compTwo => {
                                newPage.content[page.metadata[x].gatsbyComp][comp.identifier][compTwo.prop] = page.content[compTwo.identifier]
                            })
                        } else {
                            newPage.content[page.metadata[x].gatsbyComp][comp.prop] = page.content[comp.identifier]
                        }
                    })
                }
            }

            pages.push(newPage)
        })

        resolve(pages)
    })
}
