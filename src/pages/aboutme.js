import React from "react";
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import MainAboutMe from "../mainComponents/MainAboutMe";
import Footer from "../templates/Footer";


export default function AboutMe() {
  let colorTitlesStyle={
    color: '#FFF'
  }
  return (
    <div>
      <RepairTokenAndCrawl setToken={false} post_id="0" page_name="aboutMe"/>
      <HelmetComponent title="About me"/>
      <Header arrowActive="3" colorTitlesStyle={colorTitlesStyle} title1="أنا مروان احمينة" title2="مليئ بشغفِ تعلمِ وممارسةِ البرمجة، تعرف علي أكثر!"/>
      <MainAboutMe />
      <Footer />
    </div>)
}