const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

// هذا الـ API يوفر أسعار عملات حية ومجانية
const API_URL = "https://open.er-api.com/v6/latest/";

convertBtn.addEventListener('click', getExchangeRate);

// تشغيل الدالة تلقائياً عند تحميل الصفحة لأول مرة
window.addEventListener('load', getExchangeRate);

function getExchangeRate() {
    const amountVal = amountInput.value;
    const fromVal = fromSelect.value;
    const toVal = toSelect.value;

    if (amountVal === "" || amountVal <= 0) {
        resultDiv.innerText = "Please enter a valid amount";
        return;
    }

    resultDiv.innerText = "Fetching exchange rates...";

    // جلب البيانات من الـ API
    fetch(`${API_URL}${fromVal}`)
        .then(response => response.json())
        .then(data => {
            // أخذ سعر العملة المستهدفة من البيانات القادمة
            const exchangeRate = data.rates[toVal];
            const totalResult = (amountVal * exchangeRate).toFixed(2);
            
            // عرض النتيجة النهائية للمستخدم
            resultDiv.innerText = `${amountVal} ${fromVal} = ${totalResult} ${toVal}`;
        })
        .catch(() => {
            resultDiv.innerText = "Something went wrong. Try again later.";
        });
}
