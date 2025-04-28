import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* 페이지 제목 */}
        <title>{title}</title>

        {/* 일반 메타 태그 */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph 메타 태그 */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
