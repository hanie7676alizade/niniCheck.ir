import React from "react";
import { Col} from "react-bootstrap";


import classes from "scss/Public/Home.module.scss";

const AboutTest = () => (
   <React.Fragment>
      <Col className={`${classes.AboutTest}`}>
         <span>
            درباره ویژگی های تست ما
         </span>
         <p>
            اینجا بستری برای تشخیص جنسیت کودک شما
            اینجا بستری برای تشخیص جنسیت کودک و گفتگو
            اینجا بستری برای تشخیص جنسیت کودک شما
            اینجا بستری برای تشخیص جنسیت کودک و گفتگو و دانستنی هایی در موضوعات مربوط به کودک و خانواده ی شما
            
         </p>
         <a href="/aboutUs">
            ادامه مطلب 
         </a>
      </Col>
   </React.Fragment>
)

export default AboutTest;