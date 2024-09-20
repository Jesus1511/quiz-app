
export function getBestTrys(trys) {
    let bestTime = Infinity; 
    let bestScore = -Infinity; 

    trys.forEach((singleTry) => {
        if (singleTry.bestTime < bestTime) {
            bestTime = singleTry.bestTime;
        }
        
        if (singleTry.nota > bestScore) {
            bestScore = singleTry.nota;
        }
    });
    
    return { bestTime, bestScore };
}


export function formatDate(timestamp) {
    const date = new Date(timestamp);
    
    // Definir los nombres de los meses en español
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }