'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import AddGatheringButton from './_components/AddGatheringButton';
import useQueryStrings from '@/hooks/useQueryStrings';
import useModal from '@/hooks/useModal';
import Filter from './_components/Filter';

const DynamicLoginModal = dynamic(
  () => import('@/components/common/Modal/LoginModal'),
  { ssr: false }
);
export default function GatheringsPageClient() {
  const router = useRouter();

  const { getParams, setParams, clearParams } = useQueryStrings();
  const params = getParams();

  const {
    modalOpen: loginModalOpen,
    handleModalOpen: handleLoginModalOpen,
    handleModalClose: handleLoginModalClose,
  } = useModal();

  const addNewMeeting = () => {
    const accesssToken = localStorage.getItem('accessToken');
    if (!accesssToken) {
      handleLoginModalOpen();
      return;
    }
    router.push('/gatherings/new');
  };

  return (
    <>
      <DynamicLoginModal
        modalOpen={loginModalOpen}
        onClose={handleLoginModalClose}
      />
      <main>
        <AddGatheringButton handleAddNewMeeting={addNewMeeting} />
        <Filter
          clearParams={clearParams}
          filterItems={params}
          setParams={setParams}
        />
      </main>
    </>
  );
}
