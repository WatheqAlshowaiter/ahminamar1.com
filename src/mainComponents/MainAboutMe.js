import React from 'react';
import {Link} from 'gatsby';
import Avatar from '../img/avatar.jpg';

const MainAboutMe = () => {
    return (
        <main>
            <div className="main_global_container_grid main_global_container_grid_aboutme_and_contact">

                <div className="main_global_container_grid_item">
                    <div className="show_grid_container show_grid_container_aboutme">
                        
                        <div className="aboutme_me">
                            <h2>AHMINA Marouan</h2>
                            
                            <div className="aboutme_me_img">
                                <img src={Avatar} alt="AHMINA Marouan"/>
                            </div>
                            <div className="aboutme_contact">
                                <div className="aboutme_contact">
                                    <a href="https://ar.quora.com/Marouan-Ahmina" target="_blank" rel="noopener noreferrer" className="aboutme_contact_item contact_item_q" aria-label="My account on Quora"><i className="fab fa-quora"/></a>
                                    <a href="https://github.com/AhminaMar1" target="_blank" rel="noopener noreferrer" className="aboutme_contact_item contact_item_g" aria-label="My account on Github"><i className="fab fa-github"/></a>
                                    <a href="https://twitter.com/AhminaMar1" target="_blank" rel="noopener noreferrer" className="aboutme_contact_item contact_item_t" aria-label="My account on Twitter"><i className="fab fa-twitter"/></a>
                                    <a href="mailto:AhminaMar1@gmail.com" target="_blank" rel="noopener noreferrer" className="aboutme_contact_item contact_item_m" aria-label="My Gmail"><i className="fas fa-envelope"/></a>
                                </div>
                                <div className="aboutme_link">
                                    <Link to="/contactme" className="aboutme_link_item" ariahidden="Contact me">تواصل معي</Link>
                                    <Link to="/portfolio" className="aboutme_link_item" ariahidden="My portfolio">شاهد أعمالي</Link>
                                </div>
                            </div>
                        </div>

                        <div className="aboutme_para">
                            <h3>عني</h3>
                            <p>اسمي مروان احمينة، 24 سنة، شغوف بالتعلم والمعرفة.. بدأت مشوار تعلم البرمجة منذ آواخر 2011، سعيت في هذه الفترة لأتقن برمجة الويب الشاملة (full stack web dev).</p>
                            <p>أستمتع بالتعلم، تكويد التحديات، الحلول الإبداعية والتطوير المستمر.. جهودي حالياً منصبة نحو إتقان المزيد حول تقنيات الويب ولغاته، ودخول مجال تطوير الموبايل.</p>
                            <h3>اللغات، الإطارات، المكتبات والتقنيات التي أجيدها وأستخدمها</h3>
                            <div className="aboutme_good_at noselect">             
                                <div className="aboutme_good_at_item">PHP</div>
                                <div className="aboutme_good_at_item">Javascript</div>
                                <div className="aboutme_good_at_item">Laravel</div>
                                <div className="aboutme_good_at_item">ReactJS</div>
                                <div className="aboutme_good_at_item">nodeJS</div>
                                <div className="aboutme_good_at_item">ExpressJS</div>
                                <div className="aboutme_good_at_item">TypeScript</div>
                                <div className="aboutme_good_at_item">EcmaScript</div>
                                <div className="aboutme_good_at_item">C/C++</div>
                                <div className="aboutme_good_at_item">HTML</div>
                                <div className="aboutme_good_at_item">CSS</div>
                                <div className="aboutme_good_at_item">Sass</div>
                                <div className="aboutme_good_at_item">Mysql</div>
                                <div className="aboutme_good_at_item">MongoDB</div>
                                <div className="aboutme_good_at_item">GraphQL</div>
                                <div className="aboutme_good_at_item">API</div>
                                <div className="aboutme_good_at_item">SPA</div>
                                <div className="aboutme_good_at_item">OOP</div>
                                <div className="aboutme_good_at_item">FP</div>
                                <div className="aboutme_good_at_item">Redux</div>
                                <div className="aboutme_good_at_item">Gatsby</div>
                                <div className="aboutme_good_at_item">Bootstrap</div>
                                <div className="aboutme_good_at_item">SEO</div>
                                <div className="aboutme_good_at_item">Git</div>
                                <div className="aboutme_good_at_item">__And more__</div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
	    </main>
    );
};

export default MainAboutMe;