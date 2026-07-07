import { PrismaClient } from '@prisma/client'
import { citiesByProvince } from '../src/data/cities/index'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  for (const provinceSlug in citiesByProvince) {
    const cities = citiesByProvince[provinceSlug]

    for (const cityData of cities) {
      const slug = cityData.slug
      
      // Check if city already exists
      const existing = await prisma.city.findUnique({
        where: { slug }
      })

      if (existing) {
        console.log(`City ${slug} already exists, skipping.`)
        continue
      }

      const newCity = await prisma.city.create({
        data: {
          slug: slug,
          name: cityData.name,
          province: provinceSlug, // or we can fetch province name from provinces-meta.ts
          geoName: cityData.name, // fallback
          tagline: cityData.tagline || "",
          description: cityData.sejarah || "",
          image: cityData.image || '',
          coordinates: JSON.stringify(cityData.coordinates || []),
          scale: 3000,
        }
      })

      console.log(`Created city: ${newCity.name}`)

      // Create categories
      const categoryTypes = ['sejarah', 'wisata', 'budaya', 'kuliner', 'teknologi']

      for (const type of categoryTypes) {
        const items = (cityData as any)[type] || []
        
        // If it's a string (like sejarah sometimes), convert to a single item
        if (typeof items === 'string') {
          await prisma.categoryItem.create({
            data: {
              type: type.toUpperCase(),
              name: `Tentang ${type}`,
              description: items,
              image: '',
              cityId: newCity.id
            }
          })
          continue;
        }

        for (const item of items) {
          await prisma.categoryItem.create({
            data: {
              type: type.toUpperCase(),
              name: item.name,
              description: item.description,
              image: item.image || '',
              cityId: newCity.id
            }
          })
        }
      }
      
      console.log(`Created categories for: ${newCity.name}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
