import React from "react";
import { graphql } from 'gatsby';
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import MainHome from "../mainComponents/MainHome";



export default function Home({data}) {
  const {allMarkdownRemark} = data;

  let colorTitlesStyle={
    color: '#FFF'
  }
  return (
    <div>
      <RepairTokenAndCrawl setToken={false} post_id="0" page_name="index"/>
      <HelmetComponent title="المدونة" title2="سأفتتحها لاحقاً.. شكراً على زيارتك"/>
      <Header arrowActive="1" colorTitlesStyle={colorTitlesStyle} title1="مدونتي" title2="سأفتتحها لاحقاً.. شكراً على زيارتك"/>
      <MainHome data={allMarkdownRemark.edges}/>
      <Footer />
    </div>)
}


export const pageQuery = graphql`
query MyQueryIndex {
    allMarkdownRemark (
        sort: { order: DESC, fields: [frontmatter___id] }
        filter: { fileAbsolutePath: { regex: "//posts//" } }
        limit: 10
    ){
      edges {
        node {
          frontmatter {
            id
            slug
            title
            date
            author
            description
          }
        }
      }
    }
  }
`
