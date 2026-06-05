"use client";
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Login from './Login';
import OwnerDashboard from './OwnerDashboard';
import CreateEvent from './CreateEvent';
import ManageEvents from './ManageEvents';
import { useAuth } from '../context/AuthContext';

export default function YonetimClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [eventDetails, setEventDetails] = useState(null);

  if (loading) return <div className="section container">Yükleniyor...</div>;
  if (!user) {
    return <Login />;
  }

  const isCreateMode = pathname === '/yonetim/olustur';
  const isDashboardMode = pathname === '/yonetim/dashboard' && eventDetails;

  const handleEventSelected = (details) => {
    setEventDetails(details);
    router.push('/yonetim/dashboard');
  };

  const handleCreateNew = () => {
    router.push('/yonetim/olustur');
  };

  if (isDashboardMode) {
    return <OwnerDashboard eventDetails={eventDetails} />;
  }

  if (isCreateMode) {
    return <CreateEvent onCreated={handleEventSelected} />;
  }

  return <ManageEvents onEventSelected={handleEventSelected} onGoToCreate={handleCreateNew} />;
}
