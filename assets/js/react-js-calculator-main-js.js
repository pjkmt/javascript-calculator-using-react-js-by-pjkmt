// God Bless

const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const calculatorMathOperationsArray = ['*', '/', '+', '-']; // MDAS

const iDentification = {
  0: 'zero', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  7: 'seven', 
  8: 'eight', 
  9: 'nine',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
}

class App extends React.Component {
  
  state = {
    lastCalculatorButtonPressed: undefined,
    calculation: '0',
    calculatorMathOperation: undefined
  }
  
  handleCalculatorClick = (event) => {
    // calculation = answer
    const { calculation, lastCalculatorButtonPressed } = this.state;
    const { innerText } = event.target;
    
   switch(innerText) {
   // Clear Button       
      case 'Clear': {
        this.setState({
          calculation: '0',
        });
        break;
      }
   // Equals Button       
     case '=': {
       const calculatorEvaluation = eval(calculation);
       
       this.setState({
         calculation: calculatorEvaluation
       });
       break;
     }
    // Decimal Point Button       
     case '.': {
       
       const breakApartString = calculation.split(/[\+\-\*\/]/);
       const theLastCharacter = breakApartString.slice(-1)[0];
       
       if (!theLastCharacter.includes('.')) {
         this.setState({
           calculation: calculation+'.'
         });
       }
       
       break;
     }
     
     default: {      
       let evaluation = undefined;
       
       if (calculatorMathOperationsArray.includes(innerText)) {
           if (calculatorMathOperationsArray.includes(lastCalculatorButtonPressed) && innerText !== '-') {
         const lastCalculatorNumberIndex = calculation.split('').reverse().findIndex(JSCalculatorCharacter => JSCalculatorCharacter !== ' ' && numbersArray.includes(+JSCalculatorCharacter));
             
         evaluation = calculation.slice(0, calculation.length - lastCalculatorNumberIndex) + ` ${innerText} `;
         
         } else {
           evaluation = `${calculation} ${innerText} `;
         }
       } else {
       evaluation = (calculation === '0') ? innerText : (calculation + innerText);
       }
       this.setState({
          calculation: evaluation         
       });
    }
 }

  this.setState({
    lastCalculatorButtonPressed: innerText
  })
}
  
 render() {
   
  const { currentCalculatorNumber, calculation } = this.state;
   
  return (
    
  <div className="containerForCalculator">
      <p style={{position: 'flex'}} className="calculator-header">PJKMT</p>
      
    <div id="display" className="displayForCalculator">
      {calculation}
    </div>
      
      <div className="containerForCalculatorNumbers">
        
        {numbersArray.map(calculatorNumber => (
          <button key={calculatorNumber} className={`gold ${calculatorNumber === 0 && 'big-zero-button'}`} onClick={this.handleCalculatorClick} id={iDentification[calculatorNumber]}>{calculatorNumber}</button>
        ))}
        <button className="green" onClick={this.handleCalculatorClick} id="decimal">.</button>
        
        <button className="red clearDisplay big-clear-button" onClick={this.handleCalculatorClick} id="clear"> Clear</button>
      </div>
      <div className="containerForMathOperations">
        {calculatorMathOperationsArray.map(calculatorMathOperationsArray => (
        <button key={calculatorMathOperationsArray} className="blue" onClick={this.handleCalculatorClick} id={iDentification[calculatorMathOperationsArray]}>{calculatorMathOperationsArray}</button>
        ))}
        
        <button className="blue" onClick={this.handleCalculatorClick} id="equals">=</button>
      
      </div>
    </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('calculator-application'));