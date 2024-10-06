
export function getBestTrys(trys) {
    // Si no hay intentos o los valores no son válidos, devuelve valores predeterminados
    if (!trys || trys.length === 0) {
        return { bestTime: 0, bestScore: 0 };  // O el valor que consideres adecuado
    }

    let bestTime = Infinity; 
    let bestScore = -Infinity; 

    trys.forEach((singleTry) => {
        if (singleTry.bestTime > 0 && singleTry.bestTime < bestTime) {
            bestTime = singleTry.bestTime;
        }
        
        if (singleTry.nota > 0 && singleTry.nota > bestScore) {
            bestScore = singleTry.nota;
        }
    });

    // Si los valores no cambiaron por no haber resultados válidos, puedes ajustar el retorno
    return {
        bestTime: bestTime === Infinity ? 0 : bestTime,  // Valor predeterminado si no se encontró un tiempo válido
        bestScore: bestScore === -Infinity ? 0 : bestScore // Valor predeterminado si no se encontró una nota válida
    };
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