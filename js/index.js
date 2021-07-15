class TipCalculator {
    constructor() {
        this.inputBill = document.getElementById('bill');
        this.inputPeople = document.getElementById('people');
        this.inputCustom = document.getElementById('custom');
        this.btns = document.querySelectorAll('.input__btn');

        this.tipResult = document.querySelector('.output__result--tip');
        this.totalResult = document.querySelector('.output__result--total');
        this.resetBtn = document.querySelector('.output__btn');

        this.billValue = 0;
        this.tipValue = 0;
        this.peopleValue = 0;

        this.tipValue = 0;
        this.totalValue = 0;

        this.init();
    }

    getData(e) {

        this.billValue = Number(this.inputBill.value);
        this.peopleValue = Number(this.inputPeople.value);

        this.btns.forEach(btn => btn.classList.remove('active'));

        if (e.target.name === 'btnTip') {
            this.inputCustom.value = '';
            e.target.classList.add('active');
            this.tipValue = Number(e.target.value) / 100;
        } else {
            this.tipValue = Number(this.inputCustom.value);
        }

        if (this.validateData(this.billValue, this.tipValue, this.peopleValue)) {
            this.calculate(this.billValue, this.tipValue, this.peopleValue);
        } else {
            return;
        }

    }

    validateData(bill, tip, people) {
        document.querySelector('.input__input-form-wrap--people').classList.remove('active');

        let billCorrect = false;
        let tipCorrect = false;
        let peopleCorrect = false;
        let isValidate = false;

        if (bill > 0) {
            billCorrect = true;
        }

        if (tip > 0) {
            tipCorrect = true;
        }

        if (people > 0) {
            peopleCorrect = true;
        } else {
            document.querySelector('.input__input-form-wrap--people').classList.add('active');
        }

        if (billCorrect && tipCorrect && peopleCorrect) {
            isValidate = true;
        }

        return isValidate;
    }

    calculate(bill, tip, people) {
        this.tipValue = bill * tip / people;
        this.totalValue = bill / people;

        this.showResult();
    }

    showResult() {
        this.tipResult.textContent = this.tipValue.toFixed(2);
        this.totalResult.textContent = this.totalValue.toFixed(2);
    }

    reset() {
        this.inputBill.value = '';
        this.inputPeople.value = '';
        this.inputCustom.value = '';
        this.tipValue = 0;
        this.totalValue = 0;
        this.showResult();
        this.btns.forEach(btn => btn.classList.remove('active'));
    }

    init() {
        this.inputBill.addEventListener('input', this.getData.bind(this));
        this.inputPeople.addEventListener('input', this.getData.bind(this));
        this.inputCustom.addEventListener('input', this.getData.bind(this));
        this.btns.forEach(btn => btn.addEventListener('click', this.getData.bind(this)));
        this.resetBtn.addEventListener('click', this.reset.bind(this));
    }
}

const tipCalculator = new TipCalculator();