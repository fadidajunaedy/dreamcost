const inputYears = document.querySelector("#input-years")
const inputSelectCurrency = document.querySelector("#input-select-currency")
const inputCurrentPrice = document.querySelector("#input-current-price")
const inputDownPayment = document.querySelector("#input-down-payment")
const inputInflationAssumption = document.querySelector("#input-inflation-assumption")
const buttonCalculate = document.querySelector("#button-calculate")
const buttonResetCalculate = document.querySelector("#button-reset-calculate")

const resultContainer = document.querySelector("#result-container")

const currencySymbols = [
    "$", "€", "Rp", "¥", "£", "A$", "C$", "CHF", "S$", "HK$", "₩", "₹", "₽", "Mex$", "R$", "R", "RM", "฿", "₱"
]

const formatInput = (inputElement) => {
    inputElement.addEventListener("input", (e) => {
        const rawValue = e.target.value.replace(/[^,\d]/g, "")
        
        if (inputElement === inputCurrentPrice) {
            const formattedValue = new Intl.NumberFormat("id-ID").format(rawValue)
            inputElement.value = formattedValue
        } else {
            inputElement.value = rawValue
        }
    })
}

const checkInput = (inputElement) => {
    const parentElement = inputElement.parentElement

    parentElement.classList.add("border-rose-500")
}

const clearError = (inputElement) => {
    const parentElement = inputElement.parentElement

    parentElement.classList.remove("border-rose-500")
}

buttonCalculate.addEventListener("click", () => {
    let years = inputYears.value
    let currentPrice = parseInt(inputCurrentPrice.value.replace(/\./g, ""), 10)
    let downPayment = inputDownPayment.value
    let inflationAssumption = inputInflationAssumption.value

    !years ? checkInput(inputYears) : clearError(inputYears)
    !currentPrice ? checkInput(inputCurrentPrice) : clearError(inputCurrentPrice)
    !downPayment ? checkInput(inputDownPayment) : clearError(inputDownPayment)
    !inflationAssumption ? checkInput(inputInflationAssumption) : clearError(inputInflationAssumption)

    if (!years || !currentPrice || !downPayment || !inflationAssumption) return
    
    let price = currentPrice

    for (let i = 0; i < years; i++) {
        price *= 1 + (inflationAssumption / 100)
    }
    
    const currency = inputSelectCurrency.value
    const finalDownPayment = new Intl.NumberFormat("id-ID").format(price * (downPayment / 100))
    const finalPrice = new Intl.NumberFormat("id-ID").format(price)

    resultContainer.innerHTML = `
        <div class="flex flex-col justify-center gap-8 lg:gap-12">
            <h2 class="text-3xl font-semibold text-slate-100">Your Result</h2>
            <p class="text-slate-300">
                Your result are shown below based on the information you provided. To adjust the result, edit the form and click "Calculate Dream" again.
            </p>
            <div class="bg-slate-900 flex flex-col gap-4 rounded-xl p-12">
                <span class="text-slate-300">Your down payment</span>
                <span id="final-down-payment" class="flex items-center gap-2 text-2xl lg:text-4xl font-bold text-primary-lime">${currency} ${finalDownPayment}</span>
                <hr class="my-2 lg:my-4">
                <p class="text-slate-300">
                    Due to inflation every year, this affects the price of your dream.
                </p>
                <span id="final-price" class="flex items-center gap-2 text-xl font-bold text-slate-100">${currency} ${finalPrice}</span>
            </div>
        </div>
    `

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches

    if (!isDesktop) window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
})

buttonResetCalculate.addEventListener("click", () => {
    inputYears.value = null
    inputSelectCurrency.value = currencySymbols[0]
    inputCurrentPrice.value = null
    inputDownPayment.value = null
    inputInflationAssumption.value = null

    clearError(inputYears)
    clearError(inputCurrentPrice)
    clearError(inputDownPayment)
    clearError(inputInflationAssumption)

    resultContainer.innerHTML = `
        <div class="h-full flex flex-col justify-center items-center gap-4">
            <img 
            src="./assets/images/illustration-empty.svg" 
            alt="Calculator Illustration" 
            class="max-w-xs mx-auto">
            <h2 class="text-center text-3xl font-semibold text-slate-100">Your Result shown here</h2>
            <p class="text-center text-slate-300">
                Complete the form and click "Calculate Dream" to see the price of your dream.
            </p>
        </div>
    `
})

document.addEventListener("DOMContentLoaded", () => {
    currencySymbols.forEach(symbol => {
        const option = document.createElement("option")
        option.value = symbol
        option.textContent = symbol
        inputSelectCurrency.appendChild(option)
    })

    formatInput(inputYears)
    formatInput(inputCurrentPrice)
    formatInput(inputDownPayment)
    formatInput(inputInflationAssumption)

})

console.log("Test, lagi belajar git")

const newFeature = () => {
    return "wow"
}