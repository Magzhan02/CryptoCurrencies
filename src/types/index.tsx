export type typeCoin = {
    name: string;
    fullname: string;
    imageUrl: string;
    price: number;
    volume24hour: number;
};

export type TCoinDiff = { [key: string]: string };

export type TSelectedCoin = {
    name: string;
    price: number;
  };