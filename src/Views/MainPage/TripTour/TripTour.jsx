import React from "react";
import "./TripTour.scss";

export const TripTour = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="basket-card-uicomponents">
        <div className="title">
          <div className="around-tour"> Dubai all around tour </div>
        </div>
        <div className="tour-info">
          <span>
            The selected location is a part of different tours, you can select
            tours or make custom by your own
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

        <div>
          <div className="Image-container">
            <div>
              <img
                className="Image"
                src={
                  //getDownloadableLink(ItemDetales.tripCoverImage)
                  "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg"
                }
              ></img>
            </div>
            <div>
              <img
                className="Image"
                src={
                  //getDownloadableLink(ItemDetales.tripCoverImage)
                  "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg"
                }
              ></img>
            </div>
            <div>
              <img
                className="Image"
                src={
                  //getDownloadableLink(ItemDetales.tripCoverImage)
                  "https://shrm-res.cloudinary.com/image/upload/c_crop,h_706,w_1255,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Global%20HR/Dubai4m_jhrbfn.jpg"
                }
              ></img>
            </div>
          </div>
          <div className="container-data">
            <div className="timeline-basket">
              <span className="mdi mdi-google-maps" />
              <div className="line"></div>
              <div className="dot-num">1</div>
              <div className="line"></div>
              <div className="dot"></div>
              <div className="line"></div>
              <div className="dot-num">2</div>
              <div className="line"></div>
              <div className="dot"></div>
              <div className="line"></div>
              <div className="dot-num">3</div>
              <div className="line"></div>
              <span className="mdi mdi-google-maps" />
            </div>
          </div>
          <div className="trips">
            <div className="trip">Jumeirah</div>
            <div className="trip">Dubai marina</div>
            <div className="trip">Beach jumairah</div>
          </div>
        </div>
        <div className="footer-button">
          <div className="add">Add to favorite</div>
          <div className="delete">Delete</div>
          <div className="save">Save for later</div>
        </div>
      </div>
    </div>
  );
};
