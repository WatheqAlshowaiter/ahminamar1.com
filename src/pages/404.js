import React from "react";
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import Main404 from "../mainComponents/Main404";



export default function NoteFound() {
  let colorTitlesStyle={
    color: '#FFF'
  }
  return (
    <div>
      <RepairTokenAndCrawl setToken={false} post_id="0" page_name="404page"/>
      <HelmetComponent title="404 - صفحة غير موجودة" title2="خطأ في الطلب، عذرا لاتوجد هذه الصفحة"/>
      <Header arrowActive="0" colorTitlesStyle={colorTitlesStyle} title1="خطأ 404" title2="خطأ في الطلب، عذرا لاتوجد هذه الصفحة"/>
      <Main404 />
      <Footer />
    </div>)
}