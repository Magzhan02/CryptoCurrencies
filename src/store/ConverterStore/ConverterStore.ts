import { observable, computed, action } from 'mobx'
import { typeCoin, TSelectedCoin  } from '../../types'


class ConverterStore {
  @observable private selectedCoin: TSelectedCoin = {
    name: '',
    price: 0,
  };

  @computed
  get getSelectedCoin() {
    return this.selectedCoin;
  }

  @action
  setSelectedCoin(coin: typeCoin) {
    this.selectedCoin = {
      name: coin.name,
      price: coin.price,
    };
  }
}

export default ConverterStore;
