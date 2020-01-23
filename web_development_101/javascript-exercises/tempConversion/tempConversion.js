const ftoc = function(fahrenheit) {
  let celsius = 0;

  celsius = fahrenheit - 32;
  celsius *= 5;
  celsius /= 9;
  
  let multiplier = Math.pow(10, 1 || 0);
  celsius = Math.round(celsius * multiplier) / multiplier;

  return celsius;
};

const ctof = function(celsius) {
  let fahrenheit = 0;

  fahrenheit = celsius * 9;
  fahrenheit /= 5;
  fahrenheit += 32;
  
  let multiplier = Math.pow(10, 1 || 0);
  fahrenheit = Math.round(fahrenheit * multiplier) / multiplier;

  return fahrenheit;
};

module.exports = {
  ftoc,
  ctof
}
