// HELPER FUNCTIONS:
const sortFuncLargestFirst = (a, b) => {  // for sorting an array, where [0] is largest val.
  return b - a;
}

const findLargestMatrixCenter = (matrix) => { //I: matrix  O: position  E: even height/width
  //given a matrix, of odd or even height or length
  let height = matrix.length;
  let width = matrix[0].length;
  let largestMatrixCenter = [Math.floor(height/2), Math.floor(width/2)]; // [y, x]
  
  if(height%2 === 0 && width%2 === 0) {
    //the below square and values are only used for even x even matrices.  
    let square = [
      [ (height/2)-1, (width/2)-1 ],
      [ (height/2)-1, width/2 ],
      [ height/2, (width/2)-1 ],
      [ height/2, width/2 ]
    ];
    let squareValues = [
      matrix[square[0][0]][square[0][1]], 
      matrix[square[1][0]][square[1][1]], 
      matrix[square[2][0]][square[2][1]],
      matrix[square[3][0]][square[3][1]]
    ];
    //weird comparison of four possible starting positions!
    let sortedByLargest = squareValues.slice(0);
    sortedByLargest.sort(sortFuncLargestFirst);
    for(let i = 0; i < squareValues.length; i++) { // i now corresponds to TR, TL, BR, BL
      if(sortedByLargest[0] === squareValues[i]) { 
        // then set largestMatrixCenter to that coordinate
        largestMatrixCenter = square[i];
      }
    }
  } else if(height%2 === 0) {
    if(matrix[largestMatrixCenter[0]][largestMatrixCenter[1]] < matrix[(largestMatrixCenter[0]) - 1][largestMatrixCenter[1]]) {
      largestMatrixCenter[0] = largestMatrixCenter[0] - 1;
    }
  } else if(width%2 === 0) {
    if(matrix[largestMatrixCenter[0]][largestMatrixCenter[1]] < matrix[largestMatrixCenter[0]][(largestMatrixCenter[1]) - 1]) {
      largestMatrixCenter[1] = largestMatrixCenter[1] - 1;
    }
  }
  return largestMatrixCenter;
}

// MAIN FUNCTION:
const carrotCounter = (inputGarden) => {
  let garden = inputGarden.slice(0);  // will be manipulate-able
  let startingPosition = findLargestMatrixCenter(inputGarden); // a [y, x] value
  let totalCarrots = 0;
  
  const hungryBunny = (position) => { //an array of [y, x];
    let nextPosition;
    
    let rightCoord = [position[0], (position[1]+1)];
    let leftCoord = [position[0], (position[1]-1)];
    let upCoord = [(position[0]-1), position[1]];
    let downCoord = [(position[0]+1), position[1]];

    let rightVal = null;
    let leftVal = null;
    let upVal = null;
    let downVal = null;
    if (!!garden[rightCoord[1]]) { rightVal = garden[rightCoord[0]][rightCoord[1]] };
    if (!!garden[leftCoord[1]]) { leftVal = garden[leftCoord[0]][leftCoord[1]] };
    if (!!garden[upCoord[0]]) { upVal = garden[upCoord[0]][upCoord[1]] };
    if (!!garden[downCoord[0]]) { downVal = garden[downCoord[0]][downCoord[1]] };

    // check R/L/U/D positions on garden
    let positionCheck = (!!rightVal)+(!!leftVal)+(!!downVal)+(!!upVal); // must be 0 to fall asleep
    
    if(positionCheck === 0) {
      return totalCarrots // bunny can fall asleep and abdee abdee abdee that's all for now, folks!
    } else {
      let surroundingCoords = [rightCoord, leftCoord, upCoord, downCoord]; // we know by index that 0, 1, 2, 3 --> R, L, U, D
      let surroundingCarrots = [rightVal, leftVal, upVal, downVal];
      // determine which is largest, 
      let sortedCarrots = surroundingCarrots.slice(0);
      sortedCarrots.sort(sortFuncLargestFirst);  // even if some are undefined, this will still sort properly
      // add that number to totalCarrots;
      totalCarrots = totalCarrots + sortedCarrots[0];
      for(let i = 0; i < surroundingCarrots.length; i++) { // i now corresponds to R, L, U, D
        if(sortedCarrots[0] === surroundingCarrots[i]) { 
          // then set nextPosition to that position
          nextPosition = surroundingCoords[i];
        }
      }
      // set that position of garden to 0
      garden[nextPosition[0]][nextPosition[1]] = 0;
      //THEN: call hungryBunny on nextPosition
      return hungryBunny(nextPosition); // will recurse until bunny falls asleep!
    }
  }

  return hungryBunny(startingPosition); //return the return value of hungryBunny, namely, totalCarrots.
}

// TESTS
const evenTestGarden = [[2, 4, 5, 6], 
                        [3, 0, 0, 9], 
                        [2, 1, 4, 2], 
                        [3, 9, 8, 7]];
console.log('square garden is: [[2, 4, 5, 6], [3, 0, 0, 9], [2, 1, 4, 2], [3, 9, 8, 7]]');
console.log('Expect largestMatrixCenter of square garden to be [2, 2] and got: ', findLargestMatrixCenter(evenTestGarden));
console.log('Expect hungry bunny to eat 64 carrots of square garden and got: ', carrotCounter(evenTestGarden));