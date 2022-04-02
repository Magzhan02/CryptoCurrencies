import ConverterStore from "./ConverterStore/ConverterStore";
import CurrenciesStore from "./CurrenciesStore/CurrenciesStore";

const store = {
    currenciesStore: new CurrenciesStore(),
    converterStore: new ConverterStore(),
};

export default store;