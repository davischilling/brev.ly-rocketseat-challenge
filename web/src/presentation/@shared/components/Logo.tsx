import Logo_Icon from '@/public/Logo_Icon.svg'
import Logo_Text from '@/public/brev.ly.png'

export const Logo = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <img src={Logo_Icon} alt="Logo" />
      <img src={Logo_Text} alt="Logo Text" />
    </div>
  )
}
