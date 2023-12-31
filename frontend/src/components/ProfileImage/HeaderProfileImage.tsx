import { Avatar } from "@components/ui/avatar";
import Image from "next/image";

export default function HeaderProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Avatar className="h-12 w-12">
      {imageUrl ? (<Image
        src={imageUrl}
        alt="profile_image"
        className="object-cover"
        quality={10}
        fill
      />) : (<Image
        src="/images/avatar.png"
        alt="profile_image"
        className="object-cover"
        quality={10}
        fill
      />)}
    </Avatar>
  );
}
