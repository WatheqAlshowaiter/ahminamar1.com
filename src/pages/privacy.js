import React from "react";
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import MainPrivacy from "../mainComponents/MainPrivacy";



export default function Privacy() {
  let colorTitlesStyle={
    color: '#FFF'
  }
  return (
    <div>
      <RepairTokenAndCrawl setToken={false} post_id="0" page_name="privacy"/>
      <HelmetComponent title="Privacy Policy" title2="مرحبا، هنا تجد كل مايتعلق بسياسة الخصوصية وأمان الإستخدام"/>
      <Header arrowActive="1" colorTitlesStyle={colorTitlesStyle} title1="سياسة الخصوصية" title2="مرحبا، هنا تجد كل مايتعلق بسياسة الخصوصية وأمان الإستخدام"/>
      <MainPrivacy/>
      <Footer />
    </div>)
}