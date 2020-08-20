import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import "simplebar/src/simplebar.css";
import SimpleBarReact from "simplebar-react";

import Layout from "./../components/Layout";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Bio from "./../components/Bio";
import SEO from "../components/SEO";
import Newsletter from "../components/Newsletter";

const HeroContainer = styled.div`
  color: var(--color-primary);
  display: flex;
  padding: 4rem 2rem;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 800px) {
    padding: 4rem 1rem;
  }
`;

const HeroTitle = styled.hgroup`
  padding: 2rem 0 4rem 0;
  max-width: 70rem;
  margin: 0 auto;
`;

const BlogTitle = styled.h1`
  color: var(--color-tertiary);
  font-size: clamp(2.6rem, 6vw, 6.5rem);
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.25;
`;

const BlogDate = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -2.5px;
  margin-top: 3rem;

  @media (max-width: 500px) {
    font-size: 1.2rem;
    letter-spacing: -1px;
  }
`;

const BlogContent = styled.article`
  /* Container styles */
  & > * + * {
    margin-top: 2rem;
  }

  text-align: left;
  font-kerning: normal;
  padding: 3rem 0 6rem;
  color: #000;

  /* Internal HTML styles */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 3rem;
  }

  h1 {
    font-size: 1.875rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.625rem;
  }

  p {
    line-height: 1.65;
    font-size: 17px;
    font-weight: 400;
    color: #000;
  }

  ol,
  ul {
    list-style-position: inside;
    list-style-type: disc;
  }

  a,
  a:hover,
  a:active,
  a:focus {
    color: inherit;
    font-weight: 500;
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }

  img {
    border-radius: 5px;
    display: block;
    max-width: 100%;
    margin: 0 auto;
    height: auto;
  }

  figcaption {
    text-align: center;
    margin-top: 10px;
    font-style: italic;
  }

  @media (max-width: 500px) {
    & > * + * {
      margin-top: 1.5rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 2rem;
    }

    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.625rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 15px;
    }
  }
`;

const Share = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .line {
    flex-grow: 1;
    border: 0.5px solid #d3d3d3;
    margin-right: 20px;
  }

  span {
    text-transform: uppercase;
    margin-right: 20px;
    font-size: 0.75rem;
    opacity: 0.7;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0px;
    cursor: pointer;

    a {
      text-decoration: none;
      font-size: 1.125rem;
      color: inherit;

      &:hover {
        color: #d3d3d3;
      }
    }
  }

  button.twitter {
    margin-right: 20px;
  }
`;

function BlogPost({ data, pageContext }) {
  const post = data.markdownRemark;
  const { slug } = pageContext;

  return (
    <SimpleBarReact style={{ maxHeight: "100vh" }}>
      <SEO
        slug={slug}
        title={`${post.frontmatter.title} — The Wirescript`}
        meta={[post.frontmatter.keywords]}
        description={post.frontmatter.description}
        image={post.frontmatter.banner.publicURL}
      />
      <main role="main">
        <Navbar />
        <Layout as="header" bgColor="#f8f8f7">
          <HeroContainer>
            <HeroTitle>
              <BlogTitle
                data-sal="slide-up"
                data-sal-delay="300"
                data-sal-easing="ease"
                data-sal-duration="1200"
              >
                {post.frontmatter.title}
              </BlogTitle>
              <BlogDate
                data-sal="slide-up"
                data-sal-delay="400"
                data-sal-easing="ease"
                data-sal-duration="1200"
              >
                {post.frontmatter.date}
              </BlogDate>
            </HeroTitle>
          </HeroContainer>
        </Layout>
        <Layout bgColor="var(--color-white)">
          <div style={{ maxWidth: "45rem", margin: "0 auto" }}>
            <BlogContent dangerouslySetInnerHTML={{ __html: post.html }} />
            <Share>
              <div className="line"></div>
              <span>Share Article</span>
              <button aria-label="twitter" className="twitter">
                <a
                  href="https://twitter.com/intent/tweet?url=[ARTICLELINK]&text=Check%20this%20out:"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                >
                  Twitter
                </a>
              </button>
              <button aria-label="linkedin" className="linkedin">
                <a
                  href="https://www.linkedin.com/shareArticle?mini=true&url=[ARTICLELINK]&title=Check%20this%20out&summary=An amazing article!&source=:"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                >
                  LinkedIn
                </a>
              </button>
            </Share>
            <Bio />
          </div>
        </Layout>
        <Newsletter />
        <Footer bgColor="var(--color-white)" />
      </main>
    </SimpleBarReact>
  );
}

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        category
        keywords
        description
        date(formatString: "MMMM DD YYYY")
        title
        banner {
          publicURL
        }
      }
    }
  }
`;
