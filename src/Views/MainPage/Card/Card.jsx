import React, { useRef, useState, useCallback} from "react";
import { Button } from "@material-ui/core";
import { ButtonBase } from "@material-ui/core";
import "./Card.scss";

export const Card = () => {
  const main = [
    {
      name: "Amman City",
      inf: [
        {
          id: "a",
          Num: 1,
          City: "A",
          img: View,
        },
        {
          Num: 2,
          City: "B",
          img: View,
        },
        {
          Num: 3,
          City: "C",
          img: View,
        },
        {
          Num: 4,
          City: "D",
          img: View,
        },
        {
          Num: 5,
          City: "E",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
      ],
    },
    {
      name: "Dubai City",
      inf: [
        {
          id: "b",
          Num: 1,
          City: "A",
          img: View,
        },
        {
          Num: 2,
          City: "B",
          img: View,
        },
        {
          Num: 3,
          City: "C",
          img: View,
        },
        {
          Num: 4,
          City: "D",
          img: View,
        },
        {
          Num: 5,
          City: "E",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
      ],
    },
    {
      name: "City 1",
      inf: [
        {
          Num: 1,
          City: "Dubai",
          img: View,
        },
      ],
    },
    {
      name: "City 2",
      inf: [
        {
          Num: 1,
          City: "Dubai",
          img: View,
        },
      ],
    },
    {
      name: "Kwiat City",
      inf: [
        {
          id: "c",
          Num: 1,
          City: "A",
          img: View,
        },
        {
          Num: 2,
          City: "B",
          img: View,
        },
        {
          Num: 3,
          City: "C",
          img: View,
        },
        {
          Num: 4,
          City: "D",
          img: View,
        },
        {
          Num: 5,
          City: "E",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
        {
          Num: 6,
          City: "F",
          img: View,
        },
      ],
    },
  ];

  const contentWrapper = React.useRef(null);

  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  const [reviews] = useState([1, 2, 3, 4, 5, 6]);
  const [navigators, setNavigators] = useState({
    previous: false,
    next: false,
  });

  const cardsWrapperRef = React.useRef(null);
  const [scrollCurrentItem, setScrollCurrentItem] = React.useState(0);
  const scrollTimer = React.useRef(null);

  const getIsScrollable = useCallback(
    (direction) => {
      if (!cardsWrapperRef.current) return false;
      const element = cardsWrapperRef.current;
      const maxScrollLeft = Math.round(
        element.scrollWidth - element.clientWidth
      );
      if (
        (direction === "previous" &&
          (element.scrollLeft <= 0 ||
            scrollCurrentItem <= 0 ||
            Math.abs(element.scrollLeft) >= maxScrollLeft ||
            scrollCurrentItem <= 0)) ||
        (direction === "next" &&
          (element.scrollLeft >= maxScrollLeft ||
            Math.abs(element.scrollLeft) >= maxScrollLeft))
      )
        return false;
      return true;
    },
    [reviews.length, scrollCurrentItem]
  );

  const toHandler = (direction) => () => {
    if (!getIsScrollable(direction)) return;
    setScrollCurrentItem((item) => {
      if (direction === "next") item += 1;
      else item -= 1;

      return item;
    });
  };

  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    console.log("sss", scrollOffset);
  };

  const handler = (index) => () => {
    console.log("index", index);
  };

  return (
    <div className="mainDiv">
      <div className="users-card-wrappercard">
        {main &&
          main &&
          main.map((m, index) => (
            <div className="cards-wrappercard">
              <div className="item-wrappercard">
                <p style={{ fontWeight: "bold" }}>Dubai all around tour</p>
              </div>
              <div className="cards-headercard"></div>
              <div style={{ display: "flex" }}>
                <div
                  className="ContentWrapper"
                  ref={ref}
                  key={index}
                  onClick={handler(index)}
                >
                  <div className="pickupmarkcard">
                    <div className="mdi mdi-map-marker-outline px-2" />
                  </div>
                  {m.inf &&
                    m.inf.map((s, index) => (
                      <div className="cards-bodycard">
                        <div className="piccard">
                          <img
                            className="timelinepic"
                            src={s.img}
                            alt="pic"
                          ></img>
                        </div>
                        <div>
                          <div className="timelinecard">
                            <div className="linecard"></div>
                            <div className="dotnumcard">
                              <p>{s.Num}</p>
                            </div>
                            <div className="linecard"></div>
                            <div className="dotcard"></div>
                          </div>
                        </div>
                        <div className="contentcard">
                          <div className="placenamecard">
                            <div className="textcard">
                              <p>jordan</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="pickupmark2card">
                    <div className="mdi mdi-map-marker-outline px-2" />
                  </div>
                </div>
                <div className="basebtn">
                  <ButtonBase
                    className="btns-icons mx-2 mb-2 btns2"
                    onClick={() => scroll(-30)}
                  >
                    <span className="mdi mdi-chevron-left" />
                  </ButtonBase>
                  <ButtonBase
                    className="btns-icons mx-2 mb-2 btns2"
                    onClick={() => scroll(30)}
                  >
                    <span className="mdi mdi-chevron-right" />
                  </ButtonBase>
                </div>
              </div>
              <div className="maindivcontentcard">
                <div style={{ width: "50%" }}>
                  <div className="contenttextheadercard">
                    <span className="mdi mdi-account px-2" />
                    <span>2 Passenger</span>
                  </div>
                  <div className="contenttextheadercard">
                    <span className="mdi mdi-car-side px-2" />
                    <span>1 car</span>
                  </div>
                  <div className="contenttextheadercard">
                    <span
                      style={{ color: "green" }}
                      className="mdi mdi-map-marker-outline px-2"
                    />
                    <span>Amman Bayder</span>
                  </div>
                  <div className="contenttextheadercard">
                    <span
                      style={{ color: "red" }}
                      className="mdi mdi-map-marker-outline px-2"
                    />
                    <span>Amman-Bayder</span>
                  </div>
                  <div className="contenttextheadercard">
                    <span className="mdi mdi-calendar-month-outline px-2" />
                    <span>16-june 2021</span>
                  </div>
                  <div className="contenttextheadercard">
                    <span className="mdi mdi-clock-time-three-outline px-2" />
                    <span> 7:00 am -8:00 pm</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="secDiv">
        <div className="totalsummary">Total Summary</div>
        <div className="tour">
          <div className="tourDetails">
            <div
              style={{ fontSize: "medium", fontWeight: "700", color: "black" }}
            >
              Tour 1
            </div>
            <div style={{ fontSize: "smaller", color: "orange" }}>
              Show Details
            </div>
          </div>
          <div className="tourDetails">
            <div style={{ color: "black" }}>- Burj khaleefa Dubai</div>
            <div style={{ fontSize: "smaller", color: "black" }}>500 AED</div>
          </div>
        </div>
        <div className="totalprice">
          <div className="tourDetails">
            <div
              style={{ fontSize: "medium", fontWeight: "700", color: "black" }}
            >
              Total
            </div>
            <div style={{ color: "black" }}>1400 AED</div>
          </div>
          <div className="tourDetails">
            <div style={{ color: "black" }}>Discount 20%</div>
            <div style={{ fontSize: "smaller", color: "black" }}>-100 AED</div>
          </div>
          <div className="tourDetails">
            <div style={{ fontSize: "smaller", color: "orange" }}>
              Total Price
            </div>
            <div
              style={{ fontSize: "large", color: "orange", fontWeight: "600" }}
            >
              1100 AED
            </div>
          </div>
        </div>
        <div className="actionbtn">
          <Button className="btns theme-outline">Continue to payment</Button>
        </div>
      </div>
    </div>
  );
};
