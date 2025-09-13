import { logProfileVist } from '@/modules/analytics/actions';
import { getUserByUsername } from '@/modules/profile/actions';
import LinkClusterProfile from '@/modules/profile/components/linkClusterProfile';
import { redirect } from 'next/navigation';

import React from 'react'

const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const profileData = await getUserByUsername(username);

  if (profileData?.username !== username) {
    return redirect("/");
  }

  logProfileVist(profileData.id).catch((error) => {
    console.error("Failed to log profile visit: ",error);
  });

  return (
    // @ts-ignore
    <LinkClusterProfile profileData={profileData} />
  )
}

export default ProfilePage