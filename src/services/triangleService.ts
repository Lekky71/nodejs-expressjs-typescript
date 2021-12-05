export const triangleService = {
  async checkTriangle(a: number, b: number, c: number): Promise<{type: string}> {
    const response = {type: 'Scalene'};
    if ((a <= 0) || (b <= 0) || (c <= 0)) {
      response.type = 'Incorrect';
    }// added test
    else if ((a >= b + c) || (c >= b + a) || (b >= a + c)) {
      response.type = 'Incorrect';
    } else if ((a === b) && (b === c)) {
      response.type = 'Equilateral';
    } else if ((b === c) || (a === b) || (c === a)) response.type = 'Isosceles';
    return response;
  }
};
