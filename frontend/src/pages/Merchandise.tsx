import React from 'react';
import Layout from '@/components/Layout';
import { MerchandiseCard } from '@/components/merchandise-card';
import { useAuth } from '@/contexts/AuthContext'; 
import { toast } from 'sonner';

const merchandiseItems = [
  {
    id: '1',
    imageSrc: 'marchendise_img/shirt1.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
  {
    id: '2',
    imageSrc: 'marchendise_img/shirt2.jpg',
    title: 'Shore Thing-Tshirt',
    description: 'Life’s better where the land ends',
    pointsCost: 150,
  },
  {
    id: '3',
    imageSrc: 'marchendise_img/shirt3.jpg',
    title: 'Shellbound- Tshirt',
    description: 'Tied to the tide, forever free',
    pointsCost: 150,
  },
  {
    id: '4',
    imageSrc: 'marchendise_img/shirt4.jpg',
    title: 'Sun’s Out, Fins Out',
    description: 'Slay the bay',
    pointsCost: 200,
  },
   {
    id: '5',
    imageSrc: 'marchendise_img/bottle1.jpg',
    title: 'AquaLoop Bottle',
    description: 'Hydration that comes full circle',
    pointsCost: 100,
  },
   {
    id: '6',
    imageSrc: 'marchendise_img/bottle2.jpg',
    title: 'Afirma - sparkling water bottle',
    description: 'The wave that tickles your tongue',
    pointsCost: 200,
  },
   {
    id: '7',
    imageSrc: 'marchendise_img/bottle3.jpg',
    title: 'Minaré',
    description: 'Minerals in motion',
    pointsCost: 200,
  },
   {
    id: '8',
    imageSrc: 'marchendise_img/cap1.jpg',
    title: 'Skrrt Fit',
    description: 'Fast looks. Sharp turns',
    pointsCost: 50,
  },
   {
    id: '9',
    imageSrc: 'marchendise_img/cap2.jpg',
    title: 'AirTilt Cap',
    description: 'Light as air. Sharp as you',
    pointsCost: 200,
  },
  {
    id: '10',
    imageSrc: 'marchendise_img/tote1.jpg',
    title: 'Ocean cleanup',
    description: 'Light on you, lighter on Earth',
    pointsCost: 100,
  },
   {
    id: '11',
    imageSrc: 'marchendise_img/tote2.jpg',
    title: 'Bold Canvas Tote',
    description: 'Your style is the brushstroke',
    pointsCost: 200,
  },
   {
    id: '12',
    imageSrc: 'marchendise_img/tote3.jpg',
    title: 'NEXUS Tote',
    description: 'Nexus!!!!!!!',
    pointsCost: 1000,
  },
];

const Merchandise = () => {
  const { user, updateUserPoints } = useAuth(); // Ensure these exist in your context

  const handleRedeem = (item: { title: string; pointsCost: number }) => {
    if (!user) return toast.error("Please log in to redeem.");

    if (user.points < item.pointsCost) {
      return toast.error("You don't have enough Ocean Points.");
    }

    updateUserPoints(-item.pointsCost); // Deduct points
    toast.success(`You redeemed a ${item.title}!`);
  };

  return (
    <Layout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">Redeem Ocean Points</h1>
        <p className="mt-2 text-white/80 text-lg">
          Exchange your points for eco-friendly merchandise
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {merchandiseItems.map((item, index) => (
          <MerchandiseCard
            key={`${item.id}-${index}`} // better key to avoid duplicates
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            pointsCost={item.pointsCost}
            onRedeem={() => handleRedeem(item)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Merchandise;