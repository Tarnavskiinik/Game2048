import { Coord } from "./Coord.interface";
import { drawBoard } from "./draw";


enum DIRECTION {
    LEFT,
    RIGHT, 
    DOWN,
    UP
}




export class Game {
    private board: number[][];

    constructor(){
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
    }


    initKeyPresses() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.moveTile(DIRECTION.LEFT);
                    break;
                case 'ArrowRight':
                    this.moveTile(DIRECTION.RIGHT);
                    break;
                case 'ArrowDown':
                    this.moveTile(DIRECTION.DOWN);
                    break;
                case 'ArrowUp':
                    this.moveTile(DIRECTION.UP);
                    break;
            }
        });
    }

    addRandomTile() {
        //создать рандомная цыфра 2 или 4
        const chance: number = this.randomFromInterval(1, 100);
        const tileNum = chance <= 30 ? 4 : 2;
        // выбираем рандомную и заполняем её
        this.setRandomEmptyTile(tileNum);
        //отрисовать
        const boardCopy = structuredClone(this.board);
        drawBoard(boardCopy);
    }
    
    randomFromInterval(min: number, max: number): number { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    


    margeTiles(row: number[]): number[]{
        const filteredRow = row.filter(val => val !== 0);


        const margetRow = filteredRow.reduce<number[]>((acc, current, index, arr) => {
            if(index < arr.length -1 && current === arr[index + 1]){
                acc.push(current * 2);
                arr[index + 1] = 0;
            }  else if (current !== 0) {
                acc.push(current);
            }
            console.log(acc);
            
            return acc;
        }, [])

        return margetRow.concat(new Array(row.length - margetRow.length).fill(0));
    }


    arraysEqual(a: number[], b: number[]): boolean {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    }
    
    moveTile(direction: DIRECTION) {
        let moved = false;
    
        if (direction === DIRECTION.LEFT) {
            this.board.forEach((row, y) => {
                const newRow = this.margeTiles(row);
                if (!this.arraysEqual(row, newRow)) {
                    this.board[y] = newRow;
                    moved = true;
                }
            });
        } else if (direction === DIRECTION.RIGHT) {
            this.board.forEach((row, y) => {
                const reversedRow = row.slice().reverse();
                const newRow = this.margeTiles(reversedRow).reverse();
                if (!this.arraysEqual(row, newRow)) {
                    this.board[y] = newRow;
                    moved = true;
                }
            });
        } else if (direction === DIRECTION.UP) {
            this.board[0].forEach((el, x) => {
                const col = this.board.map(row => row[x]);
                const newCol = this.margeTiles(col);
                newCol.forEach((val, y) => {
                    if (this.board[y][x] !== val) {
                        this.board[y][x] = val;
                        moved = true;
                    }
                });
            });
        } else if (direction === DIRECTION.DOWN) {
            this.board[0].forEach((el, x) => {
                const reversedCol = this.board.map(row => row[x]).reverse();
                const newCol = this.margeTiles(reversedCol).reverse();
                newCol.forEach((val, y) => {
                    if (this.board[y][x] !== val) {
                        this.board[y][x] = val;
                        moved = true;
                    }
                });
            });
        }
    
        if (moved) {
            this.addRandomTile();
        }
        drawBoard(this.board);
    }
    
    
    start(){
        this.initKeyPresses()
        this.addRandomTile()
    }


    getEmptyTiles(): Coord[] {
        const emptyTiles: Coord[] = [];
    
        this.board.forEach((line: number[], y: number) => {
            line.forEach((value: number, x: number) => {
                if (value === 0) {
                    emptyTiles.push({ x, y });
                }
            });
        });
    
        return emptyTiles;
    }
    
    setRandomEmptyTile(value:number){
        const emptyTiles = this.getEmptyTiles();
        
        if(emptyTiles.length === 0){
            console.log('No empty tile');
            return;
        }
    
        const randomIndex = this.randomFromInterval(0, emptyTiles.length - 1);
        
        const { x, y } = emptyTiles[randomIndex];
        this.board[y][x] = value;
    }
}

