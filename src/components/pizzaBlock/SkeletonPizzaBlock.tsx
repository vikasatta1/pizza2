import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPizzaBlock = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="135" cy="128" r="125"/>
        <rect x="0" y="275" rx="10" ry="10" width="280" height="18"/>
        <rect x="0" y="308" rx="10" ry="10" width="280" height="88"/>
        <rect x="0" y="410" rx="9" ry="9" width="95" height="30"/>
        <rect x="126" y="406" rx="25" ry="25" width="152" height="45"/>
    </ContentLoader>
)

export default SkeletonPizzaBlock;
