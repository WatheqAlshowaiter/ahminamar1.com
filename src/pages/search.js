import React from "react";
import { graphql } from 'gatsby';
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import MainSearch from "../mainComponents/MainSearch";




export default function Search({data}) {
  const {allMarkdownRemark} = data;

  let colorTitlesStyle={
    color: '#FFF'
  }

  
  return (
    <div>
      <RepairTokenAndCrawl setToken={false} post_id="0" page_name="search"/>
      <HelmetComponent title="ركن البحث"/>
      <Header arrowActive="1" colorTitlesStyle={colorTitlesStyle} title1="إبحث في المدونة" title2="سأفتتحها لاحقاً.. شكراً على زيارتك"/>
      <MainSearch data={allMarkdownRemark.edges}/>
      <Footer />
    </div>)
}


export const pageQuery = graphql`
query MyQuerySearch {
    allMarkdownRemark (
        sort: { order: DESC, fields: [frontmatter___id] }
        filter: { fileAbsolutePath: { regex: "//posts//" } }
    ){
      edges {
        node {
          frontmatter {
            id
            title
            slug
            date
            description
            keyword
          }
        }
      }
    }
  }  
`
