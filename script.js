const matrixASizeInput = document.getElementById("matrixASize");
const matrixBSizeInput = document.getElementById("matrixBSize");
const createMatricesButton = document.getElementById("createMatrices");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");

const message = document.getElementById("message");
const matrices = document.getElementById("matrices");
const buttons = document.getElementById("buttons");

const matrixATable = document.getElementById("matrixA");
const matrixBTable = document.getElementById("matrixB");
const resultTable = document.getElementById("result");


let rowsA, colsA, rowsB, colsB;

createMatricesButton.addEventListener("click", createMatrices);
calculateButton.addEventListener("click", calculateResult);
clearButton.addEventListener("click", clearAll);

// "3x3" gibi bir yazıyı [3, 3] dizisine çevirir, geçersizse null döndürür
function parseSize(text) {
    const parts = text.trim().toLowerCase().split("x");

    if (parts.length !== 2) {
        return null;
    }

    const rowsText = parts[0].trim();
    const colsText = parts[1].trim();

    if (rowsText === "" || colsText === "") {
        return null;
    }

    const rows = Number(rowsText);
    const cols = Number(colsText);

    if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
        return null;
    }

    return [rows, cols];
}

// Verilen tabloyu rows x cols boyutunda yeniden oluşturur
function createTable(table, rows, cols, isInput) {
    table.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");

            if (isInput) {
                const input = document.createElement("input");
                input.type = "number";
                cell.appendChild(input);
            } else {
                const resultCell = document.createElement("span");
                resultCell.className = "result-cell";
                cell.appendChild(resultCell);
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

function createMatrices() {
    const sizeA = parseSize(matrixASizeInput.value);
    const sizeB = parseSize(matrixBSizeInput.value);

    // 1. Biçim kontrolü
    if (sizeA === null || sizeB === null) {
        message.textContent = "Enter sizes like 3x3 (rows x columns).";
        return;
    }

    // 2. Alt sınır kontrolü (0 veya negatif boyut olamaz)
    const allSizes = [sizeA[0], sizeA[1], sizeB[0], sizeB[1]];
    for (let i = 0; i < allSizes.length; i++) {
        if (allSizes[i] < 1) {
            message.textContent = "Rows and columns must be at least 1.";
            return;
        }
    }

    // 3. Çarpılabilirlik kontrolü
    if (sizeA[1] !== sizeB[0]) {
        message.textContent = "Matrix A's columns (" + sizeA[1] + ") must match Matrix B's rows (" + sizeB[0] + ").";
        return;
    }

    // Bütün kontroller geçti: değerleri kaydet
    rowsA = sizeA[0];
    colsA = sizeA[1];
    rowsB = sizeB[0];
    colsB = sizeB[1];

    message.textContent = "";

    createTable(matrixATable, rowsA, colsA, true);
    createTable(matrixBTable, rowsB, colsB, true);
    createTable(resultTable, rowsA, colsB, false);

    matrices.hidden = false;
    buttons.hidden = false;
}

function calculateResult() {
    const inputsA = matrixATable.querySelectorAll("input");
    const inputsB = matrixBTable.querySelectorAll("input");
    const valuesA = [];
    const valuesB = [];

    for (let i = 0; i < inputsA.length; i++) {
        if (inputsA[i].value.trim() === "") {
            message.textContent = "Please fill in all cells.";
            return;
        }

        const valueA = Number(inputsA[i].value);
        valuesA.push(valueA);
    }

    for (let j = 0; j < inputsB.length; j++) {
        if (inputsB[j].value.trim() === "") {
            message.textContent = "Please fill in all cells.";
            return;
        }

        const valueB = Number(inputsB[j].value);
        valuesB.push(valueB);
    }

    // Kutular dolu: eski hata mesajını temizle
    message.textContent = "";

    const resultCells = resultTable.querySelectorAll(".result-cell");

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            let sum = 0;

            for (let k = 0; k < colsA; k++) {
                sum += valuesA[i * colsA + k] * valuesB[k * colsB + j];
            }

            // Sonucu iki basamağa yuvarlayıp doğru hücreye yaz
            resultCells[i * colsB + j].textContent = Math.round(sum * 100) / 100;
        }
    }
}

function clearAll() {
    const allInputs = document.querySelectorAll("#matrixA input, #matrixB input");
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = "";
    }

    const resultCells = resultTable.querySelectorAll(".result-cell");
    for (let i = 0; i < resultCells.length; i++) {
        resultCells[i].textContent = "";
    }

    message.textContent = "";
}