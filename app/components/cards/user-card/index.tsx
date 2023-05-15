import Image from "next/image";

type UserCardProps = {
	  name: string;
	  email: string;
	  avatar: string;
};

const UserCard = ({name, email, avatar}: UserCardProps) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-4">
      <div className="flex items-center">
        <Image
          alt="profile pic"
          src={avatar}
          className="rounded-full object-cover h-10 w-10 mr-3"
          width={40}
          height={40}
        />
        <div>
          <div className="font-medium text-gray-700">{name}</div>
          <div className="text-gray-400">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
