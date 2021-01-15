import React from "react"
import Layout from '../components/layout'

function HomePage(props) {
    const { pageContext } = props
    const { pageContent, theme, dealerInfo } = pageContext

    let components = []

    let sortedComponents = components.sort((a, b) => parseFloat(a.props.data.order) - parseFloat(b.props.data.order)) // sorts the components based on json data

    let visibleComponents = sortedComponents.filter(component => { // filters out the components that are not visible
        return component.props.data.visible === true
    })

    return (
        <Layout>
            {visibleComponents}
        </Layout>
    )
}


export default HomePage

