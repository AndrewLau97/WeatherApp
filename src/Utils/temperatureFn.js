  function changeToFDegree(temp,tempUnit) {
    if(tempUnit === "°C"){
      return temp
    }else{
      return roundOneDecimal(temp * 1.8 + 32);
    }
  }

  function roundOneDecimal(number) {
    return Math.round(number * 10) / 10;
  }

  export {changeToFDegree, roundOneDecimal}