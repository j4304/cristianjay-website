"use client";

import { useEffect } from "react";

import microbankImg from "@/assets/images/microbank-card.webp";
import bigimbobImg from "@/assets/images/bigimbob-card.webp";
import umdscImg from "@/assets/images/umsdc-card.webp";
import umgpaImg from "@/assets/images/umgpa-card.webp";
import phpayImg from "@/assets/images/phpay-card.webp";
import intellistatsImg from "@/assets/images/intellistats-card.webp";
import cristianJayAvatar from "@/assets/images/cristianjay.webp";

const images = [
  microbankImg,
  bigimbobImg,
  umdscImg,
  umgpaImg,
  phpayImg,
  intellistatsImg,
  cristianJayAvatar,
];

export default function PreloadImages() {
  useEffect(() => {
    images.forEach((imgObj) => {
      const img = new Image();
      img.src = imgObj.src;
    });
  }, []);

  return null;
}
