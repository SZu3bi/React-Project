import React, { useCallback, useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { GetMainInfo_Contact } from "../../Services/APIServices_2";

export const About = () => {
  const [result, setResult] = useState();

  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {
      setTimeout(() => {}, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
    } else setResult(null);
  }, []);

  useEffect(() => {
    GetAllData();
  }, [GetAllData]);

  return (
    <div className="App">
      <div class="content">
        <div class="content__container">
          <p class="content__container__text">Hello</p>

          <ul class="content__container__list">
            {result &&
              result.map((s, index) => (
                <li class="content__container__list__item">{s.Name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
