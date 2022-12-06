import React from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  let { slug } = useParams();

  return <div>Product - {slug}</div>;
}
