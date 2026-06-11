/**
 * Calcula los puntos de una predicción individual según el reglamento.
 */
export function calculatePoints(predA, predB, realA, realB) {
    const pA = Number(predA);
    const pB = Number(predB);
    const rA = Number(realA);
    const rB = Number(realB);

    // 1. Marcador exacto (12 pts)
    if (pA === rA && pB === rB) return 12;

    // 2. Empate correcto (sin importar los goles) (8 pts)
    if (rA === rB && pA === pB) return 8;

    const realDiff = rA - rB;
    const predDiff = pA - pB;

    // 3. Ganador correcto + misma diferencia de goles (8 pts)
    if (realDiff !== 0 && realDiff === predDiff) return 8;

    // 4. Ganador correcto (sin acertar diferencia) (5 pts)
    if ((realDiff > 0 && predDiff > 0) || (realDiff < 0 && predDiff < 0)) return 5;

    // 5. Goles exactos de uno de los dos equipos (2 pts)
    if (pA === rA || pB === rB) return 2;

    return 0;
}