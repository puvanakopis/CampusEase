import React from 'react';
import { buildPhotoUrl } from '../../../utils/photoUtils';
import useNavigateTo from '../../../hooks/useNavigateTo';

const HostInfo = ({ owner }) => {
  const navigateTo = useNavigateTo();

  const handleContactHost = () => {
    navigateTo(`/owner/${owner._id}`);
  };

  return (
    <div className="border-t border-slate-200 pt-10 pb-10">
      <h3 className="text-xl font-bold mb-6">Hosted by {owner.first_name}</h3>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-2 min-w-[200px]">
          <div
            className="bg-center bg-cover rounded-xl h-32 w-32 mb-2"
            style={{ backgroundImage: `url("${buildPhotoUrl(owner.photo.filename, "user_photo", owner.first_name)}")` }}
          ></div>
          <h4 className="font-semibold text-lg">
            {owner.first_name} {owner.last_name}
          </h4>
          <p className="text-slate-500 text-sm">
            Joined {new Date(owner.created_at).toISOString().split("T")[0]}
          </p>
          {owner.verified && (
            <div className="flex gap-2 mt-2 text-slate-600 text-sm font-medium">
              <span className="material-symbols-outlined text-lg text-green-500">
                verified_user
              </span>{" "}
              SUSL Recommended
            </div>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <p className="text-slate-600">"{owner.description}"</p>
          <button
            onClick={handleContactHost}
            className="bg-slate-900 text-white rounded-lg px-6 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity w-max"
          >
            Contact Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostInfo;