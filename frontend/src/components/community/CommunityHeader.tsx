
import React from 'react';
import { Users, Waves } from 'lucide-react';

const CommunityHeader: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
        <Users className="w-10 h-10 mr-4" />
        Ocean Community
        <Waves className="w-10 h-10 ml-4" />
      </h1>
      <p className="text-white/80 text-lg">
        Connect with fellow ocean lovers and share your marine adventures
      </p>
    </div>
  );
};

export default CommunityHeader;
