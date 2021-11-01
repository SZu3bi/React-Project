import React, { useRef, useState, useEffect } from "react";
import { ButtonBase } from "@material-ui/core";
import './ScrollPic.scss'
import { ContactPage } from "../ContactPage";
export const ScrollPic = () => {
  const main = [

    {
      name: "Amman City",
      inf: [
        {
          id: "b",
          Num: 1,
          City: "A",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 2,
          City: "B",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 3,
          City: "C",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 4,
          City: "D",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 5,
          City: "E",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 6,
          City: "F",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 7,
          City: "g",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
        {
          Num: 8,
          City: "h",
          img: "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg",
        },
      ],
    },
  ];

  let scrl = useRef(null || 0);

  const [active, setactive] = useState(0);
  const slide = (shift, index) => {
    if (index !== active) {
      setactive(index);
    } else scrl.current.scrollLeft += shift;

    console.log("index", index);
  };

  useEffect(() => {
    if (active) scrl.current.scrollLeft += 25;
  }, [active]);

  return (
    <div className="basket-card-uicomponents">
      {main &&
        main &&
        main.map((m, index) => (
          <div className="cards-wrappercards">
            <div className="title">
              <div className="around-tour"> Dubai all around tour </div>
         
            </div>
            <div className="tour-info">
              <span>
                The selected location is a part of different tours, you can
                select tours or make custom by your own
              </span>
            </div>
            <div className="details-info">
              <div className="details-Container">
                <span className="mdi mdi-map-marker-outline" />
                <span>{1}</span>
              </div>
              <div className="details-Container">
                <span className="mdi mdi-account-outline" />
                <span>{2}</span>
              </div>
              <div className="details-Container">
                <span className="mdi mdi-car-sports" />
                <span>{3}</span>
              </div>
              <div className="details-Container">
                <span className="mdi mdi-clock-time-four-outline" />
                <span>{4}</span>
              </div>
              <div className="details-Container">
                <span className="mdi mdi-star-outline" />
                <span>{5}</span>
              </div>
            </div>
            <div className="flex-center">
              <div
                className={
                  m.inf.length <= 3 ? "three-element" : "ContentWrapper"
                }
                ref={active === index ? scrl : null}
                key={index}
              >
                <div className="pickup-mark">
                  <div className="mdi mdi-map-marker-outline px-2" />
                </div>
                {m.inf &&
                  m.inf.map((s, index) => (
                    <div className="cards-bodycard">
                      <div className="pic-card">
                          <img    className="Image"  src={s.img}></img>
                          {/* <div><ContactPage /></div> */}
<div>{s.City}</div>
                      </div>
                      <div className="timelinecard">
                        <div className="linecard"></div>
                        <div className="dotnumcard">{s.Num}</div>
                        <div className="linecard"></div>
                        <div className="dotcard"></div>
                      </div>

                      <div className="contentcard">
                        <div className="placenamecard">
                          <div className="textcard">{s.City}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="drop-mark">
                  <div className="mdi mdi-map-marker-outline px-2" />
                </div>
              </div>

              {m.inf.length > 3 ? (
                <div className="buttonbase-flex">
                  <div>
                    <ButtonBase
                      className="btns-icons mx-2 mb-2 basebtnss"
                      onClick={() => {
                        slide(-60, index);
                      }}
                    >
                      <span className="mdi mdi-chevron-left" />
                    </ButtonBase>
                  </div>
                  <div style={{marginLeft: '5%'}}>
                    <ButtonBase
                      className="btns-icons mx-2 mb-2 basebtnss"
                      onClick={() => {
                        slide(+60, index);
                      }}
                    >
                      <span className="mdi mdi-chevron-right" />
                    </ButtonBase>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="footer-button">
              <div className="add">
                <ButtonBase className="add-btn">Add to favorite</ButtonBase>
              </div>
              <div className="delete">
                <ButtonBase className="delete-btn">Delete</ButtonBase>
              </div>
              <div className="save">
                <ButtonBase className="save-btn">Save for later</ButtonBase>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
