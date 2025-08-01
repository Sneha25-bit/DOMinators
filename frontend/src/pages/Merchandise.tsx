import React from 'react';
import Layout from '@/components/Layout';
import { MerchandiseCard } from '@/components/merchandise-card';

const merchandiseItems = [
  {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
  {
    id: '2',
    imageSrc: '/images/bottle.jpg',
    title: 'Reusable Bottle',
    description: 'Stay hydrated and save the sea',
    pointsCost: 80,
  },
  {
    id: '3',
    imageSrc: '/images/bag.jpg',
    title: 'Canvas Bag',
    description: 'Reusable tote for daily use',
    pointsCost: 90,
  },
  {
    id: '4',
    imageSrc: '/images/cap.jpg',
    title: 'Ocean Cap',
    description: 'Stylish and sun-safe',
    pointsCost: 60,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
   {
    id: '1',
    imageSrc: '/images/shirt.jpg',
    title: 'Ocean T-Shirt',
    description: 'Eco-friendly cotton tee with marine print',
    pointsCost: 100,
  },
];

const Merchandise = () => {
  return (
    <Layout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">Redeem Ocean Points</h1>
        <p className="mt-2 text-white/80 text-lg">Exchange your points for eco-friendly merchandise</p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {merchandiseItems.map((item) => (
          <MerchandiseCard
            key={item.id}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            pointsCost={item.pointsCost}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Merchandise;
