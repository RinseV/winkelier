# Winkelier

<p align="center">
    <img src="./public/banner.png">
</p>

A website to compare product prices for different Dutch Supermarkets.

# Features
* Find products for 5 of the largest Dutch supermarkets: Jumbo, Albert Heijn, Aldi, Coop and Plus
* Filter products on your allergen and diet preferences
* Sort products by price
* Get direct links to the products

## Getting Started

First, clone the repository and install the dependencies:
```bash
npm install
# or
yarn
```

Then, run the server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Uses
* Next.js template from [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
* [Chakra UI](https://chakra-ui.com/) for styling
* [Next.js](https://nextjs.org/) for rendering and API
* [TypeScript](https://www.typescriptlang.org/)
* Supermarket API wrappers:
    * [`jumbo`](https://github.com/RinseV/jumbo-wrapper)
    * [`albert-heijn`](https://github.com/RinseV/albert-heijn-wrapper)
    * [`aldi`](https://github.com/RinseV/aldi-wrapper)
    * [`coop`](https://github.com/RinseV/coop-wrapper)
    * [`plus`](https://github.com/RinseV/plus-wrapper)

