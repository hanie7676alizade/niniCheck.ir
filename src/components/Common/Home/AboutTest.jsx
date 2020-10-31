import React, { useState } from "react"
import { Col } from "react-bootstrap"
import { CSSTransition } from "react-transition-group"

import classes from "scss/Public/Home.module.scss"

const AboutTest = () => {
    const [ShowSource, setShowSource] = useState(false)
    const Source = [
        {
            text:
                "کاگناچی A و دیگران 2003. ضعف مردان و ریتم فصلی نسبت جنسیت در زمان بارداری. تولید مثل انسان 18 (4): 885-7. ",
            link: "http://www.ncbi.nlm.nih.gov/pubmed/12660290"
        },
        {
            text:
                "Grant VJ و دیگران 2009. یک مدل ساده برای تغییر سازگاری در نسبت جنسیت فرزندان پستانداران. مجله زیست شناسی نظری 258 (1): 38-42. ",
            link: "http://www.ncbi.nlm.nih.gov/pubmed/19490877 "
        },
        {
            text:
                "Hohmann S و دیگران 2010. تغییر نسبت های جنسیتی هنگام تولد در طول جنگ داخلی در تاجیکستان: 1992-1997. مجله علوم زیستی اجتماعی 42 (6): 773-86.",
            link: "http://www.ncbi.nlm.nih.gov/pubmed/20619059 "
        },
        {
            text:
                "جیمز WH 2008. شواهدی مبنی بر اینکه نسبت جنسی پستانداران در بدو تولد تا حدی توسط سطح هورمون والدین در حدود زمان بارداری کنترل می شود. مجله غدد درون ریز 198: 3-15. ",
            link: " http://joe.endocrinology-journals.org/content/198/1/3.full"
        },
        {
            text:
                "Jongbloet PH. 2004. تخمک گذاری بیش از حد رسیدن: فرضیه ای چالش برانگیز برای تعدیل نسبت جنسیت. Hum Reprod 19 (4): 769-74. ",
            link: "http://humrep.oxfordjournals.org/content/19/4/769.full "
        },
        {
            text:
                "Mathews F ، و دیگران 2008. شما همان چیزی هستید که مادرتان می خورد: شواهدی برای رژیم غذایی پیش از بارداری مادر که بر جنسیت جنین در انسان تأثیر می گذارد. مجموعه مقالات: علوم زیستی 275 (1643): 1661-8 ",
            link: "http://www.ncbi.nlm.nih.gov/pubmed/18430648"
        },
        {
            text:
                "ماتسو K ، و دیگران 2009. پیری والدین از نظر هم افزایی نسبت جنسیت فرزندان را کاهش می دهد. مجله تحقیقات زنان و زایمان 35 (1): 164-8. ",
            link:
                "http://onlinelibrary.wiley.com/doi/10.1111/j.1447-0756.2008.00836.x/ab"
        },
        {
            text:
                "Melnikov VN و دیگران 2003. فصلی بودن نسبت جنسی تولد زنده در جنوب غربی سیبری ، روسیه ، 1959-2001. مجله اپیدمیولوژی و سلامت جامعه 57 (6): 471-2. ",
            link: "http://www.ncbi.nlm.nih.gov/pubmed/12775800 "
        },
        {
            text:
                "Veenendaal MV و دیگران 2011. پیامدهای hyperemesis gravidarum برای فرزندان: یک مرور سیستماتیک و فراتحلیل. BJOG 118 (11): 1302-13. ",
            link:
                " http://onlinelibrary.wiley.com/doi/10.1111/j.1471-0528.2011.03023.x/full"
        }
    ]
    const classNameShowSource = {
        enter: classes.enterShowSource,
        enterActive: classes.enterActiveShowSource
    }
    const onShowSource=()=>{
       let elemWrapper= document.getElementsByClassName('AboutTest')[0]
       let buttonElement = elemWrapper.getElementsByTagName('button')[0]
      //  buttonElement.style.display='none'
      elemWrapper.removeChild(buttonElement)
       console.log(ShowSource, "ShowSource",buttonElement)

       setShowSource(true)
    }
    return (
        <React.Fragment>
            <Col className={`${classes.AboutTest} AboutTest `}>
                <span>درباره ویژگی های تست ما</span>
                <p className={classes.firstPara}>
                    نی‌نی چک یه تست تشخیص جنسیته که بر اساس رفرنس‌های معتبر
                    جهانی جمع‌آوری شده. البته همه‌مون خوب میدونیم که فرزندمون با
                    هر جنسیتی که هست، انسان باارزش، پراز پتانسیل و پر از برکت
                    برای جهان ماست. و اصرار ما بر آگاهی از دختر یا پسر بودنش،
                    صرفاً یه سرگرمی کوچیکه برای خودمون، تا عضو جدید خونواده‌مون
                    رو بیشتر بشناسیم.
                </p>
                <button onClick={onShowSource}>ادامه مطلب</button>
                <CSSTransition
                    in={ShowSource}
                    classNames={classNameShowSource}
                    mountOnEnter
                    timeout={300}
                >
                    <div>
                        <p>
                            احتمال صحت این تست قطعاً صد‌درصد نیست، چون همونطور
                            که میدونین جنسیت کوچولوی شما وابسته به فاکتورهای
                            خیلی زیادیه، و بررسی همه‌ی اونها شاید در این تست
                            برامون مهیا نباشه. آرزوی سلامتی و دل خوش داریم، هم
                            برای شما، هم اون کوچولو.
                        </p>
                        <p>راستی دختره یا پسر؟</p>
                        <ul>
                            <li>
                                <p>نمایش منابع</p>
                            </li>
                            {Source.map(item => (
                                <li>
                                    <p>
                                        {item.text}
                                        <a href={item.link}>{item.link}</a>
                                        [دسترسی به مه 2016]
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CSSTransition>
            </Col>
        </React.Fragment>
    )
}

export default AboutTest
