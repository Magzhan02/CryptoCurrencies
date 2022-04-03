import axios from 'axios';
import { observable, computed, action } from 'mobx';
import { typeCoin, TCoinDiff } from '../../types';

import store from '../../store';

class CurrenciesStore {
  @observable private items: typeCoin[] = [];
  @observable private diffObj: TCoinDiff = {};

  @computed
  get getItems() {
    return this.items;
  }

  @computed
  get getDiffObj() {
    return this.diffObj;
  }

  @action
  setItems = (items: typeCoin[]): void => {
    this.diffObj = this.diffCurrencies(this.items, items).reduce(
      (initObj: TCoinDiff, obj: typeCoin) => {
        const newObj: typeCoin = items.find(o => o.name === obj.name)!;
        const oldObj: typeCoin = this.items.find(itemObj => itemObj.name === newObj.name)!;
        const color: string =
          newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? 'green' : 'red';

        initObj[newObj.name] = color;

        return initObj;
      },
      {},
    );
    this.items = items;
    setTimeout(() => {
      this.diffObj = {};
    }, 10000);
  };

  @action
  fetchCoins = () => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
      .then(({ data }) => {
        const coins: typeCoin[] = data.Data.map((coin: any) => {
          const obj: typeCoin = {
            name: coin.CoinInfo.Name,
            fullname: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(3),
            volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
          };
          return obj;
        });
        this.setItems(coins);
        store.converterStore.setSelectedCoin(coins[0]);
      });
  };

  diffCurrencies(arr1: typeCoin[], arr2: typeCoin[]) {
    return arr1.filter((obj, index) => {
      if (obj.price !== arr2[index].price) {
        return true;
      }
      return false;
    });
  }
}

export default CurrenciesStore;
