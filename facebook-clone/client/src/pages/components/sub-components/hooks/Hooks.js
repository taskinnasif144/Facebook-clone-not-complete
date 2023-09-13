import React, { useState, useEffect } from "react";

export const getStringUntilSpace = (inputString) => {
  const indexOfSpace = inputString.indexOf(" ");
  return indexOfSpace === -1
    ? inputString
    : inputString.substring(0, indexOfSpace);
};
