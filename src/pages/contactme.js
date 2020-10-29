import React, {useState} from "react";
import "../style/main.css";
import RepairTokenAndCrawl from "../mainComponents/RepairTokenAndCrawl";
import HelmetComponent from "../templates/HelmetComponent";
import Header from "../templates/Header";
import MainContactMe from "../mainComponents/MainContactMe";
import Footer from "../templates/Footer";


export default function ContactMe() {
  let colorTitlesStyle={
    color: '#FFF'
  }

  const [token, setToken]=useState('');

  return (
    <div>
      <RepairTokenAndCrawl setToken={setToken} post_id="0" page_name="contacMe"/>
      <HelmetComponent title="Contact me"/>
      <Header arrowActive="4" colorTitlesStyle={colorTitlesStyle} title1="تواصل معي" title2="سأكون سعيداً بالتواصل معك، فلا تتردد"/>
      <MainContactMe token={token}/>
      <Footer />
    </div>)
}
