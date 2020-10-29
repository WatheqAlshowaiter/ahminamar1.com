import React from "react";
import {graphql} from "gatsby";
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import MainPortfolio from "../mainComponents/MainPortfolio";
import Footer from "../templates/Footer";



export default function Porftolio({data}) {
  let colorTitlesStyle={
    color: '#FFF'
  }
  return (
    <div>
      <RepairTokenAndCrawl setToken={false} post_id="0" page_name="portfolio"/>
      <HelmetComponent title="معرض الأعمال"/>
      <Header arrowActive="2" colorTitlesStyle={colorTitlesStyle} title1="الرحاب في معرض الأعمال" title2="معرض أعمال لرحلة تعلم وتطوير في الويب وتقنياته لأكثر من سبع سنوات"/>
      <MainPortfolio data={data.allPortfolioJson.edges}/>
      <Footer />
    </div>)
}

export const pageQuery2 = graphql`
query MyQuery2{
  allPortfolioJson(sort: {fields: id, order: DESC}) {
    edges {
      node {
        id
        title
        link
        description
        date
        star
        table
        pics{
          publicURL
        }
      }
    }
  }
}

`