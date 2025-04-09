"use client";
import React, { useEffect } from "react";

function Services({ toggleGetField, setToggleGetField, submit }) {
  useEffect(() => {
    if (toggleGetField) {
      submit({});
      setToggleGetField(false);
    }
  }, [toggleGetField, setToggleGetField]);

  return <div></div>;
}

export default Services;
