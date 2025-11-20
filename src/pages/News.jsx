import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const News = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/rasrochka?highlight=new"); // "new" category id
  }, []);

  return null; // News sahifasi faqat redirect qiladi
};

export default News;
