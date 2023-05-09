document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Show loader
    document.getElementById('loading').style.display = 'block';
    // Hide Results
    document.getElementById('results').style.display = 'none';
    
    setTimeout(calculateResult, 2000);
    e.preventDefault();
})

function calculateResult() {
    // Loan input variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    // Results variables
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Caculate payement
    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayments = parseFloat(years.value) * 12;

    // Compute montly payment
    const x = Math.pow(1 + calcInterest, calcPayments);
    const monthly = (principal * x * calcInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcPayments).toFixed(2);
        totalInterest.value = (totalPayment.value - principal).toFixed(2);

        // Show Results funtion call
        setTimeout(showResults, 300);
        // Hide results
        document.getElementById('results').style.display = 'none';
    }
    else {
        showErrow('Please enter valid a number');
        // Show loader
        document.getElementById('loading').style.display = 'none';
    }
}

// Define showResults function
function showResults() {
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Show results
    document.getElementById('results').style.display = 'block';
}

// Define showErrow function
function showErrow(error) {
    // Get header element and div with class of card
    const header = document.querySelector('.heading');
    const card = document.querySelector('.card');
    // Create errorDive
    const errorDiv = document.createElement('div');
    // Add class 
    errorDiv.className = 'alert alert-danger';
    // Create text node and append
    errorDiv.appendChild(document.createTextNode(error));
    // Inert above header
    card.insertBefore(errorDiv, header);
    
    setTimeout(() => {   
        // Hide errorDiv
        errorDiv.remove();
    }, 2000);
}
