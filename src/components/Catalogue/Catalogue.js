import styles from "./css/catalogue.module.css"
import { ProductCard } from "./ProductCard.js/ProductCard";
import { SubHeader } from "../SubHeader/SubHeader";
import { Search } from "./Search/Search";

export const Catalogue = () => {
    return (
        <>
        <SubHeader />
        <Search />
        <div className={styles.row}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
    </>
    )
}