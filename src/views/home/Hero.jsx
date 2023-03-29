import Link from 'next/link'

import { Button } from '@/components/Button/Button'
import { Icon } from '@/elements/Icon'

const HaloVector = (props) => (
  <svg width='942' height='510' viewBox='0 0 942 510' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g filter='url(#filter0_f_5783_494144)'>
      <path d='M231.406 320.872L254.422 190.942L365.791 229.55L516.139 179.434L655.35 136L748.529 163.471L778.227 213.587L805.698 334.237L766.719 548.436L655.35 607.833L283.749 548.436L176.835 486.812L136 389.179L231.406 320.872Z' fill='white' fillOpacity='0.6' />
    </g>
    <defs>
      <filter id='filter0_f_5783_494144' x='0.129944' y='0.129944' width='941.439' height='743.572' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
        <feGaussianBlur stdDeviation='67.935' result='effect1_foregroundBlur_5783_494144' />
      </filter>
    </defs>
  </svg>
)

const Hero = () => {
  return (
    <div className='home hero container'>
      <div className='titles container'>
        <h1 className='title'>Discover Neptune Mutual NFTs</h1>
        <p className='intro'>
          Participate in our cover ecosystem and mint NFTs for free. Select your
          persona and keep unlocking new levels of NFTs.
        </p>

        <div className='buttons container'>
          <button className='view'>View Minting Levels</button>
          <Link href='/marketplace'>
            <Button>
              <div className='access'>
                <Icon variant='image-indent-left' size='md' />
                Access Marketplace
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <div className='image container'>
        {/* <img
          className='light only'
          src='/assets/images/hero/nft-light.webp'
          alt='hero image light'
        />
        <img
          className='dark only'
          src='/assets/images/hero/nft-dark.webp'
          alt='hero image dark'
        /> */}
        <img
          className='left'
          src='/assets/images/hero/hero-left.png'
          alt='hero left image'
        />
        <div className='center'>
          <img
            src='/assets/images/hero/hero-center.png'
            alt='hero center image'
          />
          <HaloVector className='halo' />
        </div>
        <img
          className='right'
          src='/assets/images/hero/hero-right.png'
          alt='hero right image'
        />
      </div>
    </div>
  )
}

export { Hero }
