import Image from 'next/image';

interface IThreadsListItemProps {
  profileImage: string;
  name: string;
  participantsCount: number;
  recentMessage: {
    contents: string;
    createdAt: string;
  };
  unreadCount: number;
}

export default function ThreadListItem({
  profileImage,
  name,
  participantsCount,
  recentMessage,
  unreadCount,
}: IThreadsListItemProps) {
  return (
    <div>
      <div>
        <Image src={profileImage} alt={name} width={36} height={36} />
      </div>
      <div>
        <div>
          <div>
            {name}
            <span>{participantsCount}</span>
          </div>
          <div>{recentMessage.createdAt}</div>
        </div>
        <div>
          {recentMessage.contents}
          <div>{unreadCount}</div>
        </div>
      </div>
    </div>
  );
}
