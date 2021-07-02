

export const convertValueToMedal = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '';
  }
}

