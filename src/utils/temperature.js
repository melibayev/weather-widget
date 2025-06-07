export function cToF(c) {
  return (c * 9) / 5 + 32;
}

export function fToC(f) {
  return ((f - 32) * 5) / 9;
}

  
  export function getDailyAverages(list) {
    const result = [];
  
    for (let i = 0; i < list.length; i += 8) {
      const group = list.slice(i, i + 8);
      const temps = group.map(e => e.main.temp);
      const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
      result.push({
        date: group[0].dt_txt.split(' ')[0],
        avg: avg.toFixed(1),
      });
    }
  
    return result;
  }
  