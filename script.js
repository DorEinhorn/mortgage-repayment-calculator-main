document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mortgage-form');
    const amountInput = document.getElementById('amount');
    const termInput = document.getElementById('term');
    const rateInput = document.getElementById('rate');
    const repayInput = document.getElementById('repay');
    const interestOnlyInput = document.getElementById('interestOnly');
    const submitBtn = document.getElementById('submitBtn');
    const clearAllBtn = document.getElementById('clear-all');
    
    const errorAmount = document.getElementById('error-amount');
    const errorTerm = document.getElementById('error-term');
    const errorRate = document.getElementById('error-rate');
    const errorType = document.getElementById('error-type');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      
      if (amountInput.value.trim() === '') {
        errorAmount.style.visibility = 'visible';
        valid = false;
      } else {
        errorAmount.style.visibility = 'hidden';
      }
      
      if (termInput.value.trim() === '') {
        errorTerm.style.visibility = 'visible';
        valid = false;
      } else {
        errorTerm.style.visibility = 'hidden';
      }
      
      if (rateInput.value.trim() === '') {
        errorRate.style.visibility = 'visible';
        valid = false;
      } else {
        errorRate.style.visibility = 'hidden';
      }
      
      if (!repayInput.checked && !interestOnlyInput.checked) {
        errorType.style.visibility = 'visible';
        valid = false;
      } else {
        errorType.style.visibility = 'hidden';
      }
      
      if (valid) {
        calculateRepayments();
      }
    });
    
    clearAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      form.reset();
      hideAllErrors();
      resetResults();
    });
    
    function hideAllErrors() {
      errorAmount.style.visibility = 'hidden';
      errorTerm.style.visibility = 'hidden';
      errorRate.style.visibility = 'hidden';
      errorType.style.visibility = 'hidden';
    }
    
    function resetResults() {
      const resultsDiv = document.querySelector('.right .results-start');
      resultsDiv.innerHTML = `
        <img src="./assets/images/illustration-empty.svg" alt="illustration-empty">
        <h1>Results shown here</h1>
        <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
      `;
    }
    
    function calculateRepayments() {
      const amount = parseFloat(amountInput.value);
      const term = parseFloat(termInput.value);
      const rate = parseFloat(rateInput.value);
      const isRepayment = repayInput.checked;
      
      let monthlyPayment;
      if (isRepayment) {
        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = term * 12;
        monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      } else {
        monthlyPayment = (amount * (rate / 100)) / 12;
      }
      
      displayResults(monthlyPayment, amount, term, rate);
    }
    
    function displayResults(monthlyPayment, amount, term, rate) {
      const totalRepayment = monthlyPayment * term * 12;
      const resultsDiv = document.querySelector('.right .results-start');
      resultsDiv.innerHTML = `
        <div class="results-completed">
          <h1>Your results</h1>
          <div class="result-infos">
            <p>Your monthly repayments will be:</p>
            <p class="monthly-price">£${monthlyPayment.toFixed(2)}</p>
            <hr>
            <p>Total you'll repay over the term:</p>
            <p class="total-price">£${totalRepayment.toFixed(2)}</p>
          </div>
        </div>
      `;
    }
  });
  