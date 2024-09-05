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


    initKeyPresses(){
        // Инициализация обработчиков нажатий клавиш для управления фигурой.
        document.addEventListener('keydown', (e) =>{
            switch(e.code){
                case 'ArrowLeft':
                    console.log('ArrowLeft');
                break;
                case 'ArrowRight':
                    console.log('ArrowRight');
                break;
                case 'ArrowDown':
                    console.log('ArrowDown');
                break;
                case 'ArrowUp':
                    console.log('ArrowUp');
                break;
            }
        })
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
    
    
    // moveTile(direction: DIRECTION){
    //     let x = 0;
    //     let y = 0;
    
    //     if(direction === DIRECTION.LEFT){
    //         x = -1;
    //     } else if(direction === DIRECTION.RIGHT){
    //         x = 1;
    //     } else if(direction === DIRECTION.DOWN){
    //         y = 1;
    //     }else if(direction === DIRECTION.UP){
    //         y = -1;
    //     }
    // }
    
    
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

