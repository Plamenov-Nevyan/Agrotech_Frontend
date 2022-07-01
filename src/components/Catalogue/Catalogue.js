import "./css/catalogue.css"
import "./css/productCard.css"
// import "./css/catalogueHeader.css"
import { ProductCard } from "./ProductCard.js/ProductCard";
// import { CatalogueHeader } from "./CatalogueHeader/CatalogueHeader";

export const Catalogue = () => {
    return (
        <>
        {/* <CatalogueHeader /> */}
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
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