function decod(str) {
  let n = 0;
  while (n ** 2 < str.length) {
    n += 1;
  }

  let substr = [];

  let decodString = "";

  let resStrings = [];

  for (let i = 0; i < str.length; i += n) {
    substr.push(str.slice(i, i + n));
  }
  const R = substr.length;
  const C = substr[0].length;

  for (let r = 0; r < R; r++) {
    for (let i = r, j = 0; i >= 0 && j < C; i--, j++) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }

  for (let c = 1; c < C; c++) {
    for (let i = R - 1, j = c; i >= 0 && j < C; i--, j++) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }

  resStrings.push(decodString);
  decodString = "";

  for (let c = C - 1; c >= 0; c--) {
    for (let i = 0, j = c; i < R && j < C; i++, j++) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }
  for (let r = 1; r < R; r++) {
    for (let i = r, j = 0; i < R && j < C; i++, j++) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }

  resStrings.push(decodString);
  decodString = "";

  for (let r = R - 1; r >= 0; r--) {
    for (let i = r, j = C - 1; i < R && j >= 0; i++, j--) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }
  for (let c = C - 2; c >= 0; c--) {
    for (let i = 0, j = c; i < R && j >= 0; i++, j--) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }
  resStrings.push(decodString);
  decodString = "";

  for (let c = 0; c < C; c++) {
    for (let i = R - 1, j = c; i >= 0 && j >= 0; i--, j--) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }
  for (let r = R - 2; r >= 0; r--) {
    for (let i = r, j = C - 1; i >= 0 && j >= 0; i--, j--) {
      if (substr[i][j] == "_") {
        decodString += " ";
      } else {
        decodString += substr[i][j];
      }
    }
  }

  resStrings.push(decodString);
  decodString = "";

  for (i of resStrings) {
    console.log(i + "\n");
  }
}

decod(
  "_садл_оибятвжтвтыеьиеыеь_двгн_с_саед_диро.лекоеах_он_—,врЧсив_ннатиеокьиноп_жа_зж"
);
