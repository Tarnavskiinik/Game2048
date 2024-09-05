

export function drawBoard(board: number[][]) {
    let table: string = `<table>`;

    for (let i = 0; i < board.length; i++) {
        table += '<tr>';
        for (let j = 0; j < board.length; j++) {
            const value = board[i][j] ? board[i][j] : '';
            table += `<td>${value}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('board')!.innerHTML = table;
}

