export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  tagline: string
  price: string
  available: boolean
  description: string
  details: string[]
  specifications: ProductSpec[]
  images: string[]
}

export const products: Product[] = [
  {
    slug: 'nidra-box',
    name: 'The Nidra Box',
    tagline: 'Returning to the sacred art of being human.',
    price: '£395',
    available: false,
    description: `Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos praesent pellentesque dapibus suscipit nascetur. Aliquam dui posuere etiam pretium per venenatis. Ex efficitur posuere orci arcu tempor commodo diam sodales. Sem lorem praesent posuere orci nec cras pretium commodo. Porttitor ornare et taciti iaculis consequat vulputate praesent gravida elementum bibendum.

Fringilla consequat habitant orci volutpat porttitor et. Himenaeos litora congue cubilia per varius nunc. Euismod cursus diam facilisis cubilia dictumst ullamcorper tristique. Montes nisi aliquam; at enim praesent taciti ornare leo.`,
    details: [
      'Handcrafted from sustainably sourced walnut',
      'Includes a set of ritual cards',
      'Interior lined with natural wool felt',
      'Brass closure mechanism',
      'Dimensions: 100mm × 100mm × 100mm'
    ],
    specifications: [
      { label: 'Material', value: 'Walnut, Wool Felt, Brass' },
      { label: 'Dimensions', value: '100 × 100 × 100 mm' },
      { label: 'Weight', value: '100 g' },
    ],
    images: [
      '/images/product-images/1.png',
      '/images/product-images/2.png',
      '/images/product-images/3.png',
      '/images/product-images/4.png',
      '/images/product-images/5.png',
    ]
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}
