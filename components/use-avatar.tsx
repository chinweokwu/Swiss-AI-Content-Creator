import {useUser} from '@clerk/nextjs';
import {Avatar, AvatarImage}  from '@/components/ui/avatar'
export const UserAvatar = () => {
  const {user} = useUser();

  return (
    <div>
      <Avatar className='h-8 w-8'>
      <AvatarImage src={user?.profileImageUrl}/>
      </Avatar>
    </div>
  )
}

