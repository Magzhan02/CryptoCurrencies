import { observable, computed, action } from 'mobx'
import { typeCoin } from '../../types'
import axios from 'axios';

class CurrenciesStore {
    @observable private data: typeCoin[] = [];

    @computed 
    get getData(){
        return this.data;
    }

    @action
    setData = (data: typeCoin[]): void =>{
        this.data = data;
    }

    @action 
    fetchData = ()=> {
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
            this.setData(coins);
          });
      };
}

export default CurrenciesStore;