# Matrix Multiplication

A simple web application for multiplying two matrices using HTML, CSS, and JavaScript.

## Features

- Create matrices with custom dimensions
- Check whether two matrices can be multiplied
- Dynamically generate matrix input fields
- Multiply two matrices
- Display the result
- Clear matrix values and results
- Validate empty or invalid inputs

## How to Use

1. Enter the dimensions of Matrix A and Matrix B in `rows x columns` format (for example, `2x3`).
2. Click **Create Matrices**.
3. Enter the values for both matrices.
4. Click **Calculate** to multiply the matrices.
5. Click **Clear** to clear the entered values and result.

## Matrix Multiplication Rule

Two matrices can be multiplied if the number of columns in Matrix A is equal to the number of rows in Matrix B.

For example:

```text id="u23xg4"
Matrix A: 2x3
Matrix B: 3x2
Result:   2x2
```

## Example

```text id="sdbhs3"
Matrix A

1  2  3
4  5  6

Matrix B

7   8
9  10
11 12

Result

58   64
139 154
```

## Technologies

- HTML
- CSS
- JavaScript

## Project Structure

```text id="fckxl9"
matrix-multiplication/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Purpose

This project was created to practice fundamental JavaScript concepts such as DOM manipulation, event handling, functions, arrays, loops, input validation, and matrix multiplication logic.