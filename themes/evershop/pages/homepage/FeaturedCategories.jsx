import React from "react";
import Button from "@components/frontStore/cms/Button";

export default function FeaturedCategories() {
  return (
    <div className="mt-15">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 page-width">
        <div>
          <h3 className="h4 uppercase mt-1 mb-1">Acrylic Craft Collection</h3>
          <div className="mb-1">
            <p>
              Transform your living space with our stunning Acrylic Craft
              Collection. Our curated selection of home decor items blends
              modern design with vibrant colors, offering a unique touch to any
              room. From elegant wall art to stylish accents, explore pieces
              that reflect your personal style and add a contemporary flair to
              your home.
            </p>
          </div>
          <Button url="/acrylic" title="Shop Acrylic" variant="primary" />
        </div>

        <div>
          <h3 className="h4 uppercase mt-1 mb-1">Glass Craft Collection</h3>
          <div className="mb-1">
            <p>
              Elevate your home decor with our exquisite Glass Craft Collection.
              Each piece is meticulously crafted from high-quality glass,
              blending elegance with modern design. Perfect for adding a touch
              of sophistication to any space,our collection features unique
              items that reflect light beautifully and create a serene ambiance.
            </p>
          </div>
          <Button url="/glass" title="Shop Glass" variant="primary" />
        </div>

        {/* <div>
          <div>
            <img src="/assets/homepage/banner/kid-shoes.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Men shoes collection</h3>
          <div className="mb-1">
            <p>
              Constructed from luxury nylons, leathers, and custom hardware,
              featuring sport details such as hidden breathing vents, waterproof
              + antimicrobial linings, and more.
            </p>
          </div>
          <Button url="/men" title="Shop men" variant="primary" />
        </div> */}
      </div>
    </div>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 10,
};
