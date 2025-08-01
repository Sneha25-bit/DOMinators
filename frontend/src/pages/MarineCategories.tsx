import Layout from '@/components/Layout';

const categories = [
  {
    name: 'Cephalopods & Shellfish',
    url: 'https://oceana.org/cephalopods-crustaceans-other-shellfish/',
    bgImage: '/images/shellfish.jpg',
  },
  {
    name: 'Corals & Invertebrates',
    url: 'https://oceana.org/corals-and-other-invertebrates/',
    bgImage: '/images/corals.jpg',
  },
  {
    name: 'Marine Mammals',
    url: 'https://oceana.org/marine-mammals/',
    bgImage: '/images/mammals.jpg',
  },
  {
    name: 'Ecosystems & Science',
    url: 'https://oceana.org/marine-science-and-ecosystems/',
    bgImage: '/images/ecosystems.jpg',
  },
  {
    name: 'Ocean Fishes',
    url: 'https://oceana.org/ocean-fishes/',
    bgImage: '/images/fishes.jpg',
  },
  {
    name: 'Sea Turtles & Reptiles',
    url: 'https://oceana.org/sea-turtles-reptiles/',
    bgImage: '/images/turtles.jpg',
  },
  {
    name: 'Seabirds',
    url: 'https://oceana.org/seabirds/',
    bgImage: '/images/seabirds.jpg',
  },
  {
    name: 'Sharks & Rays',
    url: 'https://oceana.org/sharks-rays/',
    bgImage: '/images/sharks.jpg',
  },
];

export default function MarineCategories() {
  return (
    <Layout>
      <div className="min-h-screen p-6 relative overflow-hidden">

        <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-100 drop-shadow-md z-10 relative">
          🌊 Discover Marine Life
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto z-10 relative">

          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-60 rounded-3xl overflow-hidden shadow-xl group transition-transform duration-300 hover:scale-[1.04]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cat.bgImage})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 flex items-center justify-center transition-colors">
                <span className="text-white text-lg sm:text-xl font-semibold text-center px-4 group-hover:underline drop-shadow-lg">
                  {cat.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
